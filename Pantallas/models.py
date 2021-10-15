from django.db import models
from django.contrib.auth.models import User

class mannekenTest(models.Model):
	clave=models.CharField(null=True, max_length=10)
	sentimiento=models.IntegerField()
	activ_fisiol=models.IntegerField()
	control=models.IntegerField()

	def _str_(self):
		return self.clave

class ensayos(models.Model):
	clave=models.CharField(max_length=10)
	grupo=models.CharField(max_length=10)
	num_ensayo=models.IntegerField()
	tipo_ensayo=models.CharField(max_length=10)
	subtipo_ensayo=models.CharField(max_length=10)
	t_acumulado_RC=models.CharField(max_length=5) #Tiempo acum de resp correcta
	t_RC=models.CharField(max_length=5) #Tiempo de respuesta correcta
	t_acumulado_PR=models.CharField(max_length=5) #Tiempo acum de primer respuesta
	t_PR=models.CharField(max_length=5) #Tiempo de primer respuesta
	correcta=models.IntegerField() #Resp correcta=1, incorrecta=0
	intentos=models.IntegerField() #Total de intentos

	def _str_(self):
		return self.clave

class anagramas(models.Model):
	clave=models.CharField(max_length=30)
	intentos=models.IntegerField()
	tiempo_resp=models.CharField(max_length=5)
	resultado=models.IntegerField()
	alzadas=models.IntegerField(null=True)
	def _str_(self):
		return self.clave