//CUENTA REGRESIVA Y PANTALLA NEGRA DEL PREDECIBLE-CONTROLABLE
var imagenes=new Array(
    '/static/img/PAN_0.png',            //0
    '/static/img/PAN_3.png',            //1
    '/static/img/PAN_2.png',            //2
    '/static/img/PAN_1.png',            //3
    '/static/img/PAN_NEG.png',          //4
    '/static/img/PAN_COMPLETA.png' ,    //5
    '/static/img/PAN_OPERACION.png',    //6
    '/static/img/PAN_PRESIONA.png',     //7
    '/static/img/PAN_SECUENCIA.png',    //8
    '/static/img/PAN_VER.png',          //9
    );

var contador=1;
var cont=0;
function rotarImagenes()    //Funcion para cambiar de imagen
{
    contador++
    if (contador<4) //Muestra imágenes de la cuenta regresiva 3, 2, 1
        document.getElementById("imagen").src=imagenes[contador];
    else
        if (contador>=4 && contador<9)  //Muestra pantalla negra durante 5 segundos
            document.getElementById("imagen").src=imagenes[4];
        else    //nos manda a la instrucción para resolver la tarea
        {
            tarea=sessionStorage.getItem("GRUPO");
            if(tarea=='P+C+')
            {
                window.location = `${sessionStorage.getItem('HOST')}/instruccion`
            }
            if(tarea=='P+C-' || tarea=='P+CI')
            {
                window.location = `${sessionStorage.getItem('HOST')}/instruccion_PI`
            }
            contador=0;
        }   
}

onload=function()//Función que se ejecuta una vez cargada la página
{
    if (cont ==0)
    {
        document.getElementById("imagen").src=imagenes[1];
        cont++;
    }
    // Indicamos que cada segundo cambie la imagen
    setInterval(rotarImagenes,1000);
}