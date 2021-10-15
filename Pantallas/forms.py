from django import forms
from django.forms import fields
from .models import ensayos

class ensayoForm(forms.ModelForm):
    class Meta:
        model = ensayos
        fields=['clave','grupo','num_ensayo','tipo_ensayo','subtipo_ensayo','t_acumulado_RC','t_RC','t_acumulado_PR','t_PR','correcta','intentos']
    def __init__(self, ´*args, **kwargs):
    	super().__init__(*args,**kwargs)

    	