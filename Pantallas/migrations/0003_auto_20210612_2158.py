# Generated by Django 3.2.2 on 2021-06-13 02:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Pantallas', '0002_ensayos'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ensayos',
            name='t_PR',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='ensayos',
            name='t_RC',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='ensayos',
            name='t_acumulado_PR',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='ensayos',
            name='t_acumulado_RC',
            field=models.CharField(max_length=5),
        ),
    ]
