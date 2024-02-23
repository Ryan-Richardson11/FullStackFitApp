from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import User
import json


@ensure_csrf_cookie
def create_user(request):
    if request.method == 'POST':
        # Use request.POST to get form data
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')

        # Hide password
        hashed_password = make_password(password)

        # Create a new user in the database
        new_user = User.objects.create(
            username=username, email=email, password=hashed_password)

        return JsonResponse({'message': 'User created successfully'})
    else:
        return JsonResponse({'error': 'Invalid request method'})
