//Pantalla negra interensayo
var imagenes=new Array(
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_NEG.png`);

//var duracion=new Array(25,30,30,35,30,25,35,30,25,25,35,25,30,25,35,35,35,35,30,35,25,30,35,25,30,25);
var duracion=new Array(5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5);

var contador=0;
var tipoTarea = sessionStorage.getItem("GRUPO");
var ctp=sessionStorage.getItem("CTP");

//Funcion para cambiar la imagen y link
function rotarImagenes()
{
    // cambiamos la imagen y la url
    contador++
    if (contador<=duracion[contPos])
        document.getElementById("imagen").src=imagenes[0];
    else
    {
        tarea=sessionStorage.getItem("GRUPO");

        if(tarea=='P-C+' && ctp!=39 && ctp!=78 || tarea=='P-C-' && ctp!=39 && ctp!=78)
        {
            contPos++;
            sessionStorage.setItem("posicion",contPos);
            if (tarea=='P-C+')
                window.location=`${sessionStorage.getItem('HOST')}/instruccion_IC/`;
            if (tarea=='P-C-' || tarea=='P-CI')
                window.location=`${sessionStorage.getItem('HOST')}/instruccion_II/`;

        }
        else
        {
        	contPos++;
        	sessionStorage.setItem("posicion",contPos);
            if (ctp==39 &&  tipoTarea == 'P-C+' || ctp==39 &&  tipoTarea == 'P-C-' || ctp==39 &&  tipoTarea == 'P-CI')
                window.location=`${sessionStorage.getItem('HOST')}/manneken`;
            else
            {
                if (ctp==78 &&  tipoTarea == 'P-C+' || ctp==78 &&  tipoTarea == 'P-C-' || ctp==78 &&  tipoTarea == 'P-CI')
                    window.location=`${sessionStorage.getItem('HOST')}/manneken`;
            }
        }
        
        if (tarea=='P+C+' || tarea=='P+C-' || tarea=='P+CI')
        {
            window.location = `${sessionStorage.getItem('HOST')}/senal`;
        }
    }
}

//Función que se ejecuta una vez cargada la página
onload=function()
{
	contPos=sessionStorage.getItem("posicion");
    if (contPos==null)
    { 
        contPos=0;
    }

    rotarImagenes();

    // Indicamos que cada segundo cambie la imagen
    setInterval(rotarImagenes,1000);
}