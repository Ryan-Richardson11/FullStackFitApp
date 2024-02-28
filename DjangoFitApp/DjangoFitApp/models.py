from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    # Users desired goals
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weight_goal = models.FloatField(null=True, blank=True)
    benchpress_goal = models.FloatField(null=True, blank=True)
    squat_goal = models.FloatField(null=True, blank=True)
    deadlift_goal = models.FloatField(null=True, blank=True)

    # Users current metrics
    weight_current = models.FloatField(null=True, blank=True)
    benchpress_current = models.FloatField(null=True, blank=True)
    squat_current = models.FloatField(null=True, blank=True)
    deadlift_current = models.FloatField(null=True, blank=True)

    # User progress towards goal
    weight_progress = models.FloatField(null=True, blank=True)
    benchpress_progress = models.FloatField(null=True, blank=True)
    squat_progress = models.FloatField(null=True, blank=True)
    deadlift_progress = models.FloatField(null=True, blank=True)

    def set_goals(self, **kwargs):
        for goal_type, value in kwargs.items():
            setattr(self, f"{goal_type}_goal", value)
        self.save()
