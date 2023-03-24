from django.contrib import admin

from notes.models import *

@admin.register(PlanModel)
class PlanAdmin(admin.ModelAdmin):
    exclude = ('id', 'group')


@admin.register(PlanInfoModel)
class PlanInfoAdmin(admin.ModelAdmin):
    exclude = ('id', 'timer', 'description')


@admin.register(ReminderModel)
class ReminderAdmin(admin.ModelAdmin):
    exclude = ('id', 'notifications', 'group')


@admin.register(ReminderInfoModel)
class ReminderInfoAdmin(admin.ModelAdmin):
    exclude = ('id', 'description')


@admin.register(GroupModel)
class ReminderInfoAdmin(admin.ModelAdmin):
    exclude = ('id', 'description')
