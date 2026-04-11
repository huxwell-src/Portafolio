import pytest

from jobs.models import JobApplication, Note, StatusHistory


@pytest.mark.django_db
def test_history_created_on_job_creation(user):
    job = JobApplication.objects.create(
        user=user, company="A", position="x", industry="", status="applied", applied_date="2024-01-01"
    )
    assert StatusHistory.objects.filter(job=job).count() == 1
    entry = StatusHistory.objects.get(job=job)
    assert entry.from_status is None
    assert entry.to_status == "applied"
    assert entry.changed_at is not None


@pytest.mark.django_db
def test_history_created_when_status_changes_with_save(job):
    job.status = "interview"
    job.save()
    entries = StatusHistory.objects.filter(job=job)
    assert entries.count() == 2
    second = entries.last()
    assert second.from_status == "applied"
    assert second.to_status == "interview"


@pytest.mark.django_db
def test_history_created_when_status_changes_with_patch(auth_client, job):
    response = auth_client.patch(f"/api/jobs/{job.id}/", {"status": "technical"}, format="json")
    assert response.status_code == 200
    entries = StatusHistory.objects.filter(job=job)
    assert entries.count() == 2
    assert entries.last().from_status == "applied"
    assert entries.last().to_status == "technical"


@pytest.mark.django_db
def test_no_history_if_status_not_changed(auth_client, job):
    response = auth_client.patch(f"/api/jobs/{job.id}/", {"position": "Nuevo cargo"}, format="json")
    assert response.status_code == 200
    assert StatusHistory.objects.filter(job=job).count() == 1


@pytest.mark.django_db
def test_multiple_status_changes_create_multiple_entries(auth_client, job):
    assert StatusHistory.objects.filter(job=job).count() == 1
    auth_client.patch(f"/api/jobs/{job.id}/", {"status": "interview"}, format="json")
    auth_client.patch(f"/api/jobs/{job.id}/", {"status": "technical"}, format="json")
    auth_client.patch(f"/api/jobs/{job.id}/", {"status": "offer"}, format="json")
    entries = list(StatusHistory.objects.filter(job=job))
    assert len(entries) == 4
    assert (entries[0].from_status, entries[0].to_status) == (None, "applied")
    assert (entries[1].from_status, entries[1].to_status) == ("applied", "interview")
    assert (entries[2].from_status, entries[2].to_status) == ("interview", "technical")
    assert (entries[3].from_status, entries[3].to_status) == ("technical", "offer")


@pytest.mark.django_db
def test_history_cascade_deleted_with_job(auth_client, job):
    job.status = "interview"
    job.save()
    Note.objects.create(job=job, content="nota")
    assert StatusHistory.objects.filter(job=job).count() >= 2
    response = auth_client.delete(f"/api/jobs/{job.id}/")
    assert response.status_code == 204
    assert StatusHistory.objects.filter(job_id=job.id).count() == 0
