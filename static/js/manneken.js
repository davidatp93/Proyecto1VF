var imagenes =new Array(
	'/static/img/mkN/Fila1_1.png',
	'/static/img/mkN/Fila1_2.png',
	'/static/img/mkN/Fila1_3.png',
	'/static/img/mkN/Fila1_4.png',
	'/static/img/mkN/Fila1_5.png',
	'/static/img/mkN/Fila2_1.png',
	'/static/img/mkN/Fila2_2.png',
	'/static/img/mkN/Fila2_3.png',
	'/static/img/mkN/Fila2_4.png',
	'/static/img/mkN/Fila2_5.png',
	'/static/img/mkN/Fila3_1.png',
	'/static/img/mkN/Fila3_2.png',
	'/static/img/mkN/Fila3_3.png',
	'/static/img/mkN/Fila3_4.png',
	'/static/img/mkN/Fila3_5.png',
	);
var cont=0;
var sent=0, activFisio=0,control=0;
var nTarea= sessionStorage.getItem("ord");
var tipoTarea = sessionStorage.getItem("GRUPO");
var ctp=sessionStorage.getItem("CTP");

onload=function()
{
	manneken1();
	setInterval(encuesta,1000);
}

function encuesta()
{
	if (cont==15)
	{
		//alert(cont);
		sent=document.querySelector('input[name=sentimiento]:checked').value;
		activFisio=document.querySelector('input[name=activ_fisio]:checked').value;
		control=document.querySelector('input[name=control_tarea]:checked').value;
		let datos= {
			clave:sessionStorage.getItem("ID_PARTICIPANTE"),
			s:sent,
			a:activFisio,
			c:control
		}

		fetch(`${sessionStorage.getItem('HOST')}/saveManneken/`, {
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
        
        //alert(tipoTarea);
        
        if (ctp==39 && tipoTarea == 'P-C-' || ctp==39 &&  tipoTarea == 'P-CI')
            window.location=`${sessionStorage.getItem('HOST')}/instruccion_II`;
        else
        {
            if (ctp==78 && tipoTarea == 'P-C-' || ctp==78 && tipoTarea == 'P-CI')
                window.location=`${sessionStorage.getItem('HOST')}/index`;
        }

        if (ctp==39 &&  tipoTarea == 'P-C+')
        	window.location=`${sessionStorage.getItem('HOST')}/instruccion_IC`;
        else
        {
        	if (ctp==78 &&  tipoTarea == 'P-C+')
        	window.location=`${sessionStorage.getItem('HOST')}/index`;
        }

        if (nTarea == 26 && tipoTarea != 'P-C+')
        	window.location=`${sessionStorage.getItem('HOST')}/index`;
        else
        	if (tipoTarea != 'P-C+')
        		window.location=`${sessionStorage.getItem('HOST')}/senal`;
	}
	cont++;
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

function manneken1()
{
	document.getElementById("mkn1_1").src=imagenes[0];
	document.getElementById("mkn1_2").src=imagenes[1];
	document.getElementById("mkn1_3").src=imagenes[2];
	document.getElementById("mkn1_4").src=imagenes[3];
	document.getElementById("mkn1_5").src=imagenes[4];
	document.getElementById("mkn2_1").src=imagenes[5];
	document.getElementById("mkn2_2").src=imagenes[6];
	document.getElementById("mkn2_3").src=imagenes[7];
	document.getElementById("mkn2_4").src=imagenes[8];
	document.getElementById("mkn2_5").src=imagenes[9];
	document.getElementById("mkn3_1").src=imagenes[10];
	document.getElementById("mkn3_2").src=imagenes[11];
	document.getElementById("mkn3_3").src=imagenes[12];
	document.getElementById("mkn3_4").src=imagenes[13];
	document.getElementById("mkn3_5").src=imagenes[14];
}