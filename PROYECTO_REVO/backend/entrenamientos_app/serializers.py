from rest_framework import serializers
from .models import Entrenamiento

class EntrenamientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entrenamiento
        fields = '__all__'