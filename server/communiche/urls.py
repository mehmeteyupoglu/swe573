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

    # community
    path('communities/', views.communities, name='communities'),
    path('community/<int:id>/', views.community_detail, name='community-detail'),
    path('add_community/', views.add_community, name='add_community'),
    path('templates/', views.templates, name='templates'),
    path('template/<int:id>/', views.template_detail, name='template-detail'),
    path('add_template/', views.add_template, name='add_template'),
    path('default_template/', views.default_template, name='default_template'),
    path('data_types/', views.data_types, name='data_types'),
    path('join_community/<int:community_id>/<int:user_id>/', views.join_community, name='join_community'),
    path('leave_community/<int:community_id>/<int:user_id>/', views.leave_community, name='leave_community'),
    path('is_user_in_community/<int:community_id>/<int:user_id>/', views.is_user_in_community),
    path('community/<int:community_id>/role/', views.user_role, name='user-role'),
    path('change_user_role/<int:community_id>/<int:user_id>/', views.change_user_role, name='change_user_role'),
    path('community/<int:community_id>/members', views.community_members, name='community-members'),
    path('logout/', views.logout, name='logout'),
    path('community/<int:community_id>/join_requests/', views.join_requests, name='join_requests'),
    path('community/<int:request_id>/accept_reject_join_request/', views.accept_reject_join_request, name='accept_join_request'),
    path('community/<int:community_id>/templates/', views.community_templates, name='community-templates'),
    path('post/', views.post, name='post'),
]
