from rest_framework import routers
from .api import NoteViewSets

router = routers.DefaultRouter()
router.register('api/notesAPI',NoteViewSets,'notesAPI')

urlpatterns = router.urls
