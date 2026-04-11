from django.contrib import admin

from jobs.models import JobApplication, Note, StatusHistory


admin.site.register(JobApplication)
admin.site.register(StatusHistory)
admin.site.register(Note)
