import uuid
from datetime import datetime, timedelta

import jwt as jwt
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, AbstractUser
from django.db import models

from user.manager import UserManager



class User(AbstractUser):
    id = models.UUIDField('id', unique=True, default=uuid.uuid4)
    username = models.CharField('username', max_length=255, primary_key=True)
    email = models.EmailField('email', null=True)

    def __str__(self):
        return str(self.username)


