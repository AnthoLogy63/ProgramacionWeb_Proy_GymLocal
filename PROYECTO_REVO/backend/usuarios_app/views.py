from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout, login, authenticate
from .forms import RegisterForm

def home(request):
    return render(request, 'core/home.html')

@login_required 
def entrenamientos(request):
    return render(request, 'core/entrenamientos.html')

def exit(request):
    logout(request)
    return redirect('home') 

def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            first_name = form.cleaned_data.get('first_name')
            last_name = form.cleaned_data.get('last_name')
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')  
    else:
        form = RegisterForm()
    return render(request, 'registration/register.html', {'form': form})