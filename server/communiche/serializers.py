from rest_framework import serializers
from .models import Template, User, Community

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'username', 'email', 'dob', 'country', 'phone', 'short_bio']

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'fields']

class CommunitySerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True, read_only=True)

    class Meta:
        model = Community
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'is_public', 'reputation_rating', 'templates', 'members']
        ordering = ['-created_at']

class DataTypeSerializer(serializers.Serializer):
    data_types = serializers.SerializerMethodField()

    class Meta:
        fields = ['data_types']

    def get_data_types(self, obj):
        return [data_type for data_type in constants.DATA_TYPES]