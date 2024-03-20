from django.db import models

class User(models.Model):
    firstname = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
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
    isPublic = models.BooleanField(default=False, null=True)
    reputationRating = models.DecimalField(max_digits=10, decimal_places=1, default=0, null=True)
