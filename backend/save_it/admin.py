from django.contrib import admin

from .models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ('creation_date', 'title', 'description', 'completed', 'deadline')


# Register your models here.
admin.site.register(Task, TaskAdmin)
