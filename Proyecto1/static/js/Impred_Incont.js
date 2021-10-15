var instrucciones=new Array(
    '/static/img/PAN_COMPLETA.png' ,    //0
    '/static/img/PAN_OPERACION.png',    //1
    '/static/img/PAN_PRESIONA.png',     //2
    '/static/img/PAN_SECUENCIA.png',    //3
    '/static/img/PAN_VER.png',          //4
    '/static/img/PAN_ROJA.png',			//5
    );

//Tipo de tarea en orden de aparición
var tipoTarea=new Array(0,1,2,3,0,1,3,0,2,1,2,3,0,0,1,3,2,0,1,3,0,2,1,2,3,0); 
var tipoTareaFake=new Array(3,0,3,1,2,0,2,0,0,0,2,1,1,3,2,1,0,3,3,0,3,2,2,1,1,0);
//321 - 0
//IEE - 1
//Tono- 2
var ordenTarea=new Array(
	0,1,2, //1 
	2,1,2, //2
	2,1,0, //3 - 9
	0,1,0, //4 - 12
	0,1,2, //5 - 
	0,1,0, //6 - 18
	2,1,2, //7 - 
	0,1,2, //8 - 
	0,1,0, //9 - 27
	2,1,0, //10 - 30
	2,1,2, //11 - 
	2,1,0, //12 - 36 Mitad
	0,1,2, //13 -   
	0,1,2, //14 - 
	2,1,2, //15 - 
	2,1,0, //16 - 48
	0,1,0, //17 - 51
	0,1,2, //18 - 
	0,1,0, //19 - 57
	2,1,2, //20 - 
	0,1,2, //21 - 
	0,1,0, //22 - 66
	2,1,0, //23 - 69
	2,1,2, //24 - 
	2,1,0, //25 - 75
	0,1,2, //26 - 
	);

var tareasImpredContr=new Array(
	'/static/img/P-C+/EN1_ARBOL.png',
	'/static/img/P-C+/EN2_34+23.png',
	'/static/img/P-C+/EN3_R.png',
	'/static/img/P-C+/EN4_4x6p.png',
	'/static/img/P-C+/EN5_PUERTA.png',
	'/static/img/P-C+/EN6_48-39.png',
	'/static/img/P-C+/EN7_pJE3.png',
	'/static/img/P-C+/EN8_AGUA.png',
	'/static/img/P-C+/EN9_5.png',
	'/static/img/P-C+/EN10_234-56.png',
	'/static/img/P-C+/EN11_W.png',
	'/static/img/P-C+/EN12_qe4F.png',
	'/static/img/P-C+/EN13_COMPUTADORA.png',
	'/static/img/P-C+/EN14_COCINA.png',
	'/static/img/P-C+/EN15_41+18.png',
	'/static/img/P-C+/EN16_qMce.png',
	'/static/img/P-C+/EN17_p.png',
	'/static/img/P-C+/EN18_AMARILLO.png',
	'/static/img/P-C+/EN19_199-88.png',
	'/static/img/P-C+/EN20_EnrW.png',
	'/static/img/P-C+/EN21_PLANTA.png',
	'/static/img/P-C+/EN22_k.png',
	'/static/img/P-C+/EN23_45-29.png',
	'/static/img/P-C+/EN24_r.png',
	'/static/img/P-C+/EN25_iOGe.png',
	'/static/img/P-C+/EN26_HOTEL.png',
	);

var listaSubtipos=new Array(
    'Arbol',
    '34+23',
    'R',
    '4x6p',
    'Puerta',
    '48-39',
    'Pje3',
    'Agua',
    '5',
    '234-56',
    'W',
    'qe4F',
    'Computadora',
    'Cocina ',
    '41+18',
    'qMce',
    'p',
    'Amarillo',
    '199-88',
    'EnrW',
    'Planta',
    'K',
    '45-29',
    'r',
    'i0Ge',
    'Hotel',
    );

var sonido_error = document.getElementById('sonido');
var respTarea='';
const guardar=[];
var cont=0, intentos=0, pantalla_roja=0; //contador de segundos por pantalla y de intentos
var tiempo_acoplado=[];

onload=function()
{
	s = 0; mls = 0; timeStarted= 0; band=0;
    h = 0; m = 0, PR='', RC='';
    time = document.getElementById("time");
    //sessionStorage.setItem("GRUPO","P-C+"); //Elemento temporal
    ctp=sessionStorage.getItem("CTP");  //Contador de tipo de tarea
    if (ctp==null)
        ctp=0;
    
    contOrden=sessionStorage.getItem("ord");  //contOrden es el tipo de tarea
    if (contOrden==null)
        contOrden=0;
    
    if (ordenTarea[ctp]==0)
    	pantalla_conteo();
    else if (ordenTarea[ctp]==1)
    	black_screen();
    
    if (ordenTarea[ctp]==2)
    {
    	document.getElementById("imagen").src=instrucciones[tipoTareaFake[contOrden]];
    	document.getElementById("teclas").addEventListener("keydown", evento_teclado);
    	cargaDatos();
    	setInterval(rotarTareas,1000);
    	start();
    }
}

