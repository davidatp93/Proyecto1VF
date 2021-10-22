var imagenes=new Array(
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/Instrucciones/Instrucciones generales.png`
    );

onload=function()
{
    mostrarImagen();
}

function mostrarImagen()
{
    document.getElementById("imagen").src=imagenes[0];
}





