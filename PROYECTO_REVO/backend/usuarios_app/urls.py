from django.urls import path
from . views import *

urlpatterns = [
    path('', home, name='home'),
    path('entrenamientos/', entrenamientos, name='entrenamientos'),
    path('logout/', exit, name='exit')
]
