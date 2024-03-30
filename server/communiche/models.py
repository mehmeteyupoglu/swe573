from django.db import models

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
    password = models.CharField(max_length=50)  # Required
    email = models.CharField(max_length=200, null=True)
    dob = models.DateTimeField(null=True)
    country = models.CharField(max_length=200, null=True)
    phone = models.CharField(max_length=20, null=True)
    short_bio = models.CharField(max_length=600, null=True)

class Community(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=600)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    is_public = models.BooleanField(default=False, null=True)
    reputation_rating = models.DecimalField(max_digits=10, decimal_places=1, default=0, null=True)
