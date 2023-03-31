import datetime

from django.contrib.auth import get_user_model, login, authenticate
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views import View

from notes.models import *


class NotesView(View, LoginRequiredMixin):
    def get(self, request):
        return render(request, 'notes/Notes.html')
