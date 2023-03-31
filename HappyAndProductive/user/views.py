from django.contrib.auth import login, logout, get_user_model
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View

from user.forms import UserRegisterForm, UserLoginForm


class UserProfileView(View):
    def get(self, request):
        print(request.user.is_authenticated)
        return HttpResponse("<h1>Profile</h1>")


class RegistrationView(View):
    def get(self, request):
        return render(request, 'registration/Registration.html')


class LoginView(View):
    def get(self, request):
        return render(request, 'registration/Login.html')