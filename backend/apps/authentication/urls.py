from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('me/', views.current_user, name='current_user'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]