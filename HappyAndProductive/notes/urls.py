from django.urls import path, include

from .views import *

app_name = 'notes'
urlpatterns = [
    path('', NotesView.as_view(), name='notes'),
    path('api/', include('notes.api.urls')),

]
