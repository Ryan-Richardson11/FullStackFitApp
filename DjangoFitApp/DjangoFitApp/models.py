from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weight_goal = models.FloatField(null=True, blank=True)
    benchpress_goal = models.FloatField(null=True, blank=True)
    squat_goal = models.FloatField(null=True, blank=True)
    deadlift_goal = models.FloatField(null=True, blank=True)

    def set_goals(self, **kwargs):
        for goal_type, value in kwargs.items():
            setattr(self, f"{goal_type}_goal", value)
        self.save()
