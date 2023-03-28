import uuid


def delete_model(instance, validated_data, name_model, name_id, self, model):
    for k in validated_data.keys():
        if k in name_id.keys():
            for sup_obj in validated_data[k]:
                getattr(instance, k).remove(sup_obj)
        elif k in name_model.keys():
            for sup_obj in validated_data[k]:
                sup_obj.delete()
    instance.save()
