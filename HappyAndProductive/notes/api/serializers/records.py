from rest_framework import serializers

from .add_info_records import GroupSerializer, NotificationsSerializer
from .sup_records import *
from notes.models import *
from .utils import partial_model_update, create_model


class PlanSerializer(serializers.ModelSerializer):
    info = PlanInfoSerializer(partial=True)
    group = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=GroupModel.objects.all()), required=False)

    def update(self, instance, validated_data):
        name_serializer = {'info': (PlanInfoSerializer, False)}
        name_id = {'group': (GroupModel, True)}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def create(self, validated_data):
        name_serializer = {'info': (PlanInfoSerializer, False)}
        name_id = {'group': (GroupModel, True)}
        return create_model(validated_data, name_serializer, name_id, self, PlanModel)

    class Meta:
        model = PlanModel
        fields = ['id', 'title', 'info', 'group']
        read_only_fields = ['id']


class ReminderSerializer(serializers.ModelSerializer):
    info = ReminderInfoSerializer(partial=True)
    group = serializers.ListSerializer(child=serializers.PrimaryKeyRelatedField(queryset=GroupModel.objects.all()), required=False)
    notifications = NotificationsSerializer(partial=True, many=True, required=False)

    def update(self, instance, validated_data):
        name_serializer = {'info': (PlanInfoSerializer, False), 'notifications': (NotificationsSerializer, True)}
        name_id = {'group': (GroupModel, True)}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def create(self, validated_data):
        name_serializer = {'info': (ReminderInfoSerializer, False), 'notifications': (NotificationsSerializer, True)}
        name_id = {'group': (GroupModel, True)}
        return create_model(validated_data, name_serializer, name_id, self, ReminderModel)

    class Meta:
        model = ReminderModel
        fields = ['id', 'title', 'info', 'group', 'notifications']
        read_only_fields = ['id']
