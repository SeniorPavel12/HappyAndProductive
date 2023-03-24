import datetime
import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from .sup_records import TimerModel


class ReminderInfoModel(models.Model):

    class ConditionChoices(models.TextChoices):
        OVERDUE = 'OVERDUE', _('OVERDUE')
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


class ReminderModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=200)
    info = models.OneToOneField('ReminderInfoModel', on_delete=models.CASCADE, related_name='reminder', null=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='reminder')
    notifications = models.ManyToManyField('notes.NotificationsModel', related_name='reminder')
    group = models.ManyToManyField('notes.GroupModel', related_name='reminder')

    class Meta:
        db_table = 'notes_Reminder'

    def save(self, *args, **kwargs):
        if self.info is None:
            self.info = ReminderInfoModel.obejcts.create(date_completion=datetime.date.today())
        super().save(*args, **kwargs)


class PlanInfoModel(models.Model):
    class ConditionChoices(models.TextChoices):
        OVERDUE = 'OVERDUE', _('OVERDUE')
        UNFULFILLED = 'UNFULFILLED', _('UNFULFILLED ')
        COMPLETED = 'COMPLETED', _('COMPLETED')
        REMOTE = 'REMOTE', _('REMOTE')
        RUNNING = 'RUNNING', _('RUNNING')

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
    timer = models.OneToOneField('notes.TimerModel', on_delete=models.CASCADE, null=True, related_name='plan')
    importance = models.CharField(max_length=8, default=ImportanceChoices.UNKNOWN, choices=ImportanceChoices.choices)
    condition = models.CharField(max_length=11, default=ConditionChoices.UNFULFILLED, choices=ConditionChoices.choices)

    class Meta:
        db_table = 'notes_PlanInfo'


class PlanModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=200)
    info = models.OneToOneField('PlanInfoModel', on_delete=models.CASCADE, related_name='plan', null=True)
    user = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='plan')
    group = models.ManyToManyField('notes.GroupModel', related_name='plan')

    class Meta:
        db_table = 'notes_Plan'

    def save(self, *args, **kwargs):
        if self.info is None:
            self.info = PlanInfoModel.objects.create(date_completion=datetime.date.today())
        super().save(*args, **kwargs)





