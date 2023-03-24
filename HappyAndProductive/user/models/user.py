import uuid
from datetime import datetime, timedelta

import jwt as jwt
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from user.manager import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('username', max_length=255, unique=True)
    email = models.EmailField('email')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    USERNAME_FIELD = 'username'
    objects = UserManager()

    def __str__(self):
        return str(self.username)


