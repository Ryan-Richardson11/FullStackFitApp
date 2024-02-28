from rest_framework.response import Response
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from .models import UserProfile, User
from django.contrib.auth import authenticate

"""
API endpoint for creating a new user in the database.
Checks if the user is already in the database
Else creates one and returns successful response
"""


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def create_user(request):
    try:
        # Extract data from request
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        print(
            f"Received data - Username: {username}, Email: {email}, Password: {password}")

        # Does the email already exist
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email is already in use'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the user in the database
        new_user = User.objects.create_user(
            username=username, email=email, password=password)

        # Return success response
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        # Return error response
        return Response({'error': str(e), 'received_data': request.data}, status=status.HTTP_400_BAD_REQUEST)


"""
API endpoint for User login.
Checks if the user with the provided username exists in the database.
If they are, enables access to user data/updating data.
"""


@csrf_exempt
@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def user_login(request):
    print('Request Data:', request.data)
    try:
        # Extract data from request
        username = request.data.get('username')
        password = request.data.get('password')

        # Check if the user exists
        user = authenticate(username=username, password=password)
        if user is not None:
            # User credentials are correct, generate a token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


"""
API endpoint for updating user goals in the database.
Updates goals based on form submission.
User should already be logged into their accounts.
"""


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


"""
API endpoint for returning the user goals to the client.
Updates goals based on form submission.
User should already be logged into their accounts.
"""


@api_view(['GET'])
@login_required
def get_goals(request):
    try:
        print('Received Token:', request.META.get('HTTP_AUTHORIZATION'))

        user = request.user
        user_profile = UserProfile.objects.get(user=user)

        # Retrieve goals from user_profile
        goals = {
            'weight': user_profile.weight_goal,
            'benchpress': user_profile.benchpress_goal,
            'squat': user_profile.squat_goal,
            'deadlift': user_profile.deadlift_goal
        }

        return Response(goals, status=status.HTTP_200_OK)
    except UserProfile.DoesNotExist:
        return Response({'error': 'User profile does not exist'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print('Exception:', e)
        print('Request:', request)
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
