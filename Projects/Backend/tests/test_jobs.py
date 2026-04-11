import pytest

from jobs.models import JobApplication, StatusHistory


@pytest.mark.django_db
def test_list_only_authenticated_user_jobs(auth_client, job, job_interview, other_job):
    response = auth_client.get("/api/jobs/")
    assert response.status_code == 200
    assert len(response.data) == 2
    assert "Amazon" not in [j["company"] for j in response.data]


@pytest.mark.django_db
def test_list_without_auth_fails(client):
    response = client.get("/api/jobs/")
    assert response.status_code == 401


@pytest.mark.django_db
def test_empty_list_returns_empty_array(auth_client):
    response = auth_client.get("/api/jobs/")
    assert response.status_code == 200
    assert response.data == []


@pytest.mark.django_db
def test_filter_by_status(auth_client, job, job_interview):
    response = auth_client.get("/api/jobs/?status=interview")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["status"] == "interview"
    assert response.data[0]["company"] == "Mercado Libre"


@pytest.mark.django_db
def test_filter_by_industry(auth_client, job, job_interview):
    response = auth_client.get("/api/jobs/?industry=Fintech")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["industry"] == "Fintech"


@pytest.mark.django_db
def test_search_by_company(auth_client, job, other_job):
    response = auth_client.get("/api/jobs/?search=globant")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["company"] == "Globant"


@pytest.mark.django_db
def test_search_by_position(auth_client, job):
    job.position = "Frontend Developer"
    job.save()
    response = auth_client.get("/api/jobs/?search=frontend")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert "Frontend" in response.data[0]["position"]


@pytest.mark.django_db
def test_combined_filters(auth_client, user):
    JobApplication.objects.create(
        user=user, company="Globant", position="Dev 1", industry="", status="interview", applied_date="2024-03-01"
    )
    JobApplication.objects.create(
        user=user, company="Globant", position="Dev 2", industry="", status="applied", applied_date="2024-03-02"
    )
    JobApplication.objects.create(
        user=user, company="Amazon", position="Dev 3", industry="", status="interview", applied_date="2024-03-03"
    )
    response = auth_client.get("/api/jobs/?status=interview&search=globant")
    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["company"] == "Globant"
    assert response.data[0]["status"] == "interview"


@pytest.mark.django_db
def test_order_by_applied_date_desc(auth_client, user):
    JobApplication.objects.create(
        user=user, company="A", position="X", industry="", status="applied", applied_date="2024-01-01"
    )
    JobApplication.objects.create(
        user=user, company="B", position="Y", industry="", status="applied", applied_date="2024-03-15"
    )
    response = auth_client.get("/api/jobs/")
    assert response.status_code == 200
    assert response.data[0]["applied_date"] == "2024-03-15"
    assert response.data[1]["applied_date"] == "2024-01-01"


@pytest.mark.django_db
def test_create_job_success(auth_client, user):
    response = auth_client.post(
        "/api/jobs/",
        {
            "company": "Google",
            "position": "Software Engineer",
            "industry": "Tech",
            "status": "applied",
            "applied_date": "2024-03-15",
            "job_url": "https://careers.google.com/123",
        },
        format="json",
    )
    assert response.status_code == 201
    assert response.data["company"] == "Google"
    assert isinstance(response.data["id"], int)
    assert JobApplication.objects.filter(user=user).count() == 1


@pytest.mark.django_db
def test_create_without_auth_fails(client):
    response = client.post("/api/jobs/", {"company": "Google"}, format="json")
    assert response.status_code == 401
    assert JobApplication.objects.count() == 0


@pytest.mark.django_db
def test_create_required_fields_validation(auth_client):
    response = auth_client.post("/api/jobs/", {"position": "Developer", "status": "applied"}, format="json")
    assert response.status_code == 400
    assert "company" in response.data
    assert "applied_date" in response.data
    assert JobApplication.objects.count() == 0


@pytest.mark.django_db
def test_create_invalid_status(auth_client):
    response = auth_client.post(
        "/api/jobs/",
        {"company": "Google", "position": "Dev", "status": "en_proceso", "applied_date": "2024-03-15"},
        format="json",
    )
    assert response.status_code == 400
    assert "status" in response.data


@pytest.mark.django_db
def test_create_invalid_url(auth_client):
    response = auth_client.post(
        "/api/jobs/",
        {
            "company": "Google",
            "position": "Dev",
            "status": "applied",
            "applied_date": "2024-03-15",
            "job_url": "esto-no-es-una-url",
        },
        format="json",
    )
    assert response.status_code == 400
    assert "job_url" in response.data


@pytest.mark.django_db
def test_get_own_job_detail(auth_client, job):
    response = auth_client.get(f"/api/jobs/{job.id}/")
    assert response.status_code == 200
    assert response.data["company"] == "Globant"
    assert "notes" in response.data
    assert "history" in response.data
    assert len(response.data["history"]) >= 1


@pytest.mark.django_db
def test_cannot_get_other_user_job(auth_client, other_job):
    response = auth_client.get(f"/api/jobs/{other_job.id}/")
    assert response.status_code == 403


@pytest.mark.django_db
def test_get_non_existing_job(auth_client):
    response = auth_client.get("/api/jobs/99999/")
    assert response.status_code == 404


@pytest.mark.django_db
def test_put_update_job(auth_client, job):
    response = auth_client.put(
        f"/api/jobs/{job.id}/",
        {
            "company": "Globant",
            "position": "Tech Lead",
            "industry": "Fintech",
            "status": "interview",
            "applied_date": "2024-03-01",
            "job_url": "",
        },
        format="json",
    )
    assert response.status_code == 200
    assert response.data["position"] == "Tech Lead"
    assert response.data["status"] == "interview"


@pytest.mark.django_db
def test_patch_only_status(auth_client, job):
    response = auth_client.patch(f"/api/jobs/{job.id}/", {"status": "interview"}, format="json")
    assert response.status_code == 200
    assert response.data["status"] == "interview"
    assert response.data["company"] == "Globant"


@pytest.mark.django_db
def test_cannot_patch_other_user_job(auth_client, other_job):
    response = auth_client.patch(f"/api/jobs/{other_job.id}/", {"status": "interview"}, format="json")
    other_job.refresh_from_db()
    assert response.status_code == 403
    assert other_job.status == "applied"


@pytest.mark.django_db
def test_delete_own_job(auth_client, job):
    response = auth_client.delete(f"/api/jobs/{job.id}/")
    assert response.status_code == 204
    assert not JobApplication.objects.filter(id=job.id).exists()


@pytest.mark.django_db
def test_cannot_delete_other_user_job(auth_client, other_job):
    response = auth_client.delete(f"/api/jobs/{other_job.id}/")
    assert response.status_code == 403
    assert JobApplication.objects.filter(id=other_job.id).exists()


@pytest.mark.django_db
def test_patch_status_creates_history(auth_client, job):
    assert StatusHistory.objects.filter(job=job).count() == 1
    response = auth_client.patch(f"/api/jobs/{job.id}/", {"status": "technical"}, format="json")
    assert response.status_code == 200
    entries = StatusHistory.objects.filter(job=job)
    assert entries.count() == 2
    last = entries.last()
    assert last.from_status == "applied"
    assert last.to_status == "technical"
