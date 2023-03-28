from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.renderers import *
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .serializers import *
from .service import *
from .utils import *


class InitialViewSet(ViewSet):

    @action(detail=False, methods=['get'])
    def get_records_for_period(self, request):
        time_period = request.query_params.get('period')
        time_period = check_valid_period(time_period)
        plans, reminders = get_records_for_period(time_period=time_period)
        json_plans, json_reminders = PlanSerializer(plans, many=True), ReminderSerializer(reminders, many=True)
        all_records = {'plans': json_plans.data, 'reminders': json_reminders.data}
        return Response(all_records)

    @action(detail=False, methods=['get'])
    def get_all_groups(self, request):
        groups = get_all_group()
        json_group = GroupSerializer(groups, many=True)
        return Response(json_group.data)

    @action(detail=False, methods=['get'])
    def get_all_records_for_status(self, request):
        condition = request.query_params.get('condition')
        condition = check_valid_condition(condition)
        plans, reminders = get_records_for_period(status=condition)
        json_plans, json_reminders = PlanSerializer(plans, many=True), ReminderSerializer(reminders, many=True)
        all_records = {'plans': json_plans.data, 'reminders': json_reminders.data}
        return Response(all_records)


class CreateViewSet(ViewSet):

    @action(detail=False, methods=['post'])
    def create_reminder(self, request):
        serializer = ReminderSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            reminder = serializer.save()
            json_reminder = ReminderSerializer(reminder)
            return Response(json_reminder.data)
        return serializer.errors

    @action(detail=False, methods=['post'])
    def create_plan(self, request):
        serializer = PlanSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            plan = serializer.save()
            json_plan = PlanSerializer(plan)
            return Response(json_plan.data)
        return Response(serializer.errors)

    @action(detail=False, methods=['post'])
    def create_group(self, request):
        serializer = GroupSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            group = serializer.save()
            json_group = GroupSerializer(group)
            return Response(json_group.data)
        return Response(serializer.errors)

    @action(detail=False, methods=['post'])
    def create_notification(self, request):
        serializer = NotificationsSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            notifications = serializer.save()
            json_notifications = NotificationsSerializer(notifications)
            return Response(json_notifications.data)
        return Response(serializer.errors)

    @action(detail=False, methods=['post'])
    def create_schedule(self, request):
        serializer = ScheduleSerializer(data=request.data, partial=True)
        if serializer.is_valid():
            schedule = serializer.save()
            json_schedule = ScheduleSerializer(schedule)
            return Response(json_schedule.data)
        return Response(serializer.errors)


class ScheduleViewSet(ViewSet):

    @action(detail=False, methods=['get'])
    def get_all_schedules(self, request):
        schedules = get_all_schedule()
        json_schedule = ScheduleSerializer(schedules, many=True)
        return Response(json_schedule.data)
