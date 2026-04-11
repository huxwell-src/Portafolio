from rest_framework.permissions import BasePermission


class IsOwner(BasePermission):
    message = "No tienes permiso para realizar esta acción."

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
