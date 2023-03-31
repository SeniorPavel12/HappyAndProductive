from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from user.api.views import *

urlpatterns = [
    path('update_token/', TokenRefreshView.as_view()),
    path('login_user/', TokenObtainPairView.as_view()),
    path('create_user/', CreateUserAPIView.as_view()),
    path('logout_user/', LogoutUserAPIView.as_view()),
    path('test/', TestAPIView.as_view()),
]
