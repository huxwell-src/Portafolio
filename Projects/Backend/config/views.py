from rest_framework import status
from rest_framework.response import Response


def ratelimited_error(request, exception):
    return Response(
        {"error": "Demasiadas solicitudes. Intenta en un momento."},
        status=status.HTTP_429_TOO_MANY_REQUESTS,
    )
