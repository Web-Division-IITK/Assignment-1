from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from .models import Note

@api_view(['GET'])


def paths(request):
    routes=[
        {
            'Endpoint':'/notes',
            'method': 'GET',
            'body': None,
            'description': 'to fetch the array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'to fetch a single note'
        },
        {
            'Endpoint': '/notes/add',
            'method': 'POST',
            'body': {'body': ""},
            'description': "to add a note"
        },
        {
            'Endpoint': '/notes/id/update',
            'method': 'PUT',
            'body': {'body': ""},
            'description': "update an existing note"
        },
        {
            'Endpoint': '/notes/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': "delete a note"
        },
    ]
    return Response(routes)

