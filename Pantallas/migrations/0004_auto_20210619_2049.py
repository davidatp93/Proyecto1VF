# Generated by Django 3.2.2 on 2021-06-20 01:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pantallas', '0003_auto_20210612_2158'),
    ]

    operations = [
        migrations.CreateModel(
            name='mannekenTest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sentimiento', models.IntegerField()),
                ('activ_fisiol', models.IntegerField()),
                ('control', models.IntegerField()),
            ],
        ),
        migrations.DeleteModel(
            name='auxiliares',
        ),
    ]
