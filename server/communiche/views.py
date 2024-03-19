from django.http import JsonResponse
from .models import User
from .serializers import UserSerializer

def user_list(request):
    # get all the users
    # serialize them
    # return json

    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)