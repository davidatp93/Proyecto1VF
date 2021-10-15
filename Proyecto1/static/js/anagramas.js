const tarjeta=document.querySelector('#tarjetas');
const contenedor=document.querySelector('#contenedores');
const listaC=[];
const listaT=[];
const lista_retorno=[];
var anagramas=new Array(
	'MOINL',
	'CHEEL',
	'DEIOV',
	'ISUOG',
	'LCUED',
	'STUOG',
	'DAUZA',
	'CIAOV',
	'EVUOH',
	'ENVAA',
	'APUOG',
	'ONZOO',
	'DIUOA',
	'NJAAZ',
	'USAAP',
	'ENROF',
	'BIELD',
	'RTUOH',
	'OÑTOO',
	'FOUNB',
	'BRIOL',
	'UMLAP',
	'SCIOD',
	'UTRAF',
	'LOENM',
	'PEALF',
	'EMOAP',
	'EVUON',
	'NCAOB',
	'GRIET',
	'NDUOM',
	'ECUOH',
	'BLAEC',
	'NDUAF',
	'PIAZL',
	'TOONB',
	'NTOOT',
	'STIOL',
	'GLEAR',
	'STIAP',
	);
var levantadas=0;
var aux_retorno='';


onload=function()
{
	timeStarted= 0;
    time = document.getElementById("time");
    
    intentos = sessionStorage.getItem("intento");
    cont=sessionStorage.getItem("ord");
    s=sessionStorage.getItem("seg");
    mls=sessionStorage.getItem("mil");
    h=sessionStorage.getItem("hor");
    m=sessionStorage.getItem("min");

    if(intentos==null)
    	intentos=1;
    if(cont==null) 
        cont=0;
    if(s==null)
    	s=0;
    if(mls==null)
    	mls=0;
    if(h==null)
    	h=0;
    if(m==null)
    	m=0;
    if (intentos>1)
    	comenzar();
}

function deshacer()
{
	console.log(listaT.pop());
	console.log(listaC.pop());
	tarjeta.appendChild(document.getElementById(lista_retorno[listaC.length]));
}

function comenzar()
{
	var btn = document.getElementById('btnEmpezar');
	var btnDes = document.getElementById('btnDeshacer');
	btn.style.display = 'none';
	btnDes.style.display = 'block';
	start();
	mostrar();
}

function mostrar()
{
	var palabra=anagramas[cont];
	document.getElementById("tarjeta1").innerHTML+= palabra.charAt(0);
	document.getElementById("tarjeta2").innerHTML+= palabra.charAt(1);
	document.getElementById("tarjeta3").innerHTML+= palabra.charAt(2);
	document.getElementById("tarjeta4").innerHTML+= palabra.charAt(3);
	document.getElementById("tarjeta5").innerHTML+= palabra.charAt(4);
}

tarjeta.addEventListener('dragstart', e => {
	e.dataTransfer.setData('id', e.target.id);
	aux_retorno=e.target.id;
	console.log(++levantadas);
});

contenedor.addEventListener('dragover', e => {
	e.preventDefault();
});

contenedor.addEventListener('drop', e => {
	if(e.target.id == 'contenedor1' || e.target.id == 'contenedor2' || e.target.id == 'contenedor3' || e.target.id == 'contenedor4' || e.target.id == 'contenedor5')
	{	
		lista_retorno.push(aux_retorno);
		if(e.target.id=='contenedor1' && aux_retorno=='tarjeta5' || e.target.id=='contenedor2' && aux_retorno=='tarjeta3' || e.target.id=='contenedor3' && aux_retorno=='tarjeta1' || e.target.id=='contenedor4' && aux_retorno=='tarjeta2' || e.target.id=='contenedor5' && aux_retorno== 'tarjeta4')
		{
			listaC.push('Check');
			listaT.push('Check');
			console.log(listaC);
			console.log(listaT);
		}
		else
		{
			listaC.push('Error');
			listaT.push('Error');
			console.log(listaC);
			console.log(listaT);
		}
		contenedor.appendChild(tarjeta);
		const id= e.dataTransfer.getData('id');

		if (listaC.length==5)
		{
			evaluar();
		}

		e.target.appendChild(document.getElementById(id));
	}
});

function evaluar()
{	console.log(listaT);
	console.log(listaC);
	if (listaT.length==5 && listaC.length==5)
	{
		//if (lista[0]==5 && lista[1]==3 && lista[2]==1 && lista[3]==2 && lista[4]==4)
		if(listaC[0]=='Check' && listaT[0]=='Check' && listaC[1]=='Check' && listaT[1]=='Check' && listaC[2]=='Check' && listaT[2]=='Check' && listaC[3]=='Check' && listaT[3]=='Check' && listaC[4]=='Check' && listaT[4]== 'Check')
		{
			cont++;
			sessionStorage.setItem("ord",cont);
			sessionStorage.setItem("seg",0); 
			sessionStorage.setItem("mil",0);
			sessionStorage.setItem("hor",0); 
			sessionStorage.setItem("min",0);
			sessionStorage.setItem("intento",1);
			correcta =1;
			//alert("Respuesta correcta");
			guardar_datos(correcta)
			location.reload();
		}
		else
		{
			intentos++;
			sessionStorage.setItem("seg",s); 
			sessionStorage.setItem("mil",mls);
			sessionStorage.setItem("hor",h); 
			sessionStorage.setItem("min",m);
			sessionStorage.setItem("intento",intentos);
			location.reload();
		}
	}
}

function guardar_datos(correcta)
{
	var n= sessionStorage.getItem("NOM_PARTICIPANTE");
	let datos = {
            clave:n,
            n_intentos:intentos,
            tiempo_resp:String(s)+':'+String(mls),
            resultado:correcta,
            alzadas:levantadas
        }

	//Envío de los datos a Django
       fetch("http://127.0.0.1:8000/saveAnagrama/", {
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