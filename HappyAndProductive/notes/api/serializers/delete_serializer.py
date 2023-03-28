from rest_framework import serializers

from .utils import delete_model
from notes.models import *


class PlanDeleteSerializer(serializers.Serializer):
    group = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=GroupModel.objects.all()))

    def save(self, **kwargs):
        validated_data = self.validated_data
        name_id = {'group': (GroupModel, True)}
        name_model = {}
        instance = kwargs["instance"]
        delete_model(instance, validated_data, name_model, name_id, self, PlanModel)
        return instance


class ReminderDeleteSerializer(serializers.Serializer):
    group = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=GroupModel.objects.all()))
    notifications = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=NotificationsModel.objects.all()))

    def save(self, **kwargs):
        validated_data = self.validated_data
        name_id = {'group': (GroupModel, True)}
        name_model = {'notifications': (NotificationsModel, True)}
        instance = kwargs["instance"]
        delete_model(instance, validated_data, name_model, name_id, self, ReminderModel)
        return instance


class ScheduleDeleteSerializer(serializers.Serializer):
    group = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=GroupModel.objects.all()))

    def save(self, **kwargs):
        validated_data = self.validated_data
        name_id = {'group': (GroupModel, True)}
        name_model = {}
        instance = kwargs["instance"]
        delete_model(instance, validated_data, name_model, name_id, self, ReminderModel)
        return instance
