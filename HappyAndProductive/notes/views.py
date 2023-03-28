import datetime

from django.contrib.auth import get_user_model, login, authenticate
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views import View

from notes.models import *


class NotesView(View, LoginRequiredMixin):
    def get(self, request):
        print(authenticate(request=request, username='pavel', password='123456789!'))
        return render(request, 'notes/Notes.html')
