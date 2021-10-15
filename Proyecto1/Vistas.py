from django.http import HttpResponse
import datetime
import time
import json
from django.template import Template, Context
from django.template import loader
from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.generic import CreateView
from Pantallas.models import ensayos, mannekenTest, anagramas
from django.views.decorators.csrf import csrf_exempt
from django.db import models
from pprint import pprint
#ejecutar Django 

global grupo_lista

def anagrama(request):
    return render(request, "anagramas.html")

def inicio_anagramas(request):
    return render(request,"index_anagramas.html")

def pruebas(request):
    return render(request, "pruebas.html")

def index(request):
    return render(request,"index.html")

def generales(request):
    return render(request, "generales.html")

def especificas(request):
    return render(request, "especificas.html")

def instruccion(request):
    return render(request,"instruccion.html")

def generales_PI(request):
    return render(request, "generales_P+C-.html")

def especificas_PI(request):
    return render(request, "especificas_P+C-.html")

def instruccion_PI(request):
    return render(request,"instruccion_PI.html")

def generales_IC(request):
    return render(request, "generales_P-C+.html")

def especificas_IC(request):
    return render(request, "especificas_P-C+.html")

def instruccion_IC(request):
    return render(request,"instruccion_IC.html")

def generales_II(request):
    return render(request, "generales_P-C-.html")

def especificas_II(request):
    return render(request, "especificas_P-C-.html")

def instruccion_II(request):
    return render(request,"instruccion_II.html")

def generales_PCI(request):
    return render(request, "generales_P+CI.html")

def especificas_PCI(request):
    return render(request, "especificas_P+CI.html")

def generales_ICI(request):
    return render(request, "generales_P-CI.html")

def especificas_ICI(request):
    return render(request, "especificas_P-CI.html")


def senal(request):
    return render(request, "senal.html")

def registro(request):
    return render(request,"registro.html")

def pantalla_negra(request):
    return render(request,"Pantalla_negra_intermedia.html")

def manneken(request):
    return render(request,"manneken.html")

def pan_neg_5s(request):
    return render(request,"PN5s.html")

def contador_321(request):
    return render(request,"cont321.html")

def lista_desplegable(request):
    datos=ensayos.objects.filter(grupo=grupo_lista)
    lista=[]    
    for i in datos:
        if i.clave in lista:
            pass
        else:
            lista.append(i.clave)
    data=json.dumps(lista)
    return HttpResponse(data,"application/json")

@csrf_exempt
def guarda_grupo(request):
    global grupo_lista
    datos=json.loads(request.body)
    if datos['grupo'] == 'P+C-' or datos['grupo'] == 'P+CI':
        grupo_lista='P+C+'
    elif datos['grupo'] == 'P-C-' or datos['grupo'] == 'P-CI':
        grupo_lista='P-C+'
    return HttpResponse("Los datos se guardaron correctamente")

@csrf_exempt
def guardarDatos(request):
    datos=json.loads(request.body)
    suj1=ensayos()
    suj1.clave=datos['clave']
    suj1.grupo=datos['grupo']
    suj1.num_ensayo=datos['num_ensayo']
    suj1.tipo_ensayo=datos['tipo_ensayo']
    suj1.subtipo_ensayo=datos['subtipo_ensayo']
    #t_acumulado_RC=datos['t_acumulado_RC']
    suj1.t_RC=datos['t_RC']
    #t_acumulado_PR=datos['']
    suj1.t_PR=datos['t_PR']
    suj1.correcta=datos['correcta']
    suj1.intentos=datos['intentos']

    #pprint(vars(suj1))
    suj1.save()
    return HttpResponse("Los datos se guardaron correctamente")

@csrf_exempt
def guardarManneken(request):
    datos=json.loads(request.body)
    mann=mannekenTest()
    mann.clave=datos['clave']
    mann.sentimiento=datos['s']
    mann.activ_fisiol=datos['a']
    mann.control=datos['c']
    pprint(vars(mann))
    mann.save()
    return HttpResponse("Los datos se guardaron correctamente")

@csrf_exempt
def consultar_asociado(request):
    r=json.loads(request.body)
    datos=ensayos.objects.filter(clave=r['clave'])
    lista=[]
    for i in datos:
        tarea={'id':i.id,'TRC':i.t_RC}
        lista.append(tarea)
    data=json.dumps(lista)
    return HttpResponse(data,"application/json")

@csrf_exempt
def guardarAnagrama(request):
    datos=json.loads(request.body)
    a=anagramas()
    a.clave=datos['clave']
    a.intentos=datos['n_intentos']
    a.tiempo_resp=datos['tiempo_resp']
    a.resultado=datos['resultado']
    a.alzadas=datos['alzadas']

    a.save()
    return HttpResponse("Los datos se gurdaron correctamente")

