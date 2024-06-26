from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

def home(request):
    return render(request, 'core/home.html')

@login_required 
def entrenamientos(request):
    return render(request, 'core/entrenamientos.html')

def exit(request):
    logout(request)
    return redirect('home')