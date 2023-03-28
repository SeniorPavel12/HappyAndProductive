import uuid

from rest_framework.exceptions import APIException

from notes.models import ReminderInfoModel, PlanInfoModel, GroupModel


def is_valid_uuid(string):
    try:
        uuid.UUID(str(string))
        return True
    except ValueError:
        return False


def check_valid_period(period):
    valid_period = ['day', 'month', 'condition']
    if period in valid_period:
        return period
    elif period is None:
        return 'day'
    else:
        raise APIException


def check_valid_condition(condition):
    valid_condition = set(el[0] for el in ReminderInfoModel.ConditionChoices.choices + PlanInfoModel.ConditionChoices.choices)
    if condition in valid_condition:
        return condition
    elif condition is None:
        return 'UNFULFILLED'
    else:
        raise APIException
