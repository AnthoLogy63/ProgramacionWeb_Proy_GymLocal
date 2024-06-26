from django.db import models
from usuarios_app.models import Usuario

# Create your models here.
class DatosFisicos(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    edad = models.IntegerField()
    peso = models.FloatField()
    talla = models.FloatField()
    imc = models.FloatField()
    masa_muscular = models.FloatField()
    recomendaciones = models.TextField()

class Rutina(models.Model):
    nombre_ejercicio = models.CharField(max_length=255)
    numero_repeticiones = models.IntegerField()
    dia = models.IntegerField()
    musculo_ejercitar = models.CharField(max_length=255)

class Coach(models.Model):
    nombre = models.CharField(max_length=255)
    rutina = models.OneToOneField(Rutina, on_delete=models.CASCADE)
    usuarios = models.ManyToManyField(Usuario, related_name='coaches')