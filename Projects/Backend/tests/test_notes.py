import pytest

from jobs.models import Note


@pytest.mark.django_db
def test_list_notes_own_job(auth_client, job):
    Note.objects.create(job=job, content="Nota 1")
    Note.objects.create(job=job, content="Nota 2")
    response = auth_client.get(f"/api/jobs/{job.id}/notes/")
    assert response.status_code == 200
    assert len(response.data) == 2
    assert "content" in response.data[0]
    assert "created_at" in response.data[0]


@pytest.mark.django_db
def test_cannot_list_notes_other_job(auth_client, other_job):
    response = auth_client.get(f"/api/jobs/{other_job.id}/notes/")
    assert response.status_code == 403


@pytest.mark.django_db
def test_create_note_success(auth_client, job):
    response = auth_client.post(f"/api/jobs/{job.id}/notes/", {"content": "Entrevista el 20 de marzo"}, format="json")
    assert response.status_code == 201
    assert response.data["content"] == "Entrevista el 20 de marzo"
    assert "id" in response.data
    assert "created_at" in response.data
    assert Note.objects.filter(job=job).count() == 1


@pytest.mark.django_db
def test_cannot_create_note_other_job(auth_client, other_job):
    response = auth_client.post(f"/api/jobs/{other_job.id}/notes/", {"content": "cualquier nota"}, format="json")
    assert response.status_code == 403
    assert Note.objects.filter(job=other_job).count() == 0


@pytest.mark.django_db
def test_create_note_empty_content_fails(auth_client, job):
    response = auth_client.post(f"/api/jobs/{job.id}/notes/", {"content": ""}, format="json")
    assert response.status_code == 400
    assert "content" in response.data


@pytest.mark.django_db
def test_delete_own_note(auth_client, job, note):
    response = auth_client.delete(f"/api/jobs/{job.id}/notes/{note.id}/")
    assert response.status_code == 204
    assert not Note.objects.filter(id=note.id).exists()


@pytest.mark.django_db
def test_cannot_delete_other_user_note(auth_client, other_job):
    other_note = Note.objects.create(job=other_job, content="Nota privada")
    response = auth_client.delete(f"/api/jobs/{other_job.id}/notes/{other_note.id}/")
    assert response.status_code == 403
    assert Note.objects.filter(id=other_note.id).exists()
