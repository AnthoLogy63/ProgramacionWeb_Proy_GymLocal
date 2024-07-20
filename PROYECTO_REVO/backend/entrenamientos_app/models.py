from django.db import models
from usuarios_app.models import User

class DatosFisicos(models.Model):
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)
    edad = models.IntegerField()
    peso = models.FloatField()
    talla = models.FloatField()
    imc = models.FloatField()
    masa_muscular = models.FloatField()
    recomendaciones = models.TextField()

class Coach(models.Model):
    nombre = models.CharField(max_length=255)
    usuarios = models.ManyToManyField(User, related_name='coaches')

class Rutina(models.Model):
    nombre_ejercicio = models.CharField(max_length=255)
    numero_repeticiones = models.IntegerField()
    dia = models.IntegerField()
    musculo_ejercitar = models.CharField(max_length=255)
    coach = models.ForeignKey(Coach, on_delete=models.CASCADE, related_name='rutinas')
