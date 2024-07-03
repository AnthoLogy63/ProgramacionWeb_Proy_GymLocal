from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DatosFisicosViewSet, RutinaViewSet, CoachViewSet

router = DefaultRouter()
router.register(r'datos_fisicos', DatosFisicosViewSet)
router.register(r'rutinas', RutinaViewSet)
router.register(r'coaches', CoachViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
