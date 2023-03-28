from django.urls import path, include

from user.views import *
app_name = 'user'
urlpatterns = [
    path('', UserProfileView.as_view(), name='profile'),
    path('api/', include('user.api.urls')),
]