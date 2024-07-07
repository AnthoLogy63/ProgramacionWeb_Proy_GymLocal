from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    membership_active = models.BooleanField(default=True)
    avatar = models.ImageField(default='userDefect.png', upload_to='users/', blank=True)

    def save(self, *args, **kwargs):
        if not self.avatar:
            self.avatar = 'userDefect.png'
        super().save(*args, **kwargs)