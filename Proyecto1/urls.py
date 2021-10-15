from django.contrib import admin
from django.urls import path
from Proyecto1.Vistas import generales, especificas, guardarDatos,senal,instruccion, index, registro, manneken, guardarManneken, pantalla_negra, generales_PI,especificas_PI,instruccion_PI, consultar_asociado, lista_desplegable,pan_neg_5s,contador_321,instruccion_IC,generales_IC, especificas_IC,guarda_grupo, generales_II, especificas_II, instruccion_II, generales_PCI, especificas_PCI, generales_ICI, especificas_ICI, anagrama, guardarAnagrama, inicio_anagramas
from . import Vistas
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('senal/',senal),
    path('ensayos/', guardarDatos),
    path('index/', index),
    path('registro/', registro),
    path('manneken/', manneken),
    path('saveManneken/', guardarManneken),
    path('saveAnagrama/', guardarAnagrama),
    path('pantalla_negra/',pantalla_negra),
    path('consultar_asociado/', consultar_asociado),
    path('lista_desplegable/', lista_desplegable),
    path('pan_neg_5s/',pan_neg_5s),
    path('guarda_grupo/', guarda_grupo),
    path('contador_321/',contador_321),
    path('generales/',generales),
    path('especificas/',especificas),
    path('instruccion/',instruccion),
    path('generales_PI/',generales_PI),
    path('especificas_PI/',especificas_PI),
    path('instruccion_PI/',instruccion_PI),
    path('generales_IC/', generales_IC),
    path('especificas_IC/', especificas_IC),
    path('instruccion_IC/',instruccion_IC),
    path('generales_II/',generales_II),
    path('especificas_II/',especificas_II),
    path('instruccion_II/',instruccion_II),
    path('generales_PCI/', generales_PCI),
    path('especificas_PCI/', especificas_PCI),
    path('generales_ICI/', generales_ICI),
    path('especificas_ICI/', especificas_ICI),
    path('anagramas/', anagrama),
    path('inicio_anagramas/', inicio_anagramas),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
