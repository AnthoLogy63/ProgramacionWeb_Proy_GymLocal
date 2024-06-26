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
            user = authenticate(username=username, password=password)
            login(request, user)
            return redirect('home')  # Redirect to a homepage or any other page
    else:
        form = RegisterForm()
    return render(request, 'registration/register.html', {'form': form})