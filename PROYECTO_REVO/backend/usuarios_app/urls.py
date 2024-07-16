from django.urls import path
from . views import *

urlpatterns = [
    path('api/register/', UserCreate.as_view(), name='api_register'),
    path('api/login/', login_view, name='api_login'),
    path('api/logout/', logout_view, name='api_logout'),
    path('api/dataUser/', getDataUser, name='api_dataUser'),
    path('api/update-avatar/', updateAvatar, name='api_updateAvatar'),
    path('api/update-profile/', updateProfile, name='api_updateProfile'),
]
