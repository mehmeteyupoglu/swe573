from rest_framework import serializers
from .models import Template, User, Community, JoinRequest

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
    is_member = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'is_public', 'reputation_rating', 'templates', 'members', 'is_member']

    def get_is_member(self, obj):
        user_id = self.context.get('request').query_params.get('user_id') if self.context.get('request') else None
        return obj.members.filter(id=user_id).exists()

class DataTypeSerializer(serializers.Serializer):
    data_types = serializers.SerializerMethodField()

    class Meta:
        fields = ['data_types']

    def get_data_types(self, obj):
        return [data_type for data_type in constants.DATA_TYPES]

class JoinRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = JoinRequest
        fields = ['community', 'user', 'joined_at']