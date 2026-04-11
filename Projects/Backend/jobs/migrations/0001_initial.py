from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="JobApplication",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("company", models.CharField(max_length=200)),
                ("position", models.CharField(max_length=200)),
                ("job_url", models.URLField(blank=True)),
                ("industry", models.CharField(blank=True, max_length=100)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("applied", "Postulado"),
                            ("interview", "Entrevista RR.HH."),
                            ("technical", "Prueba técnica"),
                            ("offer", "Oferta recibida"),
                            ("rejected", "Rechazado"),
                            ("discarded", "Descartado"),
                        ],
                        max_length=20,
                    ),
                ),
                ("applied_date", models.DateField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
                ),
            ],
            options={"ordering": ["-applied_date", "-created_at"]},
        ),
        migrations.CreateModel(
            name="StatusHistory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                (
                    "from_status",
                    models.CharField(
                        blank=True,
                        choices=[
                            ("applied", "Postulado"),
                            ("interview", "Entrevista RR.HH."),
                            ("technical", "Prueba técnica"),
                            ("offer", "Oferta recibida"),
                            ("rejected", "Rechazado"),
                            ("discarded", "Descartado"),
                        ],
                        max_length=20,
                        null=True,
                    ),
                ),
                (
                    "to_status",
                    models.CharField(
                        choices=[
                            ("applied", "Postulado"),
                            ("interview", "Entrevista RR.HH."),
                            ("technical", "Prueba técnica"),
                            ("offer", "Oferta recibida"),
                            ("rejected", "Rechazado"),
                            ("discarded", "Descartado"),
                        ],
                        max_length=20,
                    ),
                ),
                ("changed_at", models.DateTimeField(auto_now_add=True)),
                (
                    "job",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="history",
                        to="jobs.jobapplication",
                    ),
                ),
            ],
            options={"ordering": ["changed_at"]},
        ),
        migrations.CreateModel(
            name="Note",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("content", models.TextField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "job",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="notes",
                        to="jobs.jobapplication",
                    ),
                ),
            ],
            options={"ordering": ["-created_at"]},
        ),
    ]
