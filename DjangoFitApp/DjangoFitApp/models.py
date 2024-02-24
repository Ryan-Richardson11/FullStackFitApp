from django.db import models


class User(models.Model):
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    weight_goal = models.FloatField(null=True, blank=True)
    benchpress_goal = models.FloatField(null=True, blank=True)
    squat_goal = models.FloatField(null=True, blank=True)
    deadlift_goal = models.FloatField(null=True, blank=True)
