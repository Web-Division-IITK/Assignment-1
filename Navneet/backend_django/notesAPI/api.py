from .models import Note
from rest_framework import permissions, viewsets
from .serializers import NoteSerializer

class NoteViewSets(viewsets.ModelViewSet):
    queryset= Note.objects.all()
    permission_classes=[
        permissions.AllowAny
    ]
    serializer_class= NoteSerializer