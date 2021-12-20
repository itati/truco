$(document).ready(function(){
var modalidad=0;
var puntaje1, puntaje2;
var b=false;

cargarInicial();

function cargarInicial(){
	$('#vista1').addClass('visualizar');
	$('#vista2').addClass('oculto');	
	puntaje1=parseInt(0);
	puntaje2=parseInt(0);
	$('#p1').html(puntaje1);
	$('#p2').html(puntaje2);
	$('#nombre1').val('Equipo1');
	$('#nombre2').val('Equipo2');
	$('#30').removeClass('noElegido').addClass('btnElegido');
	$('#24').removeClass('btnElegido').addClass('noElegido');
	$('#vista2').removeClass('visualizar').addClass('oculto');
	$('#vista1').removeClass('oculto').addClass('visualizar');

	//resetFosforos();
	resetFosforos1();
	resetFosforos2();
}
//----------------------------------------Botones
$('.elegirM').on('click',function(){
	$('.elegirM').removeClass('btnElegido').addClass('noElegido');
	$(this).removeClass('noElegido').addClass('btnElegido');
});

$('#init').on('click', btnIniciar);

$('#fin').on('click',function(){
	cargarInicial();
});
//----------------------------------------Botones de sumar y restar

				//boton sumar Equipo1
$('#s1').on('click', function(){
	
	if(puntaje1 < modalidad)
	{
		puntaje1++;
		$('#p1').html(puntaje1);
	}
	dibujarPuntos(this);

});

				//boton restar E1
$('#r1').on('click', function(){
	if(puntaje1>0)
	{
		puntaje1-=1;
		$('#p1').html(puntaje1);
	}
	resetFosforos1();
	dibujarPuntos(this);
});

			//boton sumar Equipo2
$('#s2').on('click', function(){
	
	if(puntaje2 < modalidad)
	{
		puntaje2++;
		$('#p2').html(puntaje2);
	}
	dibujarPuntos(this);
});

				//boton restar E2
$('#r2').on('click', function(){
	if(puntaje2>0)
	{
		puntaje2-=1;
		$('#p2').html(puntaje2);
	}
	resetFosforos2();
	dibujarPuntos(this);

});

//--------------------------------Funciones

function resetFosforos(){

	var html="";
	
	for(var i = 1 ; i <= 12 ; i++){  //i para el ID
		debugger;
		if(i==1){
		  html+='<div id="equipo1Mitad1" class="centerFosforo">'
		}				
		if(i==4){
		html+='</div>';	
		html+='<div id="equipo1Mitad2" class="centerFosforo">'
		}
		if(i==7){
		html+='</div>';	
		$("#fosforos1").html(html);

		html="";
		html+='<div id="equipo2Mitad1" class="centerFosforo">'
		}
		if(i==10){
		html+='</div>';	
		html+='<div id="equipo2Mitad2" class="centerFosforo">'
		}

		html+='<img src="www/img/0.png" id="'+i+'">';
	}
	html+='</div>';
	$("#fosforos2").html(html);
	
}

function resetFosforos1(){
	var html="";
	
	for(var i = 1 ; i <= 6 ; i++){  //i para el ID
		//debugger;
		if(i==1){
		  html+='<div id="equipo1Mitad1" class="centerFosforo">'
		}				
		if(i==4){
		html+='</div>';	
		html+='<div id="equipo1Mitad2" class="centerFosforo">'
		}
		html+='<img src="www/img/0.png" id="'+i+'">';
	}
	html+='</div>';
	$("#fosforos1").html(html);
	
}

function resetFosforos2(){
	var html="";
	
	for(var i = 7 ; i <= 12 ; i++){  //i para el ID
		//debugger;
		if(i==7){
		  html+='<div id="equipo2Mitad1" class="centerFosforo">'
		}				
		if(i==10){
		html+='</div>';	
		html+='<div id="equipo2Mitad2" class="centerFosforo">'
		}
		html+='<img src="www/img/0.png" id="'+i+'">';
	}
	html+='</div>';
	$("#fosforos2").html(html);
	
}

function btnIniciar(){
				//tomar la modalidad
				//setear etiquetas de nombres de equipo
	modalidad= parseInt($('.btnElegido').val().replace('a',''));
	$('#moda').html($('.btnElegido').val());
	$('#ne1').val($('#nombre1').val());
	$('#ne2').val($('#nombre2').val());
				//mostrar la segunda pantalla
	$('#vista1').removeClass('visualizar').addClass('oculto');
	$('#vista2').removeClass('oculto').addClass('visualizar');
}

			//funcion dibujarPuntos segun la modalidad que sea llamada desde los botones de sumar y restar Empeza con 30
function dibuja(donde, cuanto){
	
	$("#"+donde).attr('src',"www/img/"+cuanto+".png");
	
}

function dibujarPuntos(e){

	if(e==s1 || e==r1){
		var puntos = puntaje1;
		var dnd=1;
	}else
	{var puntos = puntaje2;
		var dnd=7;
	}
	var maxImg= (modalidad/6);
	if(puntos==modalidad && b==false){

		b=true;
		gana(e);
		//mando e porque es lo que tengo y me sirve para saber si es el equipo 1 o 2
	}

	if(puntos<=maxImg)
	{
		dibuja(dnd,puntos);
	}else{
		for(; puntos > maxImg ;)
		{	
			dibuja(dnd,maxImg);
			puntos-=maxImg;
			dnd++;
		}
			dibuja(dnd,puntos);
	}

}
/*function gana es llamada por la function dibujarPuntos*/
function gana(q){
	var quien;
	if(q==s1){quien=$('#nombre1').val()}else{quien=$('#nombre2').val()}
	$('#ganador').css({"display":"block"});
	$('#ganador').append('<img id="gana" src="www/img/confeti.gif">');
	$('#ganador').append('<input type="text" readonly id="quien" class="botonQuien" value="¡Felicidades '+quien+'!">');
	$('#ganador').append('<img id="copa" src="www/img/copa.png" class="botonGanador">');
	$('#ganador').append('<input type="button" id="fin2" class="botonGanador" value="Volver a Jugar">');

	
	$('#fin2').on('click',function(){
		$('#ganador').css({
			"display":"none"
		});
		$('#ganador').empty();
		b=false;
		cargarInicial();
	});

}

});