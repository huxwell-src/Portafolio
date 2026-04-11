from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver

from jobs.models import JobApplication, StatusHistory


@receiver(pre_save, sender=JobApplication)
def store_previous_status(sender, instance, **kwargs):
    if not instance.pk:
        instance._previous_status = None
        return
    previous = JobApplication.objects.filter(pk=instance.pk).values_list("status", flat=True).first()
    instance._previous_status = previous


@receiver(post_save, sender=JobApplication)
def create_status_history(sender, instance, created, **kwargs):
    from_status = None if created else getattr(instance, "_previous_status", None)
    if created or from_status != instance.status:
        StatusHistory.objects.create(
            job=instance,
            from_status=from_status,
            to_status=instance.status,
        )
