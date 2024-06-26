from django.db import models
from usuarios_app.models import Usuario

# Create your models here.
class Rutina(models.Model):
    nombre_ejercicio = models.CharField(max_length=255)
    numero_repeticiones = models.IntegerField()
    dia = models.IntegerField()
    musculo_ejercitar = models.CharField(max_length=255)

class Coach(models.Model):
    nombre = models.CharField(max_length=255)
    rutina = models.ForeignKey(Rutina, on_delete=models.CASCADE)
    usuarios = models.ManyToManyField(Usuario, related_name='coaches')