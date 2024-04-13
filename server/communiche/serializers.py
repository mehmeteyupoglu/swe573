from rest_framework import serializers
from .models import Template, User, Community, CommunityTemplates

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname', 'username', 'password', 'email', 'dob', 'country', 'phone', 'short_bio']

class TemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Template
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']

class CommunitySerializer(serializers.ModelSerializer):
    templates = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = ['id', 'name', 'description', 'created_at', 'updated_at', 'is_public', 'reputation_rating', 'templates']

    def get_templates(self, obj):
        community_templates = CommunityTemplates.objects.filter(community=obj)
        templates = [ct.template for ct in community_templates]
        return TemplateSerializer(templates, many=True).data