from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def say_hello(request):
    return HttpResponse('<html><body><h1>HELLO WORLD</h1></body></html>')