from django import forms
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError


class UserRegisterForm(forms.ModelForm):
    class Meta:
        model = get_user_model()
        fields = ('username', 'password')

    def save(self, commit=True):
        user = get_user_model().objects.create_user(username=self.cleaned_data["username"], password=self.cleaned_data["password"])
        return user


class UserLoginForm(forms.Form):
    username = forms.CharField(required=True)
    password = forms.CharField(required=True)

    def clean_password(self):
        password = self.cleaned_data.get('password')
        username = self.cleaned_data.get('username')
        if username:
            try:
                user = get_user_model().objects.get(username=username)
                check_pass = user.check_password(password)
                if check_pass is False:
                    raise Exception('Username/Password error')
            except Exception as e:
                raise ValidationError(e)
            return password
        else:
            raise ValidationError('Введите все поля')

