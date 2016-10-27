


document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        console.log("navigator.geolocation works well");
    }
if (!!navigator.userAgent.match(/Trident\/7\./) || (document.documentMode || /Edge/.test(navigator.userAgent))){ // Si on est sur internet explorer ou sur edge
	ErrorBrowserNotValid();
}
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6


function check_browser(){
var isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
var isFirefox = typeof InstallTrigger !== 'undefined';   // Firefox 1.0+
var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
var isChrome = !!window.chrome && !isOpera;              // Chrome 1+
var isIE = /*@cc_on!@*/false || !!document.documentMode; // At least IE6
	
if(isFirefox){
	var firefox = "firefox";
		return firefox;
		}	
};


function ErrorBrowserNotValid(){
	$("body").children().remove();
	Appear_info_message('body', "Désolé, cette application n'est pas encore disponible sur ce navigateur.");	
}

function isMobile()
{ return (window.ontouchstart !== undefined); }

/*
function isMobile() { // FONCTION POUR QUE CA MARCHE QUE SUR ANDROID (LA SEULE FONCTIONNELLE POUR L'INSTANT)
 try {
    if(/Android/i.test(navigator.userAgent)) {
		return true;
    }else if(/webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
		ErrorBrowserNotValid();
	}
    return false;
 } catch(e){ console.log("Error in isMobile"); return false; }
}
*/
 if(isMobile()) // si c'est un mobile, on enleve badnote dans la page d'index
//{
	$("#badnote").remove();
//}

//FONCTIONS USUELLES

function Appear_info_message(message){

	$("#message").html("<span class='span_message'>"+message+"</span>");
	$("#message").css("display","block");
	setTimeout(function()
	{
		$('#message').fadeOut(250, function()
		{
			$('#message').text("");
		}) 
	}, 2000);			
		
}

function Change_button_hover_for_mobile_and_no_mobile()
{
	if(isMobile())
	{
		$(".button").removeClass("button").addClass("button_mobile");
		$(".button_2").removeClass("button_2").addClass("button_mobile");
		$(".button_chapter").removeClass("button_chapter").addClass("button_mobile");

		$(".button_mobile").on("touchstart", function(){
			$(this).css("color","orange");
		});
		$(".button_mobile").on("touchmove touchend", function(){
			$(".button_mobile").css("color","black");
			$(this).css("font-width","normal");
		});		
	}
	else
	{
		$("th, td").addClass("button_th_td_no_mobile");
	}


}

Change_button_hover_for_mobile_and_no_mobile();


if(isMobile())
{
  $("#div_subscribe_login").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) { 
	  if(direction=="left" && distance>200 && duration <500)
	  {
			var url_0 = window.location.href;
			var url = Slice_string(url_0, "/subscribe.html");
			window.location.replace(url+"/index.html");		  
	  }
    }
  });
}



//------------------------------------------------------ CONNEXION AVEC SERVER ---------------------------------------------------------

jQuery.event.props.push("touches");
jQuery.event.props.push("changedTouches");
//var socket = io.connect('http://localhost:3000'); //les deux lignes suivantes sont equivalentes, mais pour faire marcher le local sur mobile il faut donner l'adresse ip en clair (et non en "http//localhost..."") 
//var socket = io.connect('http://192.168.1.2:3000');
var socket = io.connect('http://sectstore.mybluemix.net/');



var connect_disconnect_trigger = true;

function Subscribe(){	 	
	
	if(connect_disconnect_trigger){
		connect_disconnect_trigger = false;		
		var	subs_login = $('#subs_login').val().trim();
		var	subs_pass = $('#subs_pass').val().trim();
		var confirm_pass = $('#confirm_pass').val().trim();
		var	subs_email = $('#subs_email').val().trim(); // note : avec encodeURIComponent, le @ sera remplacé par %40
		var subs_date = "0000-00-00 00:00:00";//year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
		var to_check = $('#to_check');
		var	username = $('#username').val();
		var url = window.location.href;
		var confirmation_pass = Password(50, false); // une key de 50 caractères pour la confirmation de mail d'inscription
		if(! /^[a-zA-Z0-9éèçàù@-_]{3,15}$/.test(subs_login) || ! /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\-_]+\.[a-zA-Z\.\-_]{1,}[a-zA-Z\-_]+/.test(subs_email) || ! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@.]{8,}$/.test(subs_pass) || subs_pass != confirm_pass || !to_check.is(':checked'))
		{
			if(! /^[a-zA-Z0-9éèçàù@-_]{3,15}$/.test(subs_login) )
			{
				Appear_info_message("Le nom d'utilisateur est non conforme !");
				connect_disconnect_trigger = true;
			}
				
			if(! /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\-_]+\.[a-zA-Z\.\-_]{1,}[a-zA-Z\-_]+/.test(subs_email))
			{	
				Appear_info_message("L'e-mail est non conforme !");
				connect_disconnect_trigger = true;
			}

			if(! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@.]{8,}$/.test(subs_pass))
			{
				Appear_info_message("Le mot de passe doit contenir au moins 8 caractères, et au moins une majuscule.");
				connect_disconnect_trigger = true;
			}
			
			if(subs_pass != confirm_pass)
			{
				Appear_info_message("Tu n'as pas confirmé le même mot de passe !");
				connect_disconnect_trigger = true;
			}
				
			if(!to_check.is(':checked'))
			{
				Appear_info_message("Tu dois cocher la case pour t'inscrire !");
				connect_disconnect_trigger = true;
			}			
				
         }
		 else if(subs_date!='' && username == "" && to_check.is(':checked'))
		 {
		 	var subscribe_to_confirm_data ={  
						login : subs_login,  
						pass : subs_pass,
						email : subs_email,
						date : subs_date,
						url : url,
						confirmation_pass : confirmation_pass
				};  
			 socket.emit('subscribe_to_confirm_data', subscribe_to_confirm_data);
		}
		else
		{
			connect_disconnect_trigger = true;	
		} 
	}
}


