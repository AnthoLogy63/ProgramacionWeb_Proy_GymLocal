from rest_framework import serializers
from .models import DatosFisicos, Rutina, Coach

class DatosFisicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatosFisicos
        fields = '__all__'

class RutinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rutina
        fields = '__all__'

class CoachSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coach
        fields = '__all__'
