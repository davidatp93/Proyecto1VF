# Generated by Django 3.2.2 on 2021-10-05 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pantallas', '0005_mannekentest_clave'),
    ]

    operations = [
        migrations.CreateModel(
            name='anagramas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clave', models.CharField(max_length=30)),
                ('intentos', models.IntegerField()),
                ('tiempo_resp', models.CharField(max_length=5)),
                ('resultado', models.IntegerField()),
            ],
        ),
    ]
