from datetime import timedelta

import pytest
from django.utils import timezone

from jobs.models import JobApplication


def _response_text(response):
    return b"".join(response.streaming_content).decode("utf-8")


@pytest.mark.django_db
def test_export_returns_downloadable_csv(auth_client, user):
    JobApplication.objects.create(user=user, company="A", position="x", industry="", status="applied", applied_date="2024-01-01")
    JobApplication.objects.create(user=user, company="B", position="x", industry="", status="applied", applied_date="2024-01-02")
    response = auth_client.get("/api/jobs/export/csv/")
    assert response.status_code == 200
    assert "text/csv" in response["Content-Type"]
    assert "attachment" in response["Content-Disposition"]
    assert "jobtracker_export.csv" in response["Content-Disposition"]


@pytest.mark.django_db
def test_export_header(auth_client):
    response = auth_client.get("/api/jobs/export/csv/")
    first_line = _response_text(response).splitlines()[0].lstrip("\ufeff")
    assert first_line == "empresa,cargo,rubro,estado,fecha_postulacion,dias_transcurridos,url_oferta"


@pytest.mark.django_db
def test_export_contains_job_data(auth_client, user):
    JobApplication.objects.create(
        user=user,
        company="Globant",
        position="Dev",
        industry="Fintech",
        status="interview",
        applied_date="2024-03-01",
        job_url="https://globant.com/jobs/123",
    )
    csv_text = _response_text(auth_client.get("/api/jobs/export/csv/"))
    assert "Globant" in csv_text
    assert "Dev" in csv_text
    assert "Fintech" in csv_text
    assert "interview" in csv_text
    assert "2024-03-01" in csv_text


@pytest.mark.django_db
def test_export_without_jobs_only_header(auth_client):
    csv_text = _response_text(auth_client.get("/api/jobs/export/csv/"))
    lines = [line for line in csv_text.strip().split("\n") if line]
    assert len(lines) == 1


@pytest.mark.django_db
def test_export_isolated_by_user(auth_client, user, other_user):
    JobApplication.objects.create(user=user, company="Globant", position="x", industry="", status="applied", applied_date="2024-01-01")
    JobApplication.objects.create(user=user, company="ML", position="x", industry="", status="applied", applied_date="2024-01-02")
    for i in range(3):
        JobApplication.objects.create(
            user=other_user, company=f"Amazon{i}", position="x", industry="", status="applied", applied_date="2024-01-03"
        )
    csv_text = _response_text(auth_client.get("/api/jobs/export/csv/"))
    lines = [line for line in csv_text.strip().split("\n") if line]
    assert len(lines) == 3
    assert "Amazon" not in csv_text


@pytest.mark.django_db
def test_export_requires_auth(client):
    response = client.get("/api/jobs/export/csv/")
    assert response.status_code == 401


@pytest.mark.django_db
def test_export_days_elapsed_integer(auth_client, user):
    applied_date = timezone.now().date() - timedelta(days=5)
    JobApplication.objects.create(user=user, company="Globant", position="x", industry="", status="applied", applied_date=applied_date)
    csv_text = _response_text(auth_client.get("/api/jobs/export/csv/"))
    assert ",5," in csv_text


@pytest.mark.django_db
def test_export_empty_job_url_cell(auth_client, user):
    JobApplication.objects.create(
        user=user, company="Globant", position="x", industry="Fintech", status="interview", applied_date="2024-03-01", job_url=""
    )
    csv_text = _response_text(auth_client.get("/api/jobs/export/csv/"))
    data_line = csv_text.strip().split("\n")[1]
    assert data_line.endswith(",")
    assert "None" not in csv_text
