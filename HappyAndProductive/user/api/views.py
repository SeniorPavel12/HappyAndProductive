from django.contrib.auth import logout, get_user_model

from user.api.service import create_user

from rest_framework.response import Response
from rest_framework.views import APIView


class CreateUserAPIView(APIView):

    def post(self, request):
        data = request.data
        user = create_user(data)
        if type(user) == get_user_model():
            return Response(data)
        return Response(user)


class LogoutUserAPIView(APIView):

    def post(self, request):
        logout(request)
        return Response()


