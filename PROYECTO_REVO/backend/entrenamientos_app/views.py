from django.shortcuts import render
from rest_framework import viewsets
from .models import Entrenamiento
from .serializers import EntrenamientoSerializer

# Create your views here.

class EntrenamientoViewSet(viewsets.ModelViewSet):
    queryset = Entrenamiento.objects.all()
    serializer_class = EntrenamientoSerializer