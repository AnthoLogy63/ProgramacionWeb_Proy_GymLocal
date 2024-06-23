from django.db import models
import datetime 

class Usuario(models.Model):
    nombreDeUsuario = models.CharField(max_length=100)
    nombreYApellidos = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)
    fotoPerfil = models.ImageField(upload_to='fotos_usuarios/', blank=True, null=True)

class UsuarioDatosMembresia(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    membresia = models.BooleanField(default=False)
    fecha = models.DateField(default=datetime.date.today)