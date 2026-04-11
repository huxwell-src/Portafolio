from datetime import timedelta

import pytest
from django.utils import timezone

from jobs.models import JobApplication


@pytest.mark.django_db
def test_stats_general_counts(auth_client, user):
    JobApplication.objects.create(user=user, company="A", position="x", industry="Tech", status="applied", applied_date="2024-01-01")
    JobApplication.objects.create(user=user, company="B", position="x", industry="Tech", status="applied", applied_date="2024-01-02")
    JobApplication.objects.create(user=user, company="C", position="x", industry="Tech", status="interview", applied_date="2024-01-03")
    JobApplication.objects.create(user=user, company="D", position="x", industry="Tech", status="offer", applied_date="2024-01-04")
    JobApplication.objects.create(user=user, company="E", position="x", industry="Tech", status="rejected", applied_date="2024-01-05")
    response = auth_client.get("/api/jobs/stats/")
    assert response.status_code == 200
    assert response.data["total"] == 5
    assert response.data["by_status"]["applied"] == 2
    assert response.data["by_status"]["interview"] == 1
    assert response.data["by_status"]["offer"] == 1
    assert response.data["by_status"]["rejected"] == 1
    assert response.data["by_status"]["technical"] == 0
    assert response.data["by_status"]["discarded"] == 0


@pytest.mark.django_db
def test_response_rate_calculated(auth_client, user):
    JobApplication.objects.create(user=user, company="A", position="x", industry="", status="applied", applied_date="2024-01-01")
    JobApplication.objects.create(user=user, company="B", position="x", industry="", status="applied", applied_date="2024-01-02")
    JobApplication.objects.create(user=user, company="C", position="x", industry="", status="interview", applied_date="2024-01-03")
    JobApplication.objects.create(user=user, company="D", position="x", industry="", status="technical", applied_date="2024-01-04")
    response = auth_client.get("/api/jobs/stats/")
    assert response.data["response_rate"] == 50.0


@pytest.mark.django_db
def test_offer_rate_calculated(auth_client, user):
    JobApplication.objects.create(user=user, company="A", position="x", industry="", status="applied", applied_date="2024-01-01")
    JobApplication.objects.create(user=user, company="B", position="x", industry="", status="applied", applied_date="2024-01-02")
    JobApplication.objects.create(user=user, company="C", position="x", industry="", status="applied", applied_date="2024-01-03")
    JobApplication.objects.create(user=user, company="D", position="x", industry="", status="rejected", applied_date="2024-01-04")
    JobApplication.objects.create(user=user, company="E", position="x", industry="", status="offer", applied_date="2024-01-05")
    response = auth_client.get("/api/jobs/stats/")
    assert response.data["offer_rate"] == 20.0


@pytest.mark.django_db
def test_stats_empty(auth_client):
    response = auth_client.get("/api/jobs/stats/")
    assert response.status_code == 200
    assert response.data["total"] == 0
    assert response.data["response_rate"] == 0.0
    assert response.data["avg_days_to_response"] is None
    assert all(v == 0 for v in response.data["by_status"].values())


@pytest.mark.django_db
def test_stats_isolated_by_user(auth_client, user, other_user):
    for i in range(3):
        JobApplication.objects.create(user=user, company=f"A{i}", position="x", industry="", status="applied", applied_date="2024-01-01")
    for i in range(5):
        JobApplication.objects.create(
            user=other_user, company=f"B{i}", position="x", industry="", status="applied", applied_date="2024-01-01"
        )
    response = auth_client.get("/api/jobs/stats/")
    assert response.data["total"] == 3


@pytest.mark.django_db
def test_applied_last_days(auth_client, user):
    today = timezone.now().date()
    JobApplication.objects.create(user=user, company="A", position="x", industry="", status="applied", applied_date=today)
    JobApplication.objects.create(user=user, company="B", position="x", industry="", status="applied", applied_date=today)
    JobApplication.objects.create(
        user=user, company="C", position="x", industry="", status="applied", applied_date=today - timedelta(days=10)
    )
    response = auth_client.get("/api/jobs/stats/")
    assert response.data["applied_last_7_days"] == 2
    assert response.data["applied_last_30_days"] == 3


@pytest.mark.django_db
def test_stats_by_industry(auth_client, user):
    JobApplication.objects.create(user=user, company="A", position="x", industry="Fintech", status="applied", applied_date="2024-01-01")
    JobApplication.objects.create(user=user, company="B", position="x", industry="Fintech", status="applied", applied_date="2024-01-02")
    JobApplication.objects.create(user=user, company="C", position="x", industry="Fintech", status="interview", applied_date="2024-01-03")
    JobApplication.objects.create(user=user, company="D", position="x", industry="Ecommerce", status="applied", applied_date="2024-01-04")
    JobApplication.objects.create(user=user, company="E", position="x", industry="Ecommerce", status="applied", applied_date="2024-01-05")
    response = auth_client.get("/api/jobs/stats/by-industry/")
    assert response.status_code == 200
    assert len(response.data) == 2
    fintech = next(item for item in response.data if item["industry"] == "Fintech")
    ecommerce = next(item for item in response.data if item["industry"] == "Ecommerce")
    assert fintech["total"] == 3
    assert fintech["response_rate"] == 33.3
    assert ecommerce["total"] == 2
    assert ecommerce["response_rate"] == 0.0
    assert response.data[0]["industry"] == "Fintech"


@pytest.mark.django_db
def test_stats_by_industry_empty(auth_client):
    response = auth_client.get("/api/jobs/stats/by-industry/")
    assert response.status_code == 200
    assert response.data == []


@pytest.mark.django_db
def test_timeline_exactly_12_weeks(auth_client, user):
    today = timezone.now().date()
    for delta in [0, 7, 14, 28]:
        JobApplication.objects.create(
            user=user,
            company=f"C{delta}",
            position="x",
            industry="",
            status="applied",
            applied_date=today - timedelta(days=delta),
        )
    response = auth_client.get("/api/jobs/stats/timeline/")
    assert response.status_code == 200
    assert len(response.data) == 12
    assert all("week" in item and "count" in item for item in response.data)
    assert all("-W" in item["week"] for item in response.data)


@pytest.mark.django_db
def test_timeline_empty_returns_12_zeros(auth_client):
    response = auth_client.get("/api/jobs/stats/timeline/")
    assert response.status_code == 200
    assert len(response.data) == 12
    assert all(item["count"] == 0 for item in response.data)


@pytest.mark.django_db
def test_stats_require_auth(client):
    response = client.get("/api/jobs/stats/")
    assert response.status_code == 401
