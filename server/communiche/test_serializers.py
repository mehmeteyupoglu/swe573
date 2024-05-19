import pytest
from django.test import TestCase
from .serializers import CommunityUserSerializer, UserSerializer
from .models import CommunityUser, User

class TestUserSerializer(TestCase):
    def setUp(self):
        self.user_attributes = {
            'firstname': 'Test',
            'lastname': 'User',
            'username': 'testuser',
            'email': 'testuser@test.com',
            'dob': '2000-01-01',
            'country': 'Test Country',
            'phone': '1234567890',
            'short_bio': 'This is a test user',
            'password': 'testpassword123'
        }

        self.user = User.objects.create(**self.user_attributes)
        self.serializer = UserSerializer(instance=self.user)

    def test_contains_expected_fields(self):
        data = self.serializer.data
        self.assertEqual(set(data.keys()), set(['id', 'firstname', 'lastname', 'username', 'email', 'dob', 'country', 'phone', 'short_bio']))

    def test_field_content(self):
        data = self.serializer.data
        self.assertEqual(data['firstname'], self.user_attributes['firstname'])
        self.assertEqual(data['lastname'], self.user_attributes['lastname'])
        self.assertEqual(data['username'], self.user_attributes['username'])
        self.assertEqual(data['email'], self.user_attributes['email'])
        self.assertEqual(data['dob'], self.user_attributes['dob'])
        self.assertEqual(data['country'], self.user_attributes['country'])
        self.assertEqual(data['phone'], self.user_attributes['phone'])
        self.assertEqual(data['short_bio'], self.user_attributes['short_bio'])

    def test_invalid_firstname(self):
        self.user_attributes['firstname'] = ''  # empty string is invalid
        serializer = UserSerializer(data=self.user_attributes)
        self.assertFalse(serializer.is_valid())
        self.assertIn('firstname', serializer.errors)

    def test_invalid_dob(self):
        self.user_attributes['dob'] = '2000-13-01'  # not a valid date
        serializer = UserSerializer(data=self.user_attributes)
        self.assertFalse(serializer.is_valid())
        self.assertIn('dob', serializer.errors)