// Fonction qui génère un mot de passe aléatoire

function Password(length, special) {
  var iteration = 0;
  var password = "";
  var randomNumber;
  if(special == undefined){
      var special = false;
  }
  while(iteration < length){
    randomNumber = (Math.floor((Math.random() * 100)) % 94) + 33;
    if(!special){
      if ((randomNumber >=33) && (randomNumber <=47)) { continue; }
      if ((randomNumber >=58) && (randomNumber <=64)) { continue; }
      if ((randomNumber >=91) && (randomNumber <=96)) { continue; }
      if ((randomNumber >=123) && (randomNumber <=126)) { continue; }
    }
    iteration++;
    password += String.fromCharCode(randomNumber);
  }
  return password;
}


if(!isMobile())
{
	$("#arrow_left_window").on("mousemove", function(e){
		$("#arrow_left_window").css("opacity",1);
		$("#arrow_left_window").css("cursor","pointer");
	});

	$("#arrow_left_window").on("mouseout", function(e){
			$("#arrow_left_window").css("opacity",0);
			$("#arrow_left_window").css("cursor","auto");
	});	
	
	$("#arrow_left_window").on("click", function(e){
		var url_0 = window.location.href;
		var url = Slice_string(url_0, "/subscribe.html");
		window.location.replace(url+"/index.html");	
	});
}



 socket.on('subscribe_data_to_confirm', function(message) {
	Appear_info_message(message);
 connect_disconnect_trigger = true;	
 });
 
 
 
 
 
 // Fonction qui permet d'obtenir les variables dans l'url
var key
function GetQueryVariable(variable){
		setTimeout(function () { //Le timeout peut sembler inutile, mais en fait c'est une astuce trouvée sur le net pour faire marcher window.location sur opera et explorer... le gars avait même ajouté cette ligne de code avant le setTimeout : document.body.style.backgroundColor = "#000"; (à rajouter si les problèmes persistent)

		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){key = pair[1]; return pair[1];}
		}
		return(false);		
		
		}, 0);
}


//Fonction qui permet de couper un long string à partir d'un "sous-string" dans ce long string et de garder ce qu'il y a avant le sous-string

function Slice_string(str, substr){
	var index = str.indexOf(substr);	
	var res = str.substring(0, index)
	return res;	
}


function Get_confirmation_key(){
	GetQueryVariable("key");
	setTimeout(function () { //Le timeout peut sembler inutile, mais en fait c'est une astuce trouvée sur le net pour faire marcher window.location sur opera et explorer... le gars avait même ajouté cette ligne de code avant le setTimeout : document.body.style.backgroundColor = "#000"; (à rajouter si les problèmes persistent)
	if(key != false && key.length > 40){ // si key possède plus de 40 caractères, c'est une confirmation de mail d'inscription
	socket.emit('subscribe_data', key);
	} else if(key != false && key.length < 41){ // si key possède moins de 40 caractères, c'est une confirmation de mail de changement de mot de passe
		socket.emit('password_change', key);
	}else{
	
	return false;
	}
			}, 500);
}

	
	
socket.on('confirmation_done_ok_redirect', function(){
	var message ="Ton compte est finalisé !";
	Appear_info_message(message);
	var url_0 = window.location.href;
	var url = Slice_string(url_0, "/subscribe.html?key");
	window.location.replace(url);
});

socket.on('login_already_exists', function(){
var message ="Pseudo déjà utilisé !";
Appear_info_message(message);
connect_disconnect_trigger = true;	

});

socket.on('email_already_exists', function(){
var message ="E-mail déjà utilisé !";
Appear_info_message(message);
connect_disconnect_trigger = true;

});



socket.on('login_already_exists_just_before_confirmation', function(){

var message ="Désolé, mais ce pseudo a été validé par une autre personne juste avant ta validation ! ... :(";
Appear_info_message(message);


});


socket.on('email_already_exists_just_before_confirmation', function(){

var message ="Désolé, mais cet e-mail a été validé par une autre personne juste avant ta validation ! ... :(";
Appear_info_message(message);

});


Get_confirmation_key(); // On lance la fonction de confirmation de key à chaque fois qu'on ouvre la page

 
 
 
$("body").fadeTo("fast",1); 