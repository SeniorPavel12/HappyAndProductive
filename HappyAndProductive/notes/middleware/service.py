from notes.models import *


def get_data_past_day(now_day):
    data = {
        'plan': PlanModel.objects.filter(info__date_completion__lt=now_day),
        'reminder': ReminderModel.objects.filter(info__date_completion__lt=now_day),
    }
    return data
