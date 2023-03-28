from django.contrib.auth import login, logout, get_user_model
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views import View

from user.forms import UserRegisterForm, UserLoginForm


class UserProfileView(View):
    def get(self, request):
        return HttpResponse("<h1>Profile</h1>")


class LoginView(View):
    def get(self, request):
        form = UserLoginForm()
        return render(request, 'user/Login.html', {'form': form})

    def post(self, request):
        form = UserLoginForm(request.POST)
        if form.is_valid():
            user = get_user_model().objects.get(username=form.cleaned_data.get("username"))
            password = form.cleaned_data.get("password")
            check_pass = user.check_password(password)
            if check_pass is True:
                login(request, user, backend='rest_framework.authentication.BasicAuthentication')
                return redirect(reverse_lazy('notes:notes'))
        return render(request, 'user/Login.html', {'form': form})


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect(reverse_lazy('user:login'))


class RegisterView(View):
    def get(self, request):
        if not request.user.is_authenticated:
            form = UserRegisterForm()
            return render(request, 'user/Register.html', {'form': form})
        else:
            return redirect(reverse_lazy('notes:notes'))

    def post(self, request):
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect(reverse_lazy('notes:notes'))
        return render(request, 'user/Register.html', {'form': form})