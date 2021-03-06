var instrucciones=new Array(
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_COMPLETA.png` ,    //0
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_OPERACION.png`,    //1
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_PRESIONA.png`,     //2
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_SECUENCIA.png`,    //3
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_VER.png`,          //4
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/PAN_ROJA.png`,         //5
    );

var listaSubtipos=new Array(
    'Arbol',
    'R',
    '34+23',
    '4x6p',
    'Puerta',
    '48-39',
    'Pje3',
    'Agua',
    '9e4F',
    '5',
    'W',
    '234-56',
    'Computadora',
    'Cocina ',
    'p',
    '41+18',
    'qMce',
    'Amarillo',
    '199-88',
    'EnrW',
    'Planta',
    'i0Ge',
    'K',
    'r',
    '45-29',
    'Hotel',
    );

var ordenTarea=new Array(0,2,1,3,0,1,3,0,3,2,2,1,0,0,2,1,3,0,1,3,0,3,2,2,1,0);

var tareasPredInc=new Array(
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN1_ARBOL.png`,           //0
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN2_R.png`,               //1
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN3_34+23.png`,           //2
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN4_4x6p.png`,            //3
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN5_PUERTA.png`,          //4
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN6_48-39.png`,           //5
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN7_pJE3.png`,            //6
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN8_AGUA.png`,            //7
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN9_qe4F.png`,            //8
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN10_5.png`,              //9
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN11_W.png`,              //10
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN12_234-56.png`,         //11
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN13_COMPUTADORA.png`,    //12
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN14_COCINA.png`,         //13
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN15_p.png`,              //14
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN16_41+18.png`,          //15
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN17_qMce.png`,           //16
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN18_AMARILLO.png`,       //17
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN19_199-88.png`,         //18
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN20_EnrW.png`,           //19
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN21_PLANTA.png`,         //20
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN22_iOGe.png`,           //21
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN23_k.png`,              //22
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN24_r.png`,              //23
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN25_45-29.png`,          //24
    `${sessionStorage.getItem('HOST')}/Proyecto1/static/img/P+C+/EN26_HOTEL.png`,          //25
    );

var sonido_error = document.getElementById('sonido');
var respTarea='';
var cont=0, intentos=0, pantalla_roja=0; //contador de segundos por pantalla
const guardar=[];
var tiempo_acoplado=[];

onload=function()
{
	s = 0; mls = 0; timeStarted= 0; band=0;
    h = 0; m = 0, PR='', RC='';
    time = document.getElementById("time");
    contOrden=sessionStorage.getItem("ord");  //contOrden es el tipo de tarea
    if (contOrden==null)
    { 
        contOrden=0;
    }
    document.getElementById("imagen").src=instrucciones[ordenTarea[contOrden]];
    document.getElementById("teclas").addEventListener("keydown", evento_teclado);
    cargaDatos();
    setInterval(rotarTareas,1000);
    start();
}

function rotarTareas()
{
    if (cont>=0 && cont<2)
    {
            document.getElementById("imagen").src=instrucciones[ordenTarea[contOrden]];
            cont++;
    }
    if (cont>=2 && cont<8 && band==0)
    {
        document.getElementById("imagen").src=tareasPredInc[contOrden];
        sonido_error.play();
        cont++;
    }
    else cont++;

    if(pantalla_roja==1  || cont>=8 && cont<10 && band==0)
    {
        document.getElementById("imagen").src=instrucciones[5];
    }

    if (cont==10 && band==0 || cont==10 && band==1)
    {
        let x = parseInt(contOrden)+1;
        guardaDatos(x);   //num_ensayo
        guardaDatos(ordenTarea[contOrden]); //tipo_ensayo
        guardaDatos(listaSubtipos[contOrden]); //subtipo_ensayo
        
        if(RC=='')   //Tiempo resp correcta (si no acierta)
        {
            guardaDatos('5:0');   //Se guarda el tiempo que dura la tarea (5seg)
        }
        else    //Tiempo resp correcta (si acierta)
        {
            guardaDatos(RC); //Guarda el tiempo que logr??
        }
        if (PR=='')
        {
            guardaDatos('0')
        }
        else
        {
            guardaDatos(PR);
        }
        if(RC=='')   //Correcta
        {
            guardaDatos(0); //0 cuando no acert??
        }
        else
        {
            guardaDatos(1); //1 cuando si acert??
        }
        guardaDatos(intentos);  //intentos

        //Guarda los datos en un diccionario
        let datos = {
            clave:sessionStorage.getItem("ID_PARTICIPANTE"),
            grupo:sessionStorage.getItem("GRUPO"),
            num_ensayo:guardar[0],
            tipo_ensayo:guardar[1],
            subtipo_ensayo:guardar[2],
            //t_acumulado_RC : 
            t_RC:guardar[3],
            //t_acumulado_PR:
            t_PR:guardar[4],
            correcta:guardar[5],
            intentos:guardar[6]
        }

        //Env??o de los datos a Django
        fetch(`${sessionStorage.getItem('HOST')}/ensayos/`, {
            method:"POST",
            headers:{
                "X-CSRFToken":getCookie("csrftoken"),
                "Accept":'application/json',
                'X-Requested-With': "XMLHttpRequest"
            },
            body:JSON.stringify(datos),
            mode:'cors',
            cache: 'default',
            credentials:'include'
        })
        .then(
            respuesta =>{
                respuesta.text().then(
                    function(data){
                        console.log(data);
                    }
                );
            }
        )
        .catch(
            function(error){
                console.log(error);
            }
        );

        contOrden++;
        sessionStorage.setItem("ord",contOrden);
        if (contOrden == 13 || contOrden ==26)
            window.location=`${sessionStorage.getItem('HOST')}/manneken`;
        else
            window.location=`${sessionStorage.getItem('HOST')}/pantalla_negra/`;
    }
}

function guardaDatos(valor)
{
    guardar.push(valor);
}

//Detecci??n de los eventos en teclado
function evento_teclado(event) 
{
    if(cont>=2 && cont<8)
    {
        var codigo = event.which || event.charCode;
        if (event.shiftKey == true) 
            var shiftActive=true;
        
        if(codigo >= 48 && codigo <= 57 || codigo >= 65 && codigo <= 90 || codigo >= 97 && codigo <= 122)
        {
            if (shiftActive == true)
            {
                respTarea+=String.fromCharCode(codigo);
            }
            else
            {
                let aux=String.fromCharCode(codigo);
                respTarea+=aux.toLowerCase();
            }

            //document.getElementById("vista").innerHTML+='Tecla: '+codigo+' Selecci??n: '+respTarea + ' Tiempo: ' + (s-2)+ ':'+ mls +'<br/>';
        }
    }

    //EVALUACI??N DEL RESULTADO
    if(contOrden==0 && respTarea.length==2) //Respuesta tarea 1
    {
        if (respTarea=="RO" || respTarea=="ro")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==1 && respTarea.length==5) //Respuesta tarea 2
    {
        if (respTarea=="RRRRR")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==2 && respTarea.length==2) //Respuesta tarea 3
    {
        if (respTarea=="57")
        {
            pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==3 && respTarea.length==4) //Respuesta tarea 4
    {
        if (respTarea=="4x6p")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==4 && respTarea.length==2) //Respuesta tarea 5
    {
        if (respTarea=="UR" || respTarea=="ur")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==5 && respTarea.length==1) //Respuesta tarea 6
    {
        if (respTarea=="9")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==6 && respTarea.length==4) //Respuesta tarea 7
    {
        if (respTarea=="pJE3")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==7 && respTarea.length==2) //Respuesta tarea 8
    {
        if (respTarea=="AU" || respTarea=="au")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==8 && respTarea.length==4) //Respuesta tarea 9
    {
        if (respTarea=="qe4F")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==9 && respTarea.length==5) //Respuesta tarea 10
    {
        if (respTarea=="55555")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==10 && respTarea.length==5) //Respuesta tarea 11
    {
        if (respTarea=="WWWWW")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==11 && respTarea.length==3) //Respuesta tarea 12
    {
        if (respTarea=="178")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==12 && respTarea.length==5) //Respuesta tarea 13
    {
        if (respTarea=="OPTDA" || respTarea=="optda")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==13 && respTarea.length==2) //Respuesta tarea 14
    {
        if (respTarea=="OC" || respTarea=="oc")
        {
        	pantalla_roja=0;
            sonido_error.pause();    
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==14 && respTarea.length==5) //Respuesta tarea 15
    {
        if (respTarea=="ppppp")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==15 && respTarea.length==2) //Respuesta tarea 16
    {
        if (respTarea=="59")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==16 && respTarea.length==4) //Respuesta tarea 17
    {
        if (respTarea=="qMce")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==17 && respTarea.length==3) //Respuesta tarea 18
    {
        if (respTarea=="MRL" || respTarea=="mrl")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==18 && respTarea.length==3) //Respuesta tarea 19
    {
        if (respTarea=="111")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==19 && respTarea.length==4) //Respuesta tarea 20
    {
        if (respTarea=="EnrW")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==20 && respTarea.length==2) //Respuesta tarea 21
    {
        if (respTarea=="LN" || respTarea=="ln")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==21 && respTarea.length==4) //Respuesta tarea 22
    {
        if (respTarea=="iOGe")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==22 && respTarea.length==5) //Respuesta tarea 23
    {
        if (respTarea=="kkkkk")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==23 && respTarea.length==5) //Respuesta tarea 24
    {
        if (respTarea=="rrrrr")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==24 && respTarea.length==2) //Respuesta tarea 25
    {
        if (respTarea=="16")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
    else if(contOrden==25 && respTarea.length==2) //Respuesta tarea 26
    {
        if (respTarea=="OT" || respTarea=="ot")
        {
        	pantalla_roja=0;
            sonido_error.pause();
            document.getElementById("imagen").src=instrucciones[4];
            band=1;
            if (intentos == 0)
            {
                PR=String(s-2)+':'+String(mls);
                RC=String(s-2)+':'+String(mls);
            }
            if (intentos>0)
            {
                RC=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
        else
        {
            respTarea="";
            if (intentos==0)
            {
                PR=String(s-2)+':'+String(mls);
            }
            intentos++;
        }
    }
}

//Funciones para medici??n del tiempo
function write()
{
	let ht, mt, st, mlst;
	mls++;
   
	if (mls > 99){ s++ ; mls= 0; }
	if (s > 59){ m++; s= 0;}
	if (m > 59){ h++; m= 0;}
	if (h > 24) h= 0;
   
	mlst = ('0' + mls).slice(-2);
	st = ('0' + s).slice(-2);
	mt = ('0' + m).slice(-2);
	ht = ('0' + h).slice(-2);

	var tiempo_evaluar=String(s-2)+':'+String(mls);
	if(tiempo_evaluar==tiempo_acoplado[contOrden] && band==0)
    {
        pantalla_roja=1;
    }

   	time.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
}

function start()
{
   write();
   timeStarted = setInterval(write, 10);
}

function getCookie(name)
{
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function cargaDatos()
{
    var id=sessionStorage.getItem("ID_ASOCIADO");
    let consulta = {clave:id}
    fetch(`${sessionStorage.getItem('HOST')}/consultar_asociado/`, {
            method:"POST",
            headers:{
                "X-CSRFToken":getCookie("csrftoken"),
                "Accept":'application/json',
                'X-Requested-With': "XMLHttpRequest"
            },
            body:JSON.stringify(consulta),
            mode:'cors',
            cache: 'default',
            credentials:'include'
        })
        .then((response) =>
        {
            if (response.status !== 200)
            {
                console.log('Looks like there was a problem. Status Code:' + response.status);
                return;
            }
            response.json().then(function(data)
            {
                for (var i in data)
                {
                    tiempo_acoplado.push(data[i]['TRC']);
                }
            });
        })
        .catch(
            function(error){
                console.log(error);
            }
        );
}