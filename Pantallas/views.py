from django.shortcuts import render
from .forms import ensayoForm
from django.http import JsonResponse
from django.views.generic import CreateView
from .models import ensayos

class ensayoCreateView(CreateView):
   model= ensayos
   fields= ('__all__')
   succes_url='.'

   def get_context_data(self, **kwargs):
       context= super().get_context_data(**kwargs)
       context

       return super().get_context_data(**kwargs)

