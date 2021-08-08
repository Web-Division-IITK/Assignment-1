from django.urls import path, include
from .api import RegistrationAPI, SigninAPI, UserAPI
from knox import views as knox_views


urlpatterns = [
    path("api/auth", include("knox.urls")),
    path("api/auth/register", RegistrationAPI.as_view()),
    path("api/auth/signin", SigninAPI.as_view()),
    path("api/auth/user", UserAPI.as_view()),
    path("api/auth/logout", knox_views.LogoutView.as_view(), name="knox_logout"),
]
