from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

from user.api.views import *

urlpatterns = [
    path('login_user/', ObtainAuthToken.as_view()),
    path('create_user/', RegisterAPIView.as_view()),
]
