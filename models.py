from django.db import models


class FitnessActivity(models.Model):
    user_id = models.IntegerField()
    activity_type = models.CharField()
    duration = models.FloatField()
    intensity = models.CharField()
    distance = models.FloatField()
    date = models.DateField()
