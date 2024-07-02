from django.contrib import admin
from .models import Rutina, Coach, DatosFisicos

# Register your models here.

admin.site.register(Rutina)
admin.site.register(Coach)
admin.site.register(DatosFisicos)