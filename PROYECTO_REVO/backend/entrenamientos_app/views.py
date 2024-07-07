from rest_framework import viewsets
from .models import DatosFisicos, Rutina, Coach
from .serializers import DatosFisicosSerializer, RutinaSerializer, CoachSerializer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view
from usuarios_app.models import User

class DatosFisicosViewSet(viewsets.ModelViewSet):
    queryset = DatosFisicos.objects.all()
    serializer_class = DatosFisicosSerializer

class RutinaViewSet(viewsets.ModelViewSet):
    queryset = Rutina.objects.all()
    serializer_class = RutinaSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

@api_view(['GET'])
def get_datos_fisicos(request, user_id):
    user = User.objects.get(id=user_id)
    datos_fisicos = DatosFisicos.objects.filter(usuario=user)
    serializer = DatosFisicosSerializer(datos_fisicos, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_rutinas(request, user_id):
    user = User.objects.get(id=user_id)
    rutinas = Rutina.objects.filter(coach__usuarios=user)
    serializer = RutinaSerializer(rutinas, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def get_coaches(request, user_id):
    user = User.objects.get(id=user_id)
    coaches = Coach.objects.filter(usuarios=user)
    serializer = CoachSerializer(coaches, many=True)
    return JsonResponse(serializer.data, safe=False)

@login_required
def get_user_id(request):
    user = request.user
    data = {
        'user_id': user.id
    }
    return JsonResponse(data)
