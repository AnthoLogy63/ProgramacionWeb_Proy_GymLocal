# Generated by Django 5.0.6 on 2024-07-07 19:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='avatar',
            field=models.ImageField(default='userDefect.png', upload_to='users/'),
        ),
    ]
