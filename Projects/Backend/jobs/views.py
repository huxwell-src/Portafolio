import csv
from datetime import date

from django.http import StreamingHttpResponse
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django_ratelimit.decorators import ratelimit
from drf_spectacular.utils import OpenApiResponse, extend_schema, inline_serializer
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView

from jobs.analytics import calculate_by_industry, calculate_stats, calculate_timeline, predict_advance
from jobs.models import JobApplication, Note
from jobs.permissions import IsOwner
from jobs.serializers import (
    JobApplicationDetailSerializer,
    JobApplicationListSerializer,
    NoteSerializer,
    RegisterSerializer,
)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    @extend_schema(
        request=RegisterSerializer,
        responses={
            201: inline_serializer(
                name="RegisterSuccessResponse",
                fields={
                    "id": serializers.IntegerField(),
                    "username": serializers.CharField(),
                    "email": serializers.EmailField(),
                },
            ),
            400: OpenApiResponse(description="Error de validación"),
            429: OpenApiResponse(description="Demasiadas solicitudes"),
        },
        tags=["Auth"],
        summary="Registro de usuario",
        description="Registra un usuario y retorna id, username y email.",
    )
    @method_decorator(ratelimit(key="ip", rate="5/m", method="POST", block=True))
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"id": user.id, "username": user.username, "email": user.email},
            status=status.HTTP_201_CREATED,
        )


@method_decorator(ratelimit(key="ip", rate="10/m", method="POST", block=True), name="dispatch")
class LoginView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class Echo:
    def write(self, value):
        return value


class JobViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsOwner]
    filterset_fields = ["status", "industry"]
    search_fields = ["company", "position"]

    def get_queryset(self):
        return JobApplication.objects.filter(user=self.request.user).order_by("-applied_date", "-created_at")

    def get_serializer_class(self):
        if self.action == "retrieve":
            return JobApplicationDetailSerializer
        return JobApplicationListSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @method_decorator(ratelimit(key="user_or_ip", rate="30/m", method="POST", block=True))
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def get_object(self):
        obj = get_object_or_404(JobApplication, pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    @action(detail=False, methods=["get"], url_path="stats")
    def stats(self, request):
        return Response(calculate_stats(self.get_queryset()))

    @action(detail=False, methods=["get"], url_path="stats/by-industry")
    def stats_by_industry(self, request):
        return Response(calculate_by_industry(self.get_queryset()))

    @action(detail=False, methods=["get"], url_path="stats/timeline")
    def stats_timeline(self, request):
        return Response(calculate_timeline(self.get_queryset()))

    @action(detail=True, methods=["get"], url_path="predict")
    def predict(self, request, pk=None):
        job = self.get_object()
        return Response(predict_advance(job))

    @action(detail=True, methods=["get", "post"], url_path="notes")
    def notes(self, request, pk=None):
        job = self.get_object()
        if request.method == "GET":
            serializer = NoteSerializer(job.notes.all(), many=True)
            return Response(serializer.data)

        serializer = NoteSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(job=job)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=["delete"], url_path=r"notes/(?P<note_id>[^/.]+)")
    def delete_note(self, request, pk=None, note_id=None):
        job = self.get_object()
        note = get_object_or_404(Note, id=note_id, job=job)
        note.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    @method_decorator(ratelimit(key="user_or_ip", rate="10/m", method="GET", block=True))
    @action(detail=False, methods=["get"], url_path="export/csv")
    def export_csv(self, request):
        jobs = self.get_queryset()

        def row_generator():
            pseudo_buffer = Echo()
            writer = csv.writer(pseudo_buffer)
            yield "\ufeff" + writer.writerow(
                [
                    "empresa",
                    "cargo",
                    "rubro",
                    "estado",
                    "fecha_postulacion",
                    "dias_transcurridos",
                    "url_oferta",
                ]
            )
            today = date.today()
            for job in jobs:
                yield writer.writerow(
                    [
                        job.company,
                        job.position,
                        job.industry,
                        job.status,
                        job.applied_date.isoformat(),
                        (today - job.applied_date).days,
                        job.job_url or "",
                    ]
                )

        response = StreamingHttpResponse(row_generator(), content_type="text/csv")
        response["Content-Disposition"] = 'attachment; filename="jobtracker_export.csv"'
        return response
