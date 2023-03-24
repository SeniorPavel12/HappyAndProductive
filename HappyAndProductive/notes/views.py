import datetime

from django.contrib.auth import get_user_model, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from django.views import View

from notes.models import *


class NotesView(View, LoginRequiredMixin):
    def get(self, request):
        w = ScheduleModel.objects.create(title="first_schedule", description="This is opisania")
        d = ScheduleDayModel(title_day="MONDAY", condition="WORKING", description="Позаниматься программированием некоторое время", execution_time="2:34:12")
        d.save()
        print(w.schedule_days.add(d))
        return render(request, 'notes/Notes.html')


'''
{
    "title": "first_schedule",
    "description": "This is opisania",
    "days": [{
        "title_day": "MONDAY",
        "condition": "WORKING",
        "description": "Позаниматься программированием некоторое время",
        "execution_time": "2:34:12"},
            {
        "title_day": "TUESDAY",
        "condition": "WORKING",
        "description": "Позаниматься кулинарией некоторое время",
        "execution_time": "1:00:53"},
            {
        "title_day": "WEDNESDAY",
        "condition": "WORKING",
        "description": "Позаниматься спортом некоторое время",
        "execution_time": "0:30:00"}            


            ]
}
'''