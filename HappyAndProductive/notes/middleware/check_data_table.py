import datetime

from .service import *


# лучше сделать ассинхронным
class CheckMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        all_check(request)
        response = self.get_response(request)
        return response


def all_check(request):
    check_status_past_days()


def check_status_past_days():
    now_day = datetime.datetime.now().date()
    data = get_data_past_day(now_day)
    for reminder in data['reminder']:
        if reminder.info.date_completion < now_day:
            reminder.info.condition = 'OVERDUE'
            reminder.info.save()
    for plan in data['plan']:
        if plan.info.date_completion < now_day:
            plan.info.condition = 'OVERDUE'
            plan.info.save()
