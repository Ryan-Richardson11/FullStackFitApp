# Generated by Django 4.1.13 on 2024-03-06 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DjangoFitApp', '0016_alter_userprofile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(blank=True, default='/default.png', upload_to='profile_pictures/'),
        ),
    ]
