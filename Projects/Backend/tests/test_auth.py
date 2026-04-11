import pytest
from django.contrib.auth.models import User


@pytest.mark.django_db
def test_register_success(client):
    response = client.post(
        "/api/auth/register/",
        {
            "username": "nicolas",
            "email": "nicolas@email.com",
            "password": "TestPass123",
            "password2": "TestPass123",
        },
        format="json",
    )
    assert response.status_code == 201
    assert response.data["username"] == "nicolas"
    assert response.data["email"] == "nicolas@email.com"
    assert "password" not in response.data
    assert User.objects.count() == 1


@pytest.mark.django_db
def test_register_password_mismatch(client):
    response = client.post(
        "/api/auth/register/",
        {
            "username": "nicolas",
            "email": "nicolas@email.com",
            "password": "ABC123",
            "password2": "XYZ789",
        },
        format="json",
    )
    assert response.status_code == 400
    assert "password" in response.data
    assert User.objects.count() == 0


@pytest.mark.django_db
def test_register_existing_username(client, user):
    response = client.post(
        "/api/auth/register/",
        {
            "username": "nicolas",
            "email": "other@email.com",
            "password": "TestPass123",
            "password2": "TestPass123",
        },
        format="json",
    )
    assert response.status_code == 400
    assert "username" in response.data
    assert User.objects.count() == 1


@pytest.mark.django_db
def test_register_missing_required_field(client):
    response = client.post(
        "/api/auth/register/",
        {"username": "nicolas", "password": "TestPass123", "password2": "TestPass123"},
        format="json",
    )
    assert response.status_code == 400
    assert "email" in response.data


@pytest.mark.django_db
def test_login_success(client, user):
    response = client.post(
        "/api/auth/login/",
        {"username": "nicolas", "password": "TestPass123"},
        format="json",
    )
    assert response.status_code == 200
    assert "access" in response.data
    assert "refresh" in response.data
    assert len(response.data["access"]) > 100


@pytest.mark.django_db
def test_login_wrong_password(client, user):
    response = client.post(
        "/api/auth/login/",
        {"username": "nicolas", "password": "wrong-pass"},
        format="json",
    )
    assert response.status_code == 401
    assert "access" not in response.data


@pytest.mark.django_db
def test_login_non_existing_user(client):
    response = client.post(
        "/api/auth/login/",
        {"username": "noexiste", "password": "cualquiera"},
        format="json",
    )
    assert response.status_code == 401


@pytest.mark.django_db
def test_refresh_success(client, user):
    login = client.post("/api/auth/login/", {"username": "nicolas", "password": "TestPass123"}, format="json")
    old_access = login.data["access"]
    refresh = login.data["refresh"]
    response = client.post("/api/auth/token/refresh/", {"refresh": refresh}, format="json")
    assert response.status_code == 200
    assert "access" in response.data
    assert response.data["access"] != old_access


@pytest.mark.django_db
def test_refresh_invalid_token(client):
    response = client.post("/api/auth/token/refresh/", {"refresh": "esto.no.es.un.jwt"}, format="json")
    assert response.status_code == 401
    assert "access" not in response.data
