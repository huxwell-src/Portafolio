import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from jobs.models import JobApplication, Note


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture(autouse=True)
def disable_ratelimit_for_tests(settings):
    settings.RATELIMIT_ENABLE = False


@pytest.fixture
def user(db):
    return User.objects.create_user(
        username="nicolas",
        email="nicolas@email.com",
        password="TestPass123",
    )


@pytest.fixture
def other_user(db):
    return User.objects.create_user(
        username="otro",
        email="otro@email.com",
        password="TestPass123",
    )


@pytest.fixture
def auth_client(client, user):
    response = client.post(
        "/api/auth/login/",
        {"username": "nicolas", "password": "TestPass123"},
        format="json",
    )
    token = response.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    return client


@pytest.fixture
def other_auth_client(client, other_user):
    response = client.post(
        "/api/auth/login/",
        {"username": "otro", "password": "TestPass123"},
        format="json",
    )
    token = response.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")
    return client


@pytest.fixture
def job(db, user):
    return JobApplication.objects.create(
        user=user,
        company="Globant",
        position="Senior Frontend Developer",
        industry="Fintech",
        status="applied",
        applied_date="2024-03-01",
        job_url="https://globant.com/jobs/123",
    )


@pytest.fixture
def job_interview(db, user):
    return JobApplication.objects.create(
        user=user,
        company="Mercado Libre",
        position="Backend Engineer",
        industry="Ecommerce",
        status="interview",
        applied_date="2024-03-05",
    )


@pytest.fixture
def other_job(db, other_user):
    return JobApplication.objects.create(
        user=other_user,
        company="Amazon",
        position="Cloud Engineer",
        industry="Tech",
        status="applied",
        applied_date="2024-03-10",
    )


@pytest.fixture
def note(db, job):
    return Note.objects.create(job=job, content="Hablar con recruiter sobre el stack")
