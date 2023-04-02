from django.contrib.auth import get_user_model
from django.db import IntegrityError
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import APIException


def create_user(data):

    if 'username' not in data or 'password' not in data:
        msg = "The username and password fields are required"
        return {"detail": msg}
    username = data['username']
    password = data['password']
    try:
        user = get_user_model().objects.get(pk=username)
    except get_user_model().DoesNotExist:
        user = get_user_model().objects.create_user(username=username, password=password)
        return user
    msg = "User with this name already exists"
    return {"detail": msg}