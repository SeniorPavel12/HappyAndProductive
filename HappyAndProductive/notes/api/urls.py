from django.urls import path
from rest_framework import routers

from .views import *
from .viewset import *

router = routers.SimpleRouter()
router.register('create_records', CreateViewSet, basename='create')
router.register('initial_window', InitialViewSet, basename='initial')
router.register('schedule', ScheduleViewSet, basename='schedule')


urlpatterns = [
    path('reminder/<slug:pk>/', ReminderAPIView.as_view()),
    path('plan/<slug:pk>/', PlanAPIView.as_view()),
    path('timer/<slug:pk>/', TimerAPIView.as_view()),
    path('notification/<slug:pk>', NotificationsAPIView.as_view()),
    path('group/<slug:pk>/', GroupAPIView.as_view()),
    path('schedule/<slug:pk>', ScheduleAPIView.as_view()),
]

urlpatterns += router.urls
