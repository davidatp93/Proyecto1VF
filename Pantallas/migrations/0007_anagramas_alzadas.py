# Generated by Django 3.2.2 on 2021-10-08 22:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pantallas', '0006_anagramas'),
    ]

    operations = [
        migrations.AddField(
            model_name='anagramas',
            name='alzadas',
            field=models.IntegerField(null=True),
        ),
    ]