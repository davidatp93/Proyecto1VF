var imagenes=new Array(
    '/static/img/Instrucciones/Instrucciones P+C-.png',
    '/static/img/Instrucciones/Instrucciones P+C+.png',
    '/static/img/Instrucciones/Instrucciones P+CI.png',
    '/static/img/Instrucciones/Instrucciones P-C-.png',
    '/static/img/Instrucciones/Instrucciones P-C+.png',
    '/static/img/Instrucciones/Instrucciones P-CI.png',
    );

onload=function()
{
    mostrarImagen();
}

function mostrarImagen()
{
    grupo=sessionStorage.getItem("GRUPO");

    if (grupo=='P+C-')
         document.getElementById("imagen").src=imagenes[0];
    if (grupo=='P+C+')
         document.getElementById("imagen").src=imagenes[1];
    if (grupo=='P+CI')
         document.getElementById("imagen").src=imagenes[2];
    if (grupo=='P-C-')
         document.getElementById("imagen").src=imagenes[3];
    if (grupo=='P-C+')
         document.getElementById("imagen").src=imagenes[4];
    if (grupo=='P-CI')
         document.getElementById("imagen").src=imagenes[5];
}