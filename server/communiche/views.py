from django.http import JsonResponse
from .models import Template, User
from .serializers import TemplateSerializer, UserSerializer, CommunitySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
import jwt
from datetime import datetime, timedelta
from .models import Community
from django.http import JsonResponse
from . import constants

@api_view(['GET', 'POST'])
def user_list(request):
    # get all the users
    # serialize them
    # return json

    if request.method == 'GET':
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def user_detail(request, id):
    try:
        user = User.objects.get(pk=id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    

    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        user.delete()
        return Response('No content', status=status.HTTP_204_NO_CONTENT)
    
@api_view(['POST'])
def signup(request):
    data = request.data.copy()
    username = data.get('username')
    email = data.get('email')
    
    # Check if username or email is already registered
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already registered'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
    
    data['password'] = make_password(data['password'])
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        # Exclude the password field from the serialized data
        serialized_data = serializer.data.copy()
        serialized_data.pop('password', None)
        return Response(serialized_data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    data = request.data.copy()
    username = data.get('username')
    password = data.get('password')
    
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'Invalid username'}, status=status.HTTP_400_BAD_REQUEST)
    
    if not user.check_password(password):
        return Response({'error': 'Invalid password'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = UserSerializer(user)
    # Exclude the password field from the serialized data
    serialized_data = serializer.data.copy()
    serialized_data.pop('password', None)
    
    # Generate JWT token
    token = jwt.encode({'user_id': user.id, 'exp': datetime.utcnow() + timedelta(hours=1)}, 'secret_key')
    
    return Response({'token': token, 'user': serialized_data}, status=status.HTTP_200_OK)

@api_view(['GET'])
def communities(request):
    if request.method == 'GET':
        communities = Community.objects.all().order_by('-updated_at')
        serializer = CommunitySerializer(communities, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def add_community(request):
    print(request.data)
    if request.method == 'POST':
        serializer = CommunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def community_detail(request, id):
    try:
        community = Community.objects.get(pk=id)
    except Community.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommunitySerializer(community)
        community_data = serializer.data
        community_data['num_members'] = community.members.count()
        community_data.pop('members', None)  # Remove the 'members' field
        return Response(community_data)
    

    elif request.method == 'PUT':
        serializer = CommunitySerializer(community, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'POST':
        serializer = CommunitySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        community.delete()
        return Response('Delete successfull', status=status.HTTP_204_NO_CONTENT)
    
@api_view(['GET'])
def templates(request):
    if request.method == 'GET':
        templates = Template.objects.all()
        serializer = TemplateSerializer(templates, many=True)
        return Response(serializer.data)

@api_view(['POST'])
def add_template(request):
    if request.method == 'POST':
        serializer = TemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def default_template(request):
    if request.method == 'GET':
        default_template = Template.objects.filter(name='Default Template').first()
        if default_template:
            serializer = TemplateSerializer(default_template)
            return Response(serializer.data)
        else:
            return Response({"detail": "Default template not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def template_detail(request, id):
    try:
        template = Template.objects.get(pk=id)
    except Template.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TemplateSerializer(template)
        return Response(serializer.data)
    

    elif request.method == 'PUT':
        serializer = TemplateSerializer(template, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'POST':
        serializer = TemplateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        template.delete()

@api_view(['GET'])
def data_types(request):
    data_types = constants.DATA_TYPES
    return JsonResponse([data_type[1] for data_type in data_types], safe=False)

@api_view(['POST'])
def join_community(request, community_id, user_id):
    try:
        community = Community.objects.get(pk=community_id)
        user = User.objects.get(pk=user_id)
    except (Community.DoesNotExist, User.DoesNotExist):
        return Response(status=status.HTTP_404_NOT_FOUND)

    community.members.add(user)
    community.updated_at = datetime.now()  # Update the updated_at attribute
    community.save()  # Save the updated community
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def is_user_in_community(request, community_id, user_id):
    try:
        user = User.objects.get(id=user_id)
        community = Community.objects.get(id=community_id)

        if user in community.members.all():
            return JsonResponse({'is_member': True})
        else:
            return JsonResponse({'is_member': False})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
    except Community.DoesNotExist:
        return JsonResponse({'error': 'Community not found'}, status=404)