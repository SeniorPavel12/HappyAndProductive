from django.contrib.auth import logout
from django.utils.module_loading import import_string
from rest_framework import generics, status
from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPES
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework_simplejwt.settings import api_settings

from user.api.serializers import UserRegisterSerializer
from user.api.service import create_user

from rest_framework.response import Response
from rest_framework.views import APIView

class CreateUserAPIView(APIView):
    permission_classes = ()
    serializer_class = UserRegisterSerializer

    def post(self, request):
        data = request.data
        try:
            user = create_user(data)
        except ValueError as err:
            return Response({'error': 'user with this name already exists'})
        json_register_data = self.serializer_class(user)

        return Response(json_register_data.data)


class LogoutUserAPIView(APIView):

    def post(self, request):
        logout(request)
        return Response()


class TokenViewBase(generics.GenericAPIView):
    permission_classes = ()
    authentication_classes = ()

    serializer_class = None
    _serializer_class = ""

    www_authenticate_realm = "api"

    def get_serializer_class(self):
        """
        If serializer_class is set, use it directly. Otherwise get the class from settings.
        """

        if self.serializer_class:
            return self.serializer_class
        try:
            return import_string(self._serializer_class)
        except ImportError:
            msg = "Could not import serializer '%s'" % self._serializer_class
            raise ImportError(msg)

    def get_authenticate_header(self, request):
        return '{} realm="{}"'.format(
            AUTH_HEADER_TYPES[0],
            self.www_authenticate_realm,
        )

    def post(self, request, *args, **kwargs):
        print(11111111111111)
        serializer = self.get_serializer(data=request.data)
        print(222222222222222)
        try:
            print(33333333333333)
            serializer.is_valid(raise_exception=True)
            print(44444444444444444)
        except TokenError as e:
            print(4.55555555555)
            raise InvalidToken(e.args[0])
        print(55555555555555555555)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)

class TokenObtainPairView(TokenViewBase):
    """
    Takes a set of user credentials and returns an access and refresh JSON web
    token pair to prove the authentication of those credentials.
    """

    _serializer_class = api_settings.TOKEN_OBTAIN_SERIALIZER


