from django.urls import path, include

from user.views import *
app_name = 'user'
urlpatterns = [
    path('', UserProfileView.as_view(), name='profile'),
    path('api/', include('user.api.urls')),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('register/', RegisterView.as_view(), name='register'),
]