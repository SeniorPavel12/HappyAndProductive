from rest_framework import serializers

from notes.api.serializers import create_model, partial_model_update
from notes.models import *


class ScheduleDayUpdateListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        response = []
        for ind in range(len(validated_data)):
            serializer_obj = ScheduleDaySerializer(data=validated_data[ind], partial=True)
            if serializer_obj.is_valid():
                response.append(serializer_obj.save())
            else:
                raise serializers.ValidationError(f'Serialization error create many=True in ScheduleDayUpdateListSerializer')
        return response

    def update(self, instance, validated_data):
        response = []
        for ind in range(len(validated_data)):
            serializer_obj = ScheduleDaySerializer(instance[ind], data=validated_data[ind], partial=True)
            if serializer_obj.is_valid():
                response.append(serializer_obj.save())
            else:
                raise serializers.ValidationError(f'Serialization error update many=True in ScheduleDayUpdateListSerializer')
        return response


class ScheduleDaySerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=False)

    def create(self, validated_data):
        name_serializer = {}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, ScheduleDayModel)

    def update(self, instance, validated_data):
        name_serializer = {}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    class Meta:
        model = ScheduleDayModel
        fields = ('id', 'week', 'title_day', 'description', 'condition', 'execution_time', 'start_time', 'end_time')
        list_serializer_class = ScheduleDayUpdateListSerializer


class ScheduleSerializer(serializers.ModelSerializer):
    days = ScheduleDaySerializer(partial=True, many=True)

    def create(self, validated_data):
        name_serializer = {'days': (ScheduleDaySerializer, True)}
        name_id = {}
        return create_model(validated_data, name_serializer, name_id, self, ScheduleModel)

    def update(self, instance, validated_data):
        name_serializer = {'days': (ScheduleDaySerializer, True)}
        name_id = {}
        return partial_model_update(instance, validated_data, name_serializer, name_id, self)

    def validate_day(self, value):
        if len(value) != 7:
            raise serializers.ValidationError('The number of days of the week should be 7')
        all_days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
        for d in value:
            all_days.remove(d['title_day'])
        if len(all_days) != 0:
            raise serializers.ValidationError('Incorrect days of the week are specified')

    class Meta:
        model = ScheduleModel
        exclude = ()
