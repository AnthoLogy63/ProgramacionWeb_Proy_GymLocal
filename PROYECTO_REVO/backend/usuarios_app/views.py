from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.decorators import login_required
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer
from entrenamientos_app.models import Rutina, Coach, DatosFisicos

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Sesión cerrada exitosamente'}, status=status.HTTP_200_OK)

@csrf_exempt
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'Inicio de sesión exitoso'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_400_BAD_REQUEST)
    
class UserCreate(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()

            # Crear datos físicos por defecto para el nuevo usuario
            DatosFisicos.objects.create(
                usuario=user,
                edad=20,  
                peso=70.5,
                talla=1.70,
                imc=10.3,
                masa_muscular=75.6,
                recomendaciones="Comer de forma más balanceada"
            )

            # Crear rutinas base y asignarlas al coach base
            coach_base, created = Coach.objects.get_or_create(nombre="Bryan")

            rutinas_base = [
                {"nombre_ejercicio": "PushUp", "numero_repeticiones": 10, "dia": 1, "musculo_ejercitar": "Pecho", "coach": coach_base},
                {"nombre_ejercicio": "Peso Muerto", "numero_repeticiones": 12, "dia": 2, "musculo_ejercitar": "Espalda", "coach": coach_base},
                {"nombre_ejercicio": "Sentadilla búlgara", "numero_repeticiones": 15, "dia": 3, "musculo_ejercitar": "Piernas", "coach": coach_base},
                {"nombre_ejercicio": "Flexiones de pared", "numero_repeticiones": 8, "dia": 4, "musculo_ejercitar": "Brazos", "coach": coach_base},
                {"nombre_ejercicio": "Press Militar", "numero_repeticiones": 20, "dia": 5, "musculo_ejercitar": "Hombros", "coach": coach_base},
            ]

            for rutina_data in rutinas_base:
                Rutina.objects.create(**rutina_data)

            # Asignar coach base al usuario
            coach_base.usuarios.add(user)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@login_required
def getDataUser(request):
    user = request.user
    data = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'membership_active': user.membership_active,
        'avatar': request.build_absolute_uri(user.avatar.url) if user.avatar else None
    }
    return JsonResponse(data)

@login_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    if request.method == 'POST':
        data = request.data
        user = request.user
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.username = data.get('username', user.username)
        user.save()
        return Response({'message': 'Perfil actualizado con éxito'}, status=status.HTTP_200_OK)
    return Response({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@login_required
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateAvatar(request):
    user = request.user
    if 'avatar' in request.FILES:
        user.avatar = request.FILES['avatar']
        user.save()
        return Response({'message': 'Avatar updated successfully'})
    return Response({'error': 'No avatar found in request'}, status=status.HTTP_400_BAD_REQUEST)
