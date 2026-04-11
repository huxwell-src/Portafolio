from datetime import date, timedelta

from django.db.models import Count, Q
from django.db.models.functions import TruncWeek
from django.utils import timezone

from jobs.models import JobApplication


def _round1(number):
    return round(float(number), 1)


def calculate_stats(queryset):
    total = queryset.count()
    by_status = {
        status: queryset.filter(status=status).count()
        for status, _ in JobApplication.STATUS_CHOICES
    }

    if total == 0:
        response_rate = 0.0
        offer_rate = 0.0
    else:
        progressed = total - by_status[JobApplication.APPLIED] - by_status[JobApplication.DISCARDED]
        response_rate = _round1((progressed / total) * 100)
        offer_rate = _round1((by_status[JobApplication.OFFER] / total) * 100)

    today = date.today()
    applied_last_7_days = queryset.filter(applied_date__gte=today - timedelta(days=7)).count()
    applied_last_30_days = queryset.filter(applied_date__gte=today - timedelta(days=30)).count()

    # Cálculo simple y robusto de días al primer cambio real de estado.
    days = []
    for job in queryset.prefetch_related("history"):
        first_change = next((h for h in job.history.all() if h.from_status is not None), None)
        if first_change:
            days.append((first_change.changed_at.date() - job.applied_date).days)
    avg_days_to_response = _round1(sum(days) / len(days)) if days else None

    return {
        "total": total,
        "by_status": by_status,
        "response_rate": response_rate,
        "offer_rate": offer_rate,
        "applied_last_7_days": applied_last_7_days,
        "applied_last_30_days": applied_last_30_days,
        "avg_days_to_response": avg_days_to_response,
    }


def calculate_by_industry(queryset):
    groups = queryset.values("industry").annotate(
        total=Count("id"),
        applied=Count("id", filter=Q(status=JobApplication.APPLIED)),
        discarded=Count("id", filter=Q(status=JobApplication.DISCARDED)),
        offer=Count("id", filter=Q(status=JobApplication.OFFER)),
    ).order_by("-total")

    results = []
    for group in groups:
        total = group["total"]
        progressed = total - group["applied"] - group["discarded"]
        industry = group["industry"] or "Sin rubro"
        results.append(
            {
                "industry": industry,
                "total": total,
                "response_rate": _round1((progressed / total) * 100) if total else 0.0,
                "offer_rate": _round1((group["offer"] / total) * 100) if total else 0.0,
            }
        )
    return results


def calculate_timeline(queryset):
    today = timezone.now().date()
    this_week_start = today - timedelta(days=today.weekday())
    week_starts = [this_week_start - timedelta(weeks=offset) for offset in reversed(range(12))]

    aggregate = queryset.annotate(week_start=TruncWeek("applied_date")).values("week_start").annotate(
        count=Count("id")
    )
    mapping = {}
    for row in aggregate:
        week_value = row["week_start"]
        if not week_value:
            continue
        key = week_value.date() if hasattr(week_value, "date") else week_value
        mapping[key] = row["count"]

    timeline = []
    for week_start in week_starts:
        iso_year, iso_week, _ = week_start.isocalendar()
        timeline.append(
            {
                "week": f"{iso_year}-W{iso_week:02d}",
                "count": int(mapping.get(week_start, 0)),
            }
        )
    return timeline


def _label_for_score(score):
    if score <= 29:
        return "Pocas chances"
    if score <= 60:
        return "En proceso"
    if score <= 85:
        return "Buenas chances"
    return "Muy prometedor"


def predict_advance(job):
    if job.status in [JobApplication.REJECTED, JobApplication.DISCARDED]:
        return {
            "job_id": job.id,
            "company": job.company,
            "current_status": job.status,
            "score": 0,
            "label": "Pocas chances",
            "tips": [],
        }

    base_scores = {
        JobApplication.APPLIED: 30,
        JobApplication.INTERVIEW: 55,
        JobApplication.TECHNICAL: 75,
        JobApplication.OFFER: 95,
    }
    score = base_scores.get(job.status, 20)
    tips = []

    if job.notes.exists():
        score += 5
        tips.append("Tienes notas registradas, úsalas para prepararte")

    has_positive_history = JobApplication.objects.filter(
        user=job.user,
        company=job.company,
        status__in=[JobApplication.INTERVIEW, JobApplication.TECHNICAL, JobApplication.OFFER],
    ).exclude(id=job.id).exists()
    if has_positive_history:
        score += 10
        tips.append("La empresa ha respondido bien antes")

    if (timezone.now() - job.updated_at).days > 14:
        score -= 10
        tips.append("Han pasado más de 14 días sin respuesta, considera hacer seguimiento")

    if job.status in [JobApplication.TECHNICAL, JobApplication.OFFER]:
        tips.append("Estás en una etapa avanzada del proceso")

    score = max(0, min(100, score))
    return {
        "job_id": job.id,
        "company": job.company,
        "current_status": job.status,
        "score": score,
        "label": _label_for_score(score),
        "tips": tips,
    }
