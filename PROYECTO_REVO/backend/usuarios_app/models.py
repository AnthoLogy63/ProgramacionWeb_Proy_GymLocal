from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    membership_active = models.BooleanField(default=True)
    avatar = models.ImageField(default='userDefect.png', upload_to='users/', null=True, blank=True)