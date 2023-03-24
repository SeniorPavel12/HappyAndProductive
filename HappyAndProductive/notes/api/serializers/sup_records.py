from rest_framework import serializers

from .add_info_records import TimerSerializer
from .utils import partial_model_update, create_model
from notes.models import *


class PlanInfoSerializer(serializers.ModelSerializer):
    timer = TimerSerializer(partial=True)

    class Meta:
        model = PlanInfoModel
        fields = ['id', 'description', 'time_create', 'time_update', 'date_completion', 'importance', 'condition', 'timer']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        name_serializer = {'timer': (TimerSerializer, False)}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def create(self, validated_data):
        name_serializer = {'timer': (TimerSerializer, False)}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, PlanInfoModel)


class ReminderInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReminderInfoModel
        fields = ['id', 'description', 'time_create', 'time_update', 'date_completion', 'importance', 'condition']
        read_only_fields = ['id']

    def update(self, instance, validated_data):
        name_serializer = {}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def create(self, validated_data):
        name_serializer = {}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, ReminderInfoModel)








