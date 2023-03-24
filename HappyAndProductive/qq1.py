import datetime
import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class ReminderInfoModel(models.Model):

    class ConditionChoices(models.TextChoices):
        UNFULFILLED = 'UNFULFILLED', _('UNFULFILLED ')
        COMPLETED = 'COMPLETED', _('COMPLETED')
        REMOTE = 'REMOTE', _('REMOTE')

    class ImportanceChoices(models.TextChoices):
        UNKNOWN = 'UNKNOWN', _('UNKNOWN')
        LOW = 'LOW', _('LOW')
        MIDDLE = 'MIDDLE', _('MIDDLE')
        HIGH = 'HIGH', _('HIGH')

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    description = models.TextField(null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    date_completion = models.DateField()
    importance = models.CharField(max_length=8, default=ImportanceChoices.UNKNOWN, choices=ImportanceChoices.choices)
    condition = models.CharField(max_length=11, default=ConditionChoices.UNFULFILLED, choices=ConditionChoices.choices)

    class Meta:
        db_table = 'notes_ReminderInfo'


class PlanInfoModel(models.Model):

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    description = models.TextField(null=True)
    time_create = models.DateTimeField(auto_now_add=True)
    time_update = models.DateTimeField(auto_now=True)
    date_completion = models.DateField()
    timer = models.OneToOneField('notes.TimerModel', on_delete=models.CASCADE, null=True, related_name='plan')
    importance = models.CharField(max_length=8, default=ImportanceChoices.UNKNOWN, choices=ImportanceChoices.choices)
    condition = models.CharField(max_length=11, default=ConditionChoices.UNFULFILLED, choices=ConditionChoices.choices)

    class Meta:
        db_table = 'notes_PlanInfo'


class ReminderModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=200)
    info = models.OneToOneField('notes.ReminderInfoModel', on_delete=models.CASCADE, related_name='reminder', null=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='reminder')
    notifications = models.ManyToManyField('notes.NotificationsModel', related_name='reminder')
    group = models.ManyToManyField('notes.GroupModel', related_name='reminder')


class PlanModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=200)
    info = models.OneToOneField('notes.PlanInfoModel', on_delete=models.CASCADE, related_name='plan', null=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='plan')
    group = models.ManyToManyField('notes.GroupModel', related_name='plan')



# def check_all_days(self):
#     days_of_week = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
#     days = [i.title_day for i in self.schedule_days.all()]
#     now = []
#     for day in days:
#         if day in days_of_week:
#             if day not in now:
#                 now.append(day)
#             else:
#                 raise ValidationError
#         else:
#             raise ValidationError
#     if now != days_of_week:
#         remaining_days = set(days_of_week).difference(set(now))
#         for day in remaining_days:
#             d = ScheduleDayModel(title_day=day)
#             d.save()
#             self.schedule_days.add(d)
