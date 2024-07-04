from rest_framework import viewsets
from .models import DatosFisicos, Rutina, Coach
from .serializers import DatosFisicosSerializer, RutinaSerializer, CoachSerializer

class DatosFisicosViewSet(viewsets.ModelViewSet):
    queryset = DatosFisicos.objects.all()
    serializer_class = DatosFisicosSerializer

class RutinaViewSet(viewsets.ModelViewSet):
    queryset = Rutina.objects.all()
    serializer_class = RutinaSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer
