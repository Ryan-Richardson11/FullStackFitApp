# Generated by Django 4.1.13 on 2024-03-05 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DjangoFitApp', '0010_alter_userprofile_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='picture',
            field=models.ImageField(blank=True, default='profile_pictures/FullStackAppDefaultProfilePicture.jpg', upload_to='profile_pictures/'),
        ),
    ]
