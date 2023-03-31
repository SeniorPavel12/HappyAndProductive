from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import APIException


def create_user(data):
    try:
        username = data['username']
        password = data['password']
    except KeyError:
        msg = "The username and password fields are required"
        raise APIException(msg)
    try:
        user = get_user_model().objects.create_user(username=username, password=password)
    except IntegrityError as err:
        raise ValueError(_("user already exists"))
    if 'email' in data.keys():
        user.email = data['email']
    user.save()
    return user