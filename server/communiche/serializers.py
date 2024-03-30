from rest_framework import serializers
from .models import User, Community

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'username', 'password', 'email', 'dob', 'country', 'phone', 'short_bio']
