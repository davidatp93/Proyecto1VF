var imagenes=new Array(
    '/static/img/PAN_0.png',            //0
    '/static/img/PAN_3.png',            //1
    '/static/img/PAN_2.png',            //2
    '/static/img/PAN_1.png',            //3
    '/static/img/PAN_NEG.png',          //4
    );

var contador=0;
var cont=0;
var ctp=sessionStorage.getItem("CTP");

function rotarImagenes()    //Funcion para cambiar de imagen
{
    grupo=sessionStorage.getItem("GRUPO");
    contador++
    if (contador<4) //Muestra imágenes de la cuenta regresiva 3, 2, 1
        document.getElementById("imagen").src=imagenes[contador];
    else
    {   
        //console.log(ctp);
        if (ctp==9 || ctp==12 || ctp==18 || ctp==27 || ctp==30 || ctp==36 ||ctp==48 ||ctp==51 ||ctp==57 ||ctp==66 ||ctp==69 ||ctp==75)
            window.location='http://127.0.0.1:8000/pantalla_negra'
        else
        {
            if (grupo=='P-C+')
               window.location='http://127.0.0.1:8000/instruccion_IC/';
            if (grupo=='P-C-')
               window.location='http://127.0.0.1:8000/instruccion_II/';
        }
    }
}

onload=function()//Función que se ejecuta una vez cargada la página
{
    if (contador==0)
        rotarImagenes();// Indicamos que cada segundo cambie la imagen
    setInterval(rotarImagenes,1000);
}