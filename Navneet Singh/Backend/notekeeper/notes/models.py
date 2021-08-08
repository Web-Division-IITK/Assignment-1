from django.db import models

from django.contrib.auth.models import User

# Create your models here.
class Note(models.Model):
    title=models.CharField(max_length=100)
    description=models.CharField(max_length=1000, blank=True)
    owner=models.ForeignKey(User, related_name='notes',on_delete=models.CASCADE, null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

