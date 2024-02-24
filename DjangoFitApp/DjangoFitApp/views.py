from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import UserProfile


@csrf_exempt
@api_view(['POST'])
def create_user(request):
    try:
        # Extract data from request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        # Does the email already exist
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email is already in use'}, status=status.HTTP_400_BAD_REQUEST)

        # Create user
        new_user = User.objects.create_user(
            username=username, email=email, password=password)

        # Return success response
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        # Return error response
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@login_required
def set_goals(request):
    try:
        user = request.user
        # Extract data from request
        weight_goal = request.data.get('weight')
        benchpress_goal = request.data.get('benchpress')
        squat_goal = request.data.get('squat')
        deadlift_goal = request.data.get('deadlift')

        # Update user profile with goals
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        user_profile.weight_goal = weight_goal
        user_profile.benchpress_goal = benchpress_goal
        user_profile.squat_goal = squat_goal
        user_profile.deadlift_goal = deadlift_goal
        user_profile.save()

        # Return success response
        return Response({'message': 'Goals set successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        # Return error response
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
