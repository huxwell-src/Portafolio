from django.contrib.auth.models import User
from rest_framework import serializers

from jobs.models import JobApplication, Note, StatusHistory


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "password2")
        extra_kwargs = {
            "email": {"required": True, "allow_blank": False},
            "username": {"required": True, "allow_blank": False},
        }

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": ["Las contraseñas no coinciden."]})
        return attrs

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class StatusHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusHistory
        fields = ("from_status", "to_status", "changed_at")


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("id", "content", "created_at")
        read_only_fields = ("id", "created_at")


class JobApplicationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = (
            "id",
            "company",
            "position",
            "industry",
            "status",
            "applied_date",
            "job_url",
            "created_at",
            "updated_at",
        )
        read_only_fields = ("id", "created_at", "updated_at")


class JobApplicationDetailSerializer(JobApplicationListSerializer):
    notes = NoteSerializer(many=True, read_only=True)
    history = StatusHistorySerializer(many=True, read_only=True)

    class Meta(JobApplicationListSerializer.Meta):
        fields = JobApplicationListSerializer.Meta.fields + ("notes", "history")
