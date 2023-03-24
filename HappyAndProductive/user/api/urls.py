from django.urls import path

from .views import obtain_auth_token

urlpatterns = [
    path(r'api-token-auth/', obtain_auth_token),
]