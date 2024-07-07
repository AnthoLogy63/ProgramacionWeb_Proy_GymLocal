from rest_framework import viewsets
from .models import DatosFisicos, Rutina, Coach
from .serializers import DatosFisicosSerializer, RutinaSerializer, CoachSerializer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from usuarios_app.models import User
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.core.mail import EmailMessage
from io import BytesIO

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

def render_to_pdf(template_src, context_dict):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = HttpResponse(content_type='application/pdf')
    pisa_status = pisa.CreatePDF(html, dest=result)
    if pisa_status.err:
        return HttpResponse('We had some errors <pre>' + html + '</pre>')
    return result

@login_required
def download_training_pdf(request):
    user = request.user
    datos_fisicos = DatosFisicos.objects.filter(usuario=user).first()
    rutinas = Rutina.objects.filter(coach__usuarios=user)
    coaches = Coach.objects.filter(usuarios=user)

    context = {
        'datos_fisicos': datos_fisicos,
        'rutinas': rutinas,
        'coaches': coaches,
        'user': user
    }

    return render_to_pdf('training_pdf_template.html', context)

def render_to_pdf_(template_src, context_dict):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pisa_status = pisa.CreatePDF(html.encode('utf-8'), dest=result, encoding='utf-8')
    if pisa_status.err:
        return None
    return result.getvalue()

@login_required
def send_training_pdf(request):
    user = request.user
    datos_fisicos = DatosFisicos.objects.filter(usuario=user).first()
    rutinas = Rutina.objects.filter(coach__usuarios=user)
    coaches = Coach.objects.filter(usuarios=user)

    context = {
        'datos_fisicos': datos_fisicos,
        'rutinas': rutinas,
        'coaches': coaches,
        'user': user
    }

    pdf = render_to_pdf_('training_pdf_template.html', context)
    if pdf:
        try:
            email = EmailMessage(
                'Your Training PDF',
                'Please find attached your training PDF.',
                'gymrevo94@gmail.com',
                [user.email],
            )
            email.attach('training.pdf', pdf, 'application/pdf')
            email.send()
            return JsonResponse({'message': 'Email sent successfully'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({'error': 'Failed to generate PDF'}, status=500)
