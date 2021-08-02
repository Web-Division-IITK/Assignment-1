from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    title = models.TextField(max_length=100,null=True)
    description = models.TextField(max_length=1000,null=True)
    owner = models.ForeignKey(User , related_name='notesAPI',on_delete=models.CASCADE,null=True)
    creationTime=models.DateTimeField(auto_now_add=True)
    updationTime=models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering= ['-updationTime']
