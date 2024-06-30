from django.urls import path
from . views import *

urlpatterns = [
    path('', home, name='home'),
    path('entrenamientos/', entrenamientos, name='entrenamientos'),
    path('register/', register, name='register'),
    path('logout/', exit, name='exit'),
    path('api/register/', UserCreate.as_view(), name='user-create'),
]