function rotarTareas()
{	
    if (cont>=0 && cont<2)
    {
            document.getElementById("imagen").src=instrucciones[tipoTareaFake[contOrden]];
            cont++;
    }
    if (cont>=2 && cont<8 && band==0)
    {
        document.getElementById("imagen").src=tareasImpredContr[contOrden];
        sonido_error.play();
        cont++;
    }
    else cont++;

    if(pantalla_roja==1 || cont>=8 && cont<10 && band==0)
    {
        document.getElementById("imagen").src=instrucciones[5];
    }

    if (cont==10 && band==0 || cont==10 && band==1)
    {
        let x = parseInt(contOrden)+1;
        guardaDatos(x);   //num_ensayo
        guardaDatos(tipoTarea[contOrden]); //tipo_ensayo
        guardaDatos(listaSubtipos[contOrden]); //subtipo_ensayo
        
        if(RC=='')   //Tiempo resp correcta (si no acierta)
        {
            guardaDatos('5:0');   //Se guarda el tiempo que dura la tarea (5seg)
        }
        else    //Tiempo resp correcta (si acierta)
        {
            guardaDatos(RC); //Guarda el tiempo que logró
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
            guardaDatos(0); //0 cuando no acertó
        }
        else
        {
            guardaDatos(1); //1 cuando si acertó
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

        //Envío de los datos a Django
        fetch("http://127.0.0.1:8000/ensayos/", {
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
        ctp++;
        sessionStorage.setItem("CTP",ctp);     
        if (ctp==3 || ctp==6 || ctp==9 || ctp==12 || ctp==15 || ctp==18 || ctp==21 || ctp==24 || ctp==27 || ctp==30 || ctp==33 || ctp==36 || ctp==39 ||ctp== 42 ||ctp==45 ||ctp==48 ||ctp==51 ||ctp==54 ||ctp==57 ||ctp==60 ||ctp==63 ||ctp==66 ||ctp==69 ||ctp==72 ||ctp==75 ||ctp==78)
      		window.location='http://127.0.0.1:8000/pantalla_negra/';
        else
          	window.location='http://127.0.0.1:8000/instruccion_II/';
    }
}

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

            //document.getElementById("vista").innerHTML+='Tecla: '+codigo+' Selección: '+respTarea + ' Tiempo: ' + (s-2)+ ':'+ mls +'<br/>';
        }
    }

    //EVALUACIÓN DEL RESULTADO
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
    else if(contOrden==1 && respTarea.length==2) //Respuesta tarea 2
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
    else if(contOrden==2 && respTarea.length==5) //Respuesta tarea 3
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
    else if(contOrden==8 && respTarea.length==5) //Respuesta tarea 9
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
    else if(contOrden==9 && respTarea.length==3) //Respuesta tarea 10
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
    else if(contOrden==11 && respTarea.length==4) //Respuesta tarea 12
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
    else if(contOrden==14 && respTarea.length==2) //Respuesta tarea 15
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
    else if(contOrden==15 && respTarea.length==4) //Respuesta tarea 16
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
    else if(contOrden==16 && respTarea.length==5) //Respuesta tarea 17
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
    else if(contOrden==21 && respTarea.length==5) //Respuesta tarea 22
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
    else if(contOrden==22 && respTarea.length==2) //Respuesta tarea 23
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
    else if(contOrden==24 && respTarea.length==4) //Respuesta tarea 25
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

function guardaDatos(valor)
{
    guardar.push(valor);
}

function pantalla_conteo()
{
	ctp++;
	sessionStorage.setItem("CTP",ctp);
	window.location='http://127.0.0.1:8000/contador_321/';
}

function black_screen()
{
	ctp++;
	sessionStorage.setItem("CTP",ctp);
	window.location='http://127.0.0.1:8000/pan_neg_5s/';
}

//Funciones para medición del tiempo
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
	console.log(tiempo_evaluar);
	if(tiempo_evaluar==tiempo_acoplado[contOrden] && band==0)
    {
        pantalla_roja=1;
    }

   	//time.innerHTML = `${ht}:${mt}:${st}.${mlst}`;
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
    fetch("http://127.0.0.1:8000/consultar_asociado/", {
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