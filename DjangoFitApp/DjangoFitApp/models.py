from django.db import models


class User(models.Model):
    # Basic user creating data to enter in the database
    username = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

# Fields for setting user goals in the database (weight, squat, bench, deadlift)


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
