from rest_framework import serializers

from .utils import partial_model_update, create_model
from notes.models import *


class GroupSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        name_serializer = {}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def create(self, validated_data):
        name_serializer = {}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, GroupModel)

    class Meta:
        model = GroupModel
        fields = ['id', 'color', 'title', 'description']


class NotificationsUpdateListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        response = []
        for ind in range(len(validated_data)):
            serializer_obj = NotificationsSerializer(data=validated_data[ind], partial=True)
            if serializer_obj.is_valid():
                response.append(serializer_obj.save())
            else:
                raise serializers.ValidationError(f'Serialization error create many=True in NotificationsUpdateListSerializer')
        return response

    def update(self, instance, validated_data):
        response = []
        for ind in range(len(validated_data)):
            serializer_obj = NotificationsSerializer(instance[ind], data=validated_data[ind], partial=True)
            if serializer_obj.is_valid():
                obj = serializer_obj.save()
                response.append(obj)
            else:
                raise serializers.ValidationError(f'Serialization error update many=True in NotificationsUpdateListSerializer')
        return response


class NotificationsSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)

    def create(self, validated_data):
        name_serializer = {}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, NotificationsModel)

    def update(self, instance, validated_data):
        name_serializer = {}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    class Meta:
        model = NotificationsModel
        fields = ['id', 'time_reaction', 'description', 'condition']
        list_serializer_class = NotificationsUpdateListSerializer


class TimerSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        name_serializer = {}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def create(self, validated_data):
        name_serializer = {}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, TimerModel)

    class Meta:
        model = TimerModel
        fields = ['time_left']
