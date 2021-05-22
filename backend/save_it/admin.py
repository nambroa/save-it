from django.contrib import admin

from save_it.models.tag import Tag
from save_it.models.task import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ('creation_date', 'title', 'description', 'completed', 'deadline')


class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'color')


# Register your models here.
admin.site.register(Task, TaskAdmin)
admin.site.register(Tag, TagAdmin)
