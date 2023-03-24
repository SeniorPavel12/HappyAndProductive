from django.http import Http404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from notes.api.serializers import *
from notes.api.service import *
from notes.api.utils import *


class ReminderAPIView(APIView):
    serializer_class = ReminderSerializer

    def get(self, request, pk):
        if not is_valid_uuid(pk):
            raise Http404
        reminder = get_reminder(pk)
        json_reminder = self.serializer_class(reminder)
        return Response(json_reminder.data)

    def patch(self, request, pk):
        if not is_valid_uuid(pk):
            raise Http404
        data = request.data
        reminder = get_reminder(pk=pk)
        serializer = self.serializer_class(reminder, data=data, partial=True)
        if serializer.is_valid():
            update_reminder = serializer.save()
            json_reminder = self.serializer_class(update_reminder)
            return Response(json_reminder.data)
        return Response(serializer.errors)


class PlanAPIView(APIView):
    serializer_class = PlanSerializer

    def get(self, request, pk):
        if not is_valid_uuid(pk):
            raise Http404
        plan = get_plan(pk=pk)
        json_plan = self.serializer_class(plan)
        return Response(json_plan.data)

    def patch(self, request, pk):
        if not is_valid_uuid(pk):
            raise Http404
        data = request.data
        plan = get_plan(pk=pk)
        serializer = self.serializer_class(plan, data=data, partial=True)
        if serializer.is_valid():
            update_plan = serializer.save()
            json_plan = self.serializer_class(update_plan)
            return Response(json_plan.data)
        return Response(serializer.errors)


class TimerAPIView(APIView):
    serializer_class = TimerSerializer

    def patch(self, request, pk):
        if not is_valid_uuid(pk):
            raise Http404
        plan = get_plan(pk)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            timer = serializer.save()
            update_timer(plan, timer)
            json_timer = self.serializer_class(timer)
            return Response(json_timer.data)
        return Response(serializer.errors)


class ScheduleAPIView(APIView):
    serializer_class = ScheduleSerializer

    def patch(self, request, pk):
        schedule = get_schedule(pk)
        serializer = self.serializer_class(schedule, data=request.data, partial=True)
        if serializer.is_valid():
            update_schedule = serializer.save()
            json_schedule = ScheduleSerializer(update_schedule)
            return Response(json_schedule.data)
        return Response(serializer.errors)

    def delete(self, request):
        pass


class GroupAPIView(APIView):
    serializer_class = GroupSerializer

    def get(self, request, pk):
        group = get_group(pk)
        json_group = self.serializer_class(group)
        return Response(json_group.data)

    def patch(self, request, pk):
        group = get_group(pk)
        serializer = ScheduleSerializer(group, data=request.data, partial=True)
        if serializer.is_valid():
            update_group = serializer.save()
            json_group = self.serializer_class(update_group)
            return Response(json_group.data)
        return Response(serializer.errors)
