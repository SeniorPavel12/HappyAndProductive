from rest_framework.exceptions import ValidationError


def partial_model_update(instance, validated_data, name_serializer, name_id, self):
    for k in validated_data.keys():
        if hasattr(instance, k):
            if k in name_serializer.keys():
                field_in_name_serializer(instance, validated_data, name_serializer, k)
            elif k in name_id.keys():
                field_in_name_id(instance, validated_data, name_id, k)
            elif k in self.fields:
                field_in_fields(instance, validated_data, k)
    instance.save()
    return instance


def field_in_name_serializer(instance, validated_data, name_serializer, k):
    many = name_serializer[k][1]
    if many is True:
        sup_instances = get_objects_m2m_or_m2o(validated_data[k], name_serializer[k][0].Meta.model)
    else:
        sup_instances = getattr(instance, k)
    sup_serializer = name_serializer[k][0](sup_instances, data=validated_data[k], partial=True, many=many)
    if sup_serializer.is_valid():
        sup_obj = sup_serializer.save()
        if many is True:
            check_and_add_m2m(instance, k, sup_obj)
    else:
        raise ValidationError(f"Errors: {sup_serializer.errors}")


def field_in_name_id(instance, validated_data, name_id, k):
    if name_id[k][1] is True:
        for sup_obj in validated_data[k]:
            getattr(instance, k).add(sup_obj)
    elif name_id[k][1] is False:
        sup_obj = validated_data[k]
        getattr(instance, k).add(sup_obj)


def field_in_fields(instance, validated_data, k):
    setattr(instance, k, validated_data[k])



def check_and_add_m2m(instance, k, objs):
    for o in objs:
        getattr(instance, k).add(o)


def get_objects_m2m_or_m2o(validated_data, model):
    objects = []
    for d in validated_data:
        id = d['id']
        objects.append(model.objects.get(pk=id))
    return objects

