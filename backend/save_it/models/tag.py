from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=128)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
