from notes.models.records import ReminderModel


def get_ReminderModel(id):
    return ReminderModel.objects.get(id=id)