from django.db import models
from django.contrib.auth.models import AbstractUser

class Users(AbstractUser):
    membership_active = models.BooleanField(default=True)
    avatar = models.ImageField(upload_to='media/', null=True, blank=True)