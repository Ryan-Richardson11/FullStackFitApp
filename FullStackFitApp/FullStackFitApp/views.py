# views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
import json

from .models import FitnessActivity


@method_decorator(csrf_exempt, name='dispatch')
class FitnessActivityView(View):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        FitnessActivity.objects.create(**data)
        return JsonResponse({'message': 'Activity created successfully'})

    def get(self, request, *args, **kwargs):
        activities = list(FitnessActivity.objects.values())
        return JsonResponse({'activities': activities})
