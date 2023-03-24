import time
import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


class NotificationsModel(models.Model):

    class ConditionChoices(models.TextChoices):
        POSTPONED = 'POSTPONED', _('POSTPONED')
        UNFULFILLED = 'UNFULFILLED', _('UNFULFILLED ')
        COMPLETED = 'COMPLETED', _('COMPLETED')

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    time_reaction = models.DateTimeField()
    description = models.TextField(null=True)
    condition = models.CharField(max_length=11, choices=ConditionChoices.choices, default=ConditionChoices.UNFULFILLED)

    class Meta:
        db_table = 'notes_Notifications'


class GroupModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    color = models.CharField(max_length=9, unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField(null=True)

    class Meta:
        db_table = 'notes_Group'


class TimerModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    time_left = models.PositiveBigIntegerField(null=True)

    class Meta:
        db_table = 'notes_Timer'
