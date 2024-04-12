from django.db import models
from django.db.models import JSONField
from django.contrib.auth.hashers import check_password

from .constants import DATA_TYPES

# JSON representation of User model
"""
{
    "firstname": "string",  # Required
    "lastname": "string",  # Required
    "username": "string",  # Required
    "password": "string",  # Required
    "email": "string",
    "dob": "string",
    "country": "string",
    "phone": "string",
    "short_bio": "string"
}
"""

class User(models.Model):
    firstname = models.CharField(max_length=200)  # Required
    lastname = models.CharField(max_length=200)  # Required
    username = models.CharField(max_length=50)  # Required
    password = models.CharField(max_length=128)  # Required
    email = models.CharField(max_length=200, null=True)
    dob = models.DateTimeField(null=True)
    country = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=20, null=True)
    short_bio = models.CharField(max_length=600, null=True)

    def check_password(self, raw_password):
            """
            Checks if the provided raw password matches the hashed password stored in the model.

            Args:
                raw_password (str): The raw password to be checked.

            Returns:
                bool: True if the raw password matches the hashed password, False otherwise.
            """
            return check_password(raw_password, self.password)

class Community(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False, null=True)
    reputation_rating = models.DecimalField(max_digits=10, decimal_places=1, default=0, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner', null=True)

class Template(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=600)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    fields = JSONField(default=list)

class CommunityTemplates(models.Model):
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='community')
    template = models.ForeignKey(Template, on_delete=models.CASCADE, related_name='template')