from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, username, password, email=None):
        if username is None:
            raise TypeError('Users must have a username.')
        if password is None:
            raise TypeError('Users must have an password.')

        user = self.model(username=username)
        if email is not None:
            user.email = email
        user.set_password(password)
        if settings.DEBUG:
            user.is_staff = True
            user.is_superuser = True
        user.save()

        return user

    def create_superuser(self, username, password):
        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(username, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
