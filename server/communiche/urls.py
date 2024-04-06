"""
URL configuration for communiche project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from communiche import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', views.user_list),
    path('users/<int:id>/', views.user_detail, name='user-detail'),
    path('signup/', views.signup),
    path('login/', views.login),
    path('communities/', views.communities, name='communities'),
    path('community/<int:id>/', views.community_detail, name='community-detail'),
    path('add_community/', views.add_community, name='add_community'),
    path('templates/', views.templates, name='templates'),
    path('template/<int:id>/', views.template_detail, name='template-detail'),
    path('add_template/', views.add_template, name='add_template'),
]
