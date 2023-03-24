import uuid

from django.db import models
from django.core.exceptions import ValidationError
from django.utils.translation import gettext_lazy as _


class ScheduleDayModel(models.Model):

    class TitleChoices(models.TextChoices):
        Monday = 'MONDAY', _('MONDAY')
        Tuesday = 'TUESDAY', _('TUESDAY')
        Wednesday = 'WEDNESDAY', _('WEDNESDAY')
        Thursday = 'THURSDAY', _('THURSDAY')
        Friday = 'FRIDAY', _('FRIDAY')
        Saturday = 'SATURDAY', _('SATURDAY')
        Sunday = 'SUNDAY', _('SUNDAY')

    class ConditionChoices(models.TextChoices):
        WORKING = 'WORKING', _('WORKING')
        WEEKEND = 'WEEKEND', _('WEEKEND')

    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    week = models.ForeignKey('ScheduleModel', on_delete=models.CASCADE, related_name='days', null=True)
    title_day = models.CharField(max_length=20, choices=TitleChoices.choices)
    condition = models.CharField(max_length=20, choices=ConditionChoices.choices, default=ConditionChoices.WEEKEND)
    description = models.TextField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)
    execution_time = models.TimeField(null=True, blank=True)

    def clean(self):
        if (self.start_time is None and self.end_time is not None) or (self.start_time is not None and self.end_time is None):
            raise ValidationError
        if self.condition == 'WEEKEND':
            if self.description is not None or self.start_time is not None or self.end_time is not None or self.execution_time is not None:
                raise ValidationError
        elif self.condition == 'WORKING':
            if self.description is None:
                raise ValidationError

    def __str__(self):
        return self.title_day

    class Meta:
        db_table = 'notes_ScheduleDay'


class ScheduleModel(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True)
    title = models.CharField(max_length=40)
    description = models.TextField(null=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'notes_Schedule'
