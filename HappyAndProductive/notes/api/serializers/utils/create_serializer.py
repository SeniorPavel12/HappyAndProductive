from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

from HappyAndProductive import settings


def create_model(validated_data, name_serializer, name_id, self, model):
    instance = model()
    if hasattr(model, 'user'):
        if settings.DEBUG:
            instance.user = get_user_model().objects.all()[0]
        else:
            raise ValidationError('Implement user assignment (token authentication is needed)')
    lazy_add_list = []
    for k in validated_data.keys():
        if hasattr(instance, k):
            if k in name_serializer.keys():
                many = name_serializer[k][1]
                sup_serializer = name_serializer[k][0](data=validated_data[k], partial=True, many=many)
                if sup_serializer.is_valid():
                    sup_field = sup_serializer.save()
                    if many is False:
                        setattr(instance, k, sup_field)
                    else:
                        lazy_add_list.append((k, sup_field))
                else:
                    raise ValidationError
            elif k in name_id.keys():
                if name_id[k][1] is True:
                    lazy_add_list.append((k, validated_data[k]))
                elif name_id[k][1] is False:
                    lazy_add_list.append((k, [validated_data[k]]))
            elif k in self.fields:
                setattr(instance, k, validated_data[k])
    instance.save()
    lazy_add_m2m_or_m2o(instance, lazy_add_list)
    return instance


def lazy_add_m2m_or_m2o(instance, main):
    if main:
        for m in main:
            getattr(instance, m[0]).set(m[1])
    instance.save()
