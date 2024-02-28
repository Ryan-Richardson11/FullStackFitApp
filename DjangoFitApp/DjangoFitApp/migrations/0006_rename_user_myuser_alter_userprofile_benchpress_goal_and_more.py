# Generated by Django 4.1.13 on 2024-02-28 01:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DjangoFitApp', '0005_rename_myuser_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='MyUser',
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='benchpress_goal',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='deadlift_goal',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='squat_goal',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='weight_goal',
            field=models.FloatField(blank=True, null=True),
        ),
    ]