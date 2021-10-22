var imagenes=new Array(
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_NEG.png`);
var contador=0;

function rotarImagenes()
{
    // cambiamos la imagen y la url
    grupo=sessionStorage.getItem("GRUPO");
    contador++
    if (contador<=5)
        document.getElementById("imagen").src=imagenes[0];
    else
    {
        if (grupo=='P-C+')
    	   window.location=`${sessionStorage.getItem('HOST')}/instruccion_IC/`;
        if (grupo=='P-C-')
           window.location=`${sessionStorage.getItem('HOST')}/instruccion_II/`;
    }
}

//Función que se ejecuta una vez cargada la página
onload=function()
{
    if (contador==0)
        rotarImagenes();
    setInterval(rotarImagenes,1000); // Indicamos que cada segundo cambie la imagen
}