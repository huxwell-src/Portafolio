from django.conf import settings
from django.db import models


class JobApplication(models.Model):
    APPLIED = "applied"
    INTERVIEW = "interview"
    TECHNICAL = "technical"
    OFFER = "offer"
    REJECTED = "rejected"
    DISCARDED = "discarded"

    STATUS_CHOICES = [
        (APPLIED, "Postulado"),
        (INTERVIEW, "Entrevista RR.HH."),
        (TECHNICAL, "Prueba técnica"),
        (OFFER, "Oferta recibida"),
        (REJECTED, "Rechazado"),
        (DISCARDED, "Descartado"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    job_url = models.URLField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    applied_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-applied_date", "-created_at"]

    def __str__(self):
        return f"{self.company} - {self.position}"


class StatusHistory(models.Model):
    job = models.ForeignKey(JobApplication, related_name="history", on_delete=models.CASCADE)
    from_status = models.CharField(max_length=20, choices=JobApplication.STATUS_CHOICES, null=True, blank=True)
    to_status = models.CharField(max_length=20, choices=JobApplication.STATUS_CHOICES)
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["changed_at"]


class Note(models.Model):
    job = models.ForeignKey(JobApplication, related_name="notes", on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
