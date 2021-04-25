from django.db import models


# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    creation_date = models.DateField(auto_now_add=True)
    deadline = models.DateField()

    def __str__(self):
        return self.title
