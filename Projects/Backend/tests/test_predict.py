from datetime import timedelta

import pytest
from django.utils import timezone

from jobs.models import JobApplication, Note


@pytest.mark.django_db
def test_predict_applied_base(auth_client, job):
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.status_code == 200
    assert response.data["score"] == 30
    assert response.data["label"] == "En proceso"
    assert response.data["current_status"] == "applied"


@pytest.mark.django_db
def test_predict_interview_base(auth_client, user):
    job = JobApplication.objects.create(
        user=user, company="A", position="x", industry="", status="interview", applied_date="2024-01-01"
    )
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] == 55
    assert response.data["label"] == "En proceso"


@pytest.mark.django_db
def test_predict_technical_base(auth_client, user):
    job = JobApplication.objects.create(
        user=user, company="A", position="x", industry="", status="technical", applied_date="2024-01-01"
    )
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] == 75
    assert response.data["label"] == "Buenas chances"


@pytest.mark.django_db
def test_predict_note_bonus(auth_client, job):
    Note.objects.create(job=job, content="Preparar respuestas")
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] == 35
    assert any("notas registradas" in tip for tip in response.data["tips"])


@pytest.mark.django_db
def test_predict_old_job_penalty(auth_client, user):
    job = JobApplication.objects.create(
        user=user, company="A", position="x", industry="", status="interview", applied_date="2024-01-01"
    )
    old_dt = timezone.now() - timedelta(days=15)
    JobApplication.objects.filter(id=job.id).update(updated_at=old_dt)
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] == 45
    assert any("más de 14 días" in tip for tip in response.data["tips"])


@pytest.mark.django_db
def test_predict_positive_company_history_bonus(auth_client, user):
    JobApplication.objects.create(
        user=user, company="Globant", position="x", industry="", status="offer", applied_date="2024-01-01"
    )
    job = JobApplication.objects.create(
        user=user, company="Globant", position="y", industry="", status="interview", applied_date="2024-01-02"
    )
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] == 65
    assert any("empresa ha respondido bien" in tip for tip in response.data["tips"])


@pytest.mark.django_db
def test_predict_score_not_above_100(auth_client, user):
    JobApplication.objects.create(
        user=user, company="Globant", position="x", industry="", status="offer", applied_date="2024-01-01"
    )
    job = JobApplication.objects.create(
        user=user, company="Globant", position="y", industry="", status="offer", applied_date="2024-01-02"
    )
    Note.objects.create(job=job, content="Nota")
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] <= 100


@pytest.mark.django_db
def test_predict_score_not_negative(auth_client, user):
    job = JobApplication.objects.create(
        user=user, company="A", position="x", industry="", status="rejected", applied_date="2024-01-01"
    )
    response = auth_client.get(f"/api/jobs/{job.id}/predict/")
    assert response.data["score"] >= 0


@pytest.mark.django_db
def test_cannot_predict_other_user_job(auth_client, other_job):
    response = auth_client.get(f"/api/jobs/{other_job.id}/predict/")
    assert response.status_code == 403


@pytest.mark.django_db
def test_predict_labels_ranges(auth_client, user):
    rejected = JobApplication.objects.create(
        user=user, company="A", position="x", industry="", status="rejected", applied_date="2024-01-01"
    )
    applied = JobApplication.objects.create(
        user=user, company="B", position="x", industry="", status="applied", applied_date="2024-01-01"
    )
    technical = JobApplication.objects.create(
        user=user, company="C", position="x", industry="", status="technical", applied_date="2024-01-01"
    )
    offer = JobApplication.objects.create(
        user=user, company="D", position="x", industry="", status="offer", applied_date="2024-01-01"
    )
    assert auth_client.get(f"/api/jobs/{rejected.id}/predict/").data["label"] == "Pocas chances"
    assert auth_client.get(f"/api/jobs/{applied.id}/predict/").data["label"] == "En proceso"
    assert auth_client.get(f"/api/jobs/{technical.id}/predict/").data["label"] == "Buenas chances"
    assert auth_client.get(f"/api/jobs/{offer.id}/predict/").data["label"] == "Muy prometedor"
