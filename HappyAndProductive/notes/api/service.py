from datetime import date, timedelta
from calendar import monthrange

from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import APIException

from notes.models import *


def get_reminder(pk):
    return get_object_or_404(ReminderModel, pk=pk)


def get_plan(pk):
    return get_object_or_404(PlanModel, pk=pk)


def get_records_for_period(time_period=None, status=None):
    print(time_period)
    day = date.today()
    reminders, plans = ReminderModel.objects.all(), PlanModel.objects.all()
    print(reminders, plans)
    if time_period is not None:
        print(33333333333)
        if time_period == 'week':
            reminders = ReminderModel.objects.filter(info__date_completion__range=(day - timedelta(days=day.weekday()), day + timedelta(days=6 - day.weekday())))
            plans = PlanModel.objects.filter(info__date_completion__range=(day - timedelta(days=day.weekday()), day + timedelta(days=6 - day.weekday())))
        elif time_period == 'month':
            print(444444444444)
            reminders = ReminderModel.objects.filter(info__date_completion__range=(day - datetime.timedelta(days=day.day), day + datetime.timedelta(days=monthrange(day.year, day.month)[1] - day.day)))
            plans = PlanModel.objects.filter(info__date_completion__range=(day - timedelta(days=day.day), day + timedelta(days=monthrange(day.year, day.month)[1] - day.day)))
            print(plans, reminders)
        elif time_period == 'day':
            reminders = ReminderModel.objects.filter(info__date_completion=day)
            plans = PlanModel.objects.filter(info__date_completion=day)
        else:
            raise APIException
    if status is not None:
        check_reminder = set(el[0] for el in ReminderInfoModel.ConditionChoices.choices).difference(set(el[0] for el in PlanInfoModel.ConditionChoices.choices))
        check_plan = set(el[0] for el in PlanInfoModel.ConditionChoices.choices).difference(set(el[0] for el in ReminderInfoModel.ConditionChoices.choices))
        if status in check_plan:
            plans = plans.filter(info__condition=status)
            reminders = reminders.filter(info__condition='UNFULFILLED')
        elif status in check_reminder:
            plans = plans.filter(info__condition='UNFULFILLED')
            reminders = reminders.filter(info__condition=status)
        else:
            reminders = reminders.filter(info__condition=status)
            plans = plans.filter(info__condition=status)
    return plans, reminders


def get_all_group():
    return GroupModel.objects.all()


def get_all_schedule():
    return ScheduleModel.objects.all()


def get_schedule(pk):
    try:
        return ScheduleModel.objects.get(pk=pk)
    except ObjectDoesNotExist:
        raise APIException("Matching query does not exist")


def get_group(pk):
    try:
        return GroupModel.objects.get(pk=pk)
    except ObjectDoesNotExist:
        raise APIException("Matching query does not exist")


def get_notification(pk):
    try:
        return NotificationsModel.objects.get(pk=pk)
    except ObjectDoesNotExist:
        raise APIException("Matching query does not exist")


def get_timer(pk):
    try:
        return TimerModel.objects.get(pk=pk)
    except ObjectDoesNotExist:
        raise APIException("Matching query does not exist")


def delete_objects(obj):
    obj.delete()


