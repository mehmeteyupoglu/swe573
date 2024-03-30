from rest_framework import serializers
from .models import User, Community

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'username', 'email', 'dob', 'country', 'phone', 'short_bio']

class CommunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Community
        fields = '__all__'