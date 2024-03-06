"""DjangoFitApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
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
from django.views.generic import TemplateView
from .views import create_user, set_goals, get_goals, user_login, get_all_users, log_exercise, track_progress, display_profile, set_picture
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/create_user/', create_user, name='create_user'),
    path('api/set_goals/', set_goals, name='set_goals'),
    path('api/get_goals/', get_goals, name='get_goals'),
    path('api/user_login/', user_login, name='user_login'),
    path('api/get_all_users/', get_all_users, name='get_all_users'),
    path('api/log_exercise/', log_exercise, name='log_exercise'),
    path('api/track_progress/', track_progress, name='track_progress'),
    path('api/display_profile/', display_profile, name='display_profile'),
    path('api/set_picture/', set_picture, name='set_picture'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
