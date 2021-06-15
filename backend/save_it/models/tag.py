from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=64, unique=True)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name    
