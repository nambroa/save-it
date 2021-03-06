from django.db import models

from save_it.models.tag import Tag


class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    creation_date = models.DateField(auto_now_add=True)
    deadline = models.DateField()
    tags = models.ManyToManyField(Tag, related_name='tasks', blank=True)
    user = models.EmailField(max_length=300)

    def __str__(self):
        return self.title

    def get_title(self):
        return self.title

    def get_description(self):
        return self.description

    def get_completed_status(self):
        return self.completed

    def get_creation_date(self):
        return self.creation_date

    def get_deadline(self):
        return self.deadline

    def get_tags(self):
        return self.tags

    def get_user(self):
        return self.user
