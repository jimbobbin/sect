/*
$("#login").attr("value", "jin");
$("#pass").attr("value", "Azertyu1");
*/
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
	Appear_info_message('body', "Désolé, cette application n'est pas encore disponible sur ce navigateur.", 0, 15, false);	
}



//------------------------------------------------------ CONNEXION AVEC SERVER ---------------------------------------------------------

jQuery.event.props.push("touches");
jQuery.event.props.push("changedTouches");
//var socket = io.connect('http://localhost:3000'); //les deux lignes suivantes sont equivalentes, mais pour faire marcher le local sur mobile il faut donner l'adresse ip en clair (et non en "http//localhost..."") 
//var socket = io.connect('http://192.168.1.2:3000');
var socket = io.connect('http://sectstore.mybluemix.net/');

var member_data = 0;

function Refresh_login_data(docs){
member_data = docs; 
} 

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

var can_switch_table_container_map_to_map_and_tools_of_map = true;
if(isMobile())
{
  $("#div_subscribe_login").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) { 
	  if(direction=="left" && distance>200 && duration <500)
	  {
		var url_0 = window.location.href;
		var url = Slice_string(url_0, "/member_space.html");
		window.location.replace(url+"/index.html");		  
	  }
    }
  });


  $("#table_container").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		if($(".badnote_name_data").length)
		{			
		  if(direction=="left"  && distance>200 && duration <500 && can_switch_table_container_map_to_map_and_tools_of_map)
		  {
				can_switch_table_container_map_to_map_and_tools_of_map = false;
				ally_name_of_polyline_at_screen = login;
				$("#table_container").fadeTo("fast", 0, function(){
					$("#table_container").css("display","none");
					$("#map_and_tools_of_map").css("opacity",0);
					$("#map_and_tools_of_map").css("display","block");
					initMap();
					Refresh_css();
					Send_my_position_and_my_enemies_positions();
					$("#map_and_tools_of_map").fadeTo("fast", 1);
					// les quatre lignes de code suivantes peuvent paraitre inutiles (car il s'agit d'activer le bouton d'unite_name_input alors que celui-ci est encore vide) mais	il le faut pour que la carte se charge bien. Pourquoi ? je sais pas
					var e = jQuery.Event("keydown");
					e.which = 13; // # Some key code value
					e.keyCode = 13;
					$("#unite_name_input").trigger(e);		
					
					can_switch_table_container_map_to_map_and_tools_of_map = true;
				});	  
			}
		}
    }
  });

  $("#map").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) 
	{
		if($(".badnote_name_data").length)
		{		
		  if(direction=="right" && distance>200 && duration <500 && can_switch_table_container_map_to_map_and_tools_of_map)
		  {
					can_switch_table_container_map_to_map_and_tools_of_map = false;
					$("#map_and_tools_of_map").css("opacity",0);	
					Close_map();
					$("#map_and_tools_of_map").css("display","none");
					$("#table_container").css("display","block");
					Refresh_css();
					$("#table_container").fadeTo("fast", 1);
					can_switch_table_container_map_to_map_and_tools_of_map = true;
		  }
		}
	}
  });
}

//------------------------------------------------------ MISE EN FORME ---------------------------------------------------------


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
/*
 if(isMobile()) // si c'est un mobile, on enleve badnote dans la page d'index
//{
	$("#badnote").remove();
//}
*/


function Change_button_hover_for_mobile_and_no_mobile()
{
	if(isMobile())
	{
		$(".button").removeClass("button").addClass("button_mobile");
		$(".button_2").removeClass("button_2").addClass("button_mobile");
		$(".button_login").addClass("button_mobile");
		$(".button_chapter").removeClass("button_chapter").addClass("button_mobile");

		$(".button_mobile").on("touchstart", function(){
			if(!$(this).hasClass("validation_taxe_day"))
			{
				$(this).css("color","orange");
			}
			
		});
		$(".button_mobile").on("touchmove touchend", function(){


			if(!$(this).hasClass("td_today"))
			{
				$(this).css("color","black");
				$(this).css("font-weight","normal");
			}
			else if($(this).hasClass("td_today"))
			{
				$(this).css("color","black");
			}				
		});		
	}
	else
	{
		$("th, td").addClass("button_th_td_no_mobile");
	}


}

// ANNULATION DU CLICK DROIT SUR LE BODY
        function Do_nothing()
     {
      return false;
     }
     function Prc()
     {
      var screen = document.getElementsByTagName('html');
      for(var i=0; i<screen.length; i++)
       screen[i].oncontextmenu = Do_nothing;
     }  
	 
	 
	 
function disableSelection(target)
{
    //For IE This code will work
    if (typeof target.onselectstart!="undefined") 
    target.onselectstart=function(){return false}
    
    //For Firefox This code will work
    else if (typeof target.style.MozUserSelect!="undefined") 
    target.style.MozUserSelect="none"
    
    //All other  (ie: Opera) This code will work
    else 
    target.onmousedown=function(){return false}
    target.style.cursor = "default"
}
disableSelection(document.getElementsByTagName("BODY")[0]); //Oui, c'est comme ca qu'on selectionne le tag body... en majuscule et avec le [0], je sais pas pourquoi... 	 
	 



// FONCTION QUI SWITCH ENTRE ELEMENT VISIBLE OU INVISIBLE

function visibleornot(arg) {
	
	if($(arg).hasClass('invisible')){
  $(arg).toggleClass('invisible visible');

		
} else if ($(arg).hasClass('visible')){

 $(arg).toggleClass('visible invisible');

}
}

// OU ENCORE, SANS LES CLASSES MAIS DIRECTEMENT DANS LE CSS (DISPLAY) 

function Visibility_switch(arg) {
	
	if($(arg).css("display")=='none'){
		$(arg).css("display","block");
	} else if ($(arg).css("display")=='block'){
		$(arg).css("display","none");
	}
}


// FONCTION QUI CHANGE L'OPACITE

function Opacity_change(element, opacity) {
	if(opacity==1){	
		$(element).css("opacity","1");
	}else{
		$(element).css("opacity","0");	
	}
}

//CODE POUR REVENIR A LECRAN INDEX EN APPUYANT SUR LA FLECHE "<<<" A GAUCHE DE LECRAN
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
		var url = Slice_string(url_0, "/member_space.html");
		window.location.replace(url+"/index.html");	
	});
}

//Fonction qui permet de couper un long string à partir d'un "sous-string" dans ce long string et de garder ce qu'il y a avant le sous-string

function Slice_string(str, substr){
	var index = str.indexOf(substr);	
	var res = str.substring(0, index)
	return res;	
}


//FONCTION QUI REPLACE LE ALLY INPUT LA MAP ET LE ENEMY INPUT EN FONCTION SI CEST UN MOBILE OU UN ORDI

//FONCTION QUI GENERE UN NOMBRE ALEATOIRE
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//CSS A REACTIVER SI CHANGEMENT DE TAILLE D'ECRAN (agrandissement de la fenetre ou changement de résolution). CONCERNE EN FAIT TOUT CE QUE JE N'AI PAS REUSSI A FAIRE AVEC LE CSS PURE

function Refresh_css()
{	
	//partie calendrier
	
	var body_width = $("body").width();
	
	var td_width = ($("#table_container").width()/7);
		
	$("#table_container table tr td").css("width",td_width+"px");
	
	$("#table_container table tr td").css("height",""+td_width+"px");
	
	
	//partie map
	
	if(body_width<400) //si les dimensions sont celles d'un mobile vertical
	{
		$('#map').prependTo('#map_and_tools_of_map');
	}
	else
	{
		$('.left_of_map').prependTo('#map_and_tools_of_map');
	}	

	var map_and_tools_of_map_width = $("#map_and_tools_of_map").width();
	var map_width = $("#map").width();		
	$("#map").css("height",""+(map_width)+"px");

	
	//partie badnote_name_data

	/*
	if($(".badnote_name_data").html()!=undefined)
	{
		var top_value_limit = $("#table_container").offset().top+$("#table_container").height();
		var top_badnote_data_pos = $(".badnote_name_data").offset().top;
		
		if(top_badnote_data_pos<top_value_limit)
		{
			$(".badnote_name_data").css("position","relative");
			$(".badnote_name_data").css("top","-10px");
		}
		else
		{
			$(".badnote_name_data").css("position","absolute");
			
			
		}
	}
	*/
	
	//partie helpbox
	
	$("#help_box").css("width",""+($("body").width()-16)+"px");

}


window.onresize = function(event) {
    Refresh_css();
};

//------------------------------------------------------ CONNEXION AVEC SERVER ---------------------------------------------------------

$("#div_subscribe_login").on("mousemove, mouseenter", function()
{
	$("#badnote").css("display","none");
	
});

$("#forgot_pass_button").on("click", function()
{
	if($("#forgot_pass").css("display")=="none")
	{
		$("#forgot_pass").css("display","block");
	}
	else
	{
		$("#forgot_pass").css("display","none");
	}
});

var connect_disconnect_trigger = true;




function Send_forgot_pass(){
	
	if(connect_disconnect_trigger){
			connect_disconnect_trigger = false;		
			var	email = $('#forgot_pass_email').val().trim(); // note : avec encodeURIComponent, le @ sera remplacé par %40			
			var new_pass = $('#forgot_pass_new_pass').val().trim();
			var confirm_new_pass = $('#confirm_new_pass').val().trim();
			var url = window.location.href;
			var new_pass_confirmation_pass = Password(40, false); // une key de 40 caractères pour la confirmation de mail de changement de mot de passe
			if(! /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\-_]+\.[a-zA-Z\.\-_]{1,}[a-zA-Z\-_]+/.test(email) || !/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(new_pass) || new_pass != confirm_new_pass){
				
				if(! /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\-_]+\.[a-zA-Z\.\-_]{1,}[a-zA-Z\-_]+/.test(email) ){
					Appear_info_message('E-mail non conforme !');
					connect_disconnect_trigger = true;
				}
				
				if(!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(new_pass)){
					Appear_info_message("Le mot de passe doit contenir au moins 8 caractères, au moins une majuscule, une minuscule, et un nombre ou caractère spécial.");
					connect_disconnect_trigger = true;
				}				
			
				if(new_pass != confirm_new_pass){
					Appear_info_message("Tu n'as pas confirmé le même mot de passe !");
					connect_disconnect_trigger = true;
				}
					
			}else if(email!='' && new_pass !="" && confirm_new_pass !=""){
				var forgot_pass_data ={  
						email : email,
						new_pass : new_pass,
						url : url,
						new_pass_confirmation_pass : new_pass_confirmation_pass
					};
				socket.emit('forgot_pass_data', forgot_pass_data);	
			}else{
				connect_disconnect_trigger = true;	
			 } 
	}
	
}

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



Get_confirmation_key(); // On lance la fonction de confirmation de key à chaque fois qu'on ouvre la page

 


socket.on('new_pass_send', function(new_pass_confirm){
	if(new_pass_confirm == "to_confirm"){
			Appear_info_message("Un nouveau mot de passe va être envoyé à l'adresse que tu as donnée !");
			connect_disconnect_trigger = true;		
		
	}else if (new_pass_confirm == "confirmed"){
			var url_0 = window.location.href;
			var url = Slice_string(url_0, "?key");
			window.location.replace(url);
			Appear_info_message("Ton mot de passe a été changé.");
	}
});




function Login()
{	 
	if(connect_disconnect_trigger)
	{
		connect_disconnect_trigger = false;		
		var	connect_login = $('#login').val().trim();
		var	connect_pass = $('#pass').val().trim();
		
        if(/^[a-zA-Z0-9éèçàù@-_]{3,15}$/.test(connect_login) &&  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@.]{8,}$/.test(connect_pass))
		{ 		
			var login_data =
			{  
				login : connect_login,  
				pass : connect_pass
			};  
			socket.emit('login_data', login_data);	 
		}
		else
		{
			Appear_info_message("Ce compte n'existe pas.");
			connect_disconnect_trigger = true;		
		}
	}
}


socket.on('get_login_data', function(docs) 
{ 
	member_data = docs;
	Create_array_names_of_this_member(docs[0]["id_name_switch_pass"]);
	$("#div_subscribe_login, .disappear_when_connected").css("display","none");
	$("#badnote").css("display","block");
	var message ="Bienvenue " +member_data[0].login+ " !";
	login = member_data[0].login;
	id_login = member_data[0]._id;
	Appear_info_message(message);
	connect_disconnect_trigger = true;
});

socket.on('login_id_for_disconnection_if_already_connected', function(id) 
{ 
	if(id == id_login)
	{
		//window.location.replace("http://localhost:8100/member_space_local.html");
		window.location.replace("http://sect.mybluemix.net/member_space.html");		
	}

});

socket.on('fail_to_login', function (reason) 
{
	if(reason == "login_already_used")
	{
		Appear_info_message("Ce compte est déjà en cours d'utilisation !");
	}
	else if (reason == "unknown_login")
	{
		Appear_info_message("Ce compte n'existe pas.");
	}
	connect_disconnect_trigger = true;	
});








//------------------------------------------------------ //PARTIE BADNOTE ---------------------------------------------------------

var posleft_event
var postop_event
var in_badnote_form = false;

//Fonction qui enregistre les coordonnées d'un élément passé en argument

function Get_position(arg){
	
		
    return {top: $(arg).offset().top, left: $(arg).offset().left};
}

//Fonction qui attribue les coordonnées d'un élément passé en argument

function Set_position(arg1, arg2, arg3){
	
	$(arg1).css({"left":""+arg2+"px"});

	$(arg1).css({"top":""+arg3+"px"});	
    
}

//FONCTION QUI VIDE LE CONTENU DES CHAMPS D'UN FORM	
	
function Empty_form(a,b,c,d,e){
	
	$(a).find(b).val("");
	$(a).find(c).val("");
	$(a).find(d).val("");
	$(a).find(e).val("");
	
}


function Go_to_next_name_part_if_space(input_id)
{
	input_val = $("#"+input_id+"").val();
	
	if(Str_contain_char(input_val, " "))
	{
		return true;
	}
	
}


function Str_contain_char(str, char_to_find)
{
	var str_length = str.length;
	var i
	for(i=0; i<str_length; i++)
	{
		if(str[i]==char_to_find)
		{
			return true;
		}
	}
	return false;
}


// S'IL NE S'AGIT PAS D'UN MOBILE MAIS D'UN ORDI

if(isMobile() == false){ 


function Badnote_form_move(e){
Empty_form(".badnote_form",".forename",".name",".t_forename",".t_name");
$(".forename").focus();	
posleft_event = e.pageX-1;
postop_event = e.pageY-15;

Set_position(".badnote_form, #list_of_names_shortcut_suggestion", posleft_event, postop_event);
	
}

$(".badnote_form").bind("mousemove", function(e) {
		
in_badnote_form=true;

});

function Bind_badnote_form_move(){
	
$("#badnote").bind("mousemove", function(e) {
	in_badnote_form=false;
	Badnote_form_move(e);
	Distance_mouse_badnote_form(e);
});
}
Bind_badnote_form_move();





function Unbind_badnote_form_move(){
	$('#badnote').unbind('mousemove');
}






$('.forename').on('input', function() { 
Unbind_badnote_form_move();
Appear_badnote_form();
   
});



$(".badnote_form").mouseleave(function(e) {
Copy_badnote_form();    
Disapear_badnote_form();


});




// fonction qui fait disparaître le formulaire si la distance entre le formulaire et la souris est trop grande (car c'est un bug):

function Distance_mouse_badnote_form(e){
	if($(".badnote_form").is(':visible')){
	postop_event = e.pageY;
	posleft_event = e.pageX;
	
	var postop_form = Get_position(".badnote_form").top;
	var posleft_form = Get_position(".badnote_form").left;
	
	var top_distance = postop_event - postop_form;
	var left_distance = posleft_event - posleft_form;
	
	
	if(Math.abs(top_distance)>20 && in_badnote_form == false || Math.abs(left_distance)>20 && in_badnote_form == false ){
		Copy_badnote_form(); 
		Disapear_badnote_form();
		
		}
	}
}
	
	$("body").bind("mousemove", function(e) {
		posleft_event = e.pageX;
		Distance_mouse_badnote_form(e); 
		
		var badnote_width = parseInt($("#badnote").css("width"));
		
		if (posleft_event>badnote_width) {
			$(".badnote_form").css("display","none");
		}else if(posleft_event<badnote_width){
			$(".badnote_form").css("display","block");
		}

});







}else if(isMobile()){ // S'IL SAGIT DUN MOBILE

Reorganize_for_mobile();



$('#badnote').on('click', function(e) {
	if($('.badnote_form').css("opacity") == "1" ){
		Copy_badnote_form();  
		Disapear_badnote_form();

	}

	$(".forename").focus();	
	posleft_event = e.pageX-1;
	postop_event = e.pageY-15;
	Set_position(".badnote_form", posleft_event, postop_event);
	Set_position("#list_of_names_shortcut_suggestion", posleft_event, postop_event); 
	Appear_badnote_form();
	

   
});

$("body").on("click", function(e) {
	posleft_event = e.pageX;
	var badnote_width = parseInt($("#badnote").css("width"));
	if (posleft_event>badnote_width) {
		$(".badnote_form").css("display","none");
	}else if(posleft_event<badnote_width && badnote_data_visible == false){
		$(".badnote_form").css("display","block");
		$('#badnote').trigger("click");
	}

});





}


function Reorganize_for_mobile()
{
	$(".chapter").css("font-size", "12px");
	$(".nav_div").css("font-size", "11px");
	$("nav").css("max-width", "250px");
	$(".nav_div").css("margin", "0px");
	
}





function Disapear_badnote_form(){

$('.badnote_form').css("opacity","0");
$('#list_of_names_shortcut_suggestion').css("opacity","0");
$('#list_of_names_shortcut_suggestion').children().text("");
$(".forename").focus();		
Empty_form(".badnote_form",".forename",".name",".t_forename",".t_name");
if(isMobile()==false){
	Bind_badnote_form_move();	
}
$('.badnote_form_copy').fadeOut( 500, function (){
	$(this).remove();
});	
		
	
	
}


function Appear_badnote_form(){
if($(".badnote_form").css("opacity")==0){	
Font_change($(".forename, .name"));
Font_change($(".t_forename, .t_name"));} // On change la font de badnote_form à chaque réapparition pour l'esthétique
$('.badnote_form').css("opacity","1");
$('#list_of_names_shortcut_suggestion').css("opacity","1");
}



// Fonction de clonage du formulaire (intérêt seulement visuel et esthétique) : on clone la div du formulaire pour que le clone se fige et s'estompe doucement lorsque l'on quitte le formulaire avec la souris, tandis que le vrai formulaire reste mobile et fonctionnel


function Copy_badnote_form(){    
        var copie = $(".badnote_form").clone();
		copie.attr('class','badnote_form_copy');
		copie.find(".badnote_male_and_fem").attr('class','badnote_male_and_fem_copy');
		
		copie.find(".badnote_form_male").attr('class','badnote_form_male_copy');
		copie.find(".forename").attr('class','forename_copy');
		copie.find(".name").attr('class','name_copy');
		
		copie.find(".badnote_form_fem").attr('class','badnote_form_fem_copy');
		copie.find(".t_forename").attr('class','forename_copy');
		copie.find(".t_name").attr('class','t_name_copy');		
		
		copie.find(".eye_container").attr('class','eye_container_copy');
		copie.find(".eye_male").attr('class','eye_male_copy');
		copie.find(".eye_fem").attr('class','eye_fem_copy');			
		
		var postop_form = Get_position(".badnote_form").top;
		var posleft_form = Get_position(".badnote_form").left;
		copie.css("top",""+postop_form+"px");
		copie.css("left",""+posleft_form+"px");
        copie.appendTo('#badnote');
   
}



// Fonction qui met en capitale la première lettre des inputs prenom et nom du formulaire

function Capitalize(arg) {
$(arg).val($(arg).val().substring(0,1).toUpperCase()+$(arg).val().substring(1,15).toLowerCase());

						}



$(".badnote_form .badnote_form_male .forename").on("keyup", function(e){
	Capitalize(".badnote_form .badnote_form_male .forename");

	var input_val = $(".badnote_form .badnote_form_male .forename").val();
	var val_without_space_inside = input_val.replace(/ (?!$)/g, "");
	if(val_without_space_inside[val_without_space_inside.length-1]==" " && val_without_space_inside.trim() !=""){
		
		$(".badnote_form .badnote_form_male .forename").val(val_without_space_inside.trim());
		if($("#forename_suggestion").text()!="")
		{
			$(".badnote_form .badnote_form_male .forename").val($("#forename_suggestion").text());
			Capitalize(".badnote_form .badnote_form_male .forename");
			$(".badnote_form .badnote_form_male .name").focus();
		}
		else
		{
			if(val_without_space_inside.trim().length>2)
			{
				Capitalize(".badnote_form .badnote_form_male .forename");
				$(".badnote_form .badnote_form_male .name").focus();
			} 
		}
	}
	else if(val_without_space_inside[0] == " " && $("#forename_suggestion").text()!="")
	{
		$(".badnote_form .badnote_form_male .forename").val($("#forename_suggestion").text());
		Capitalize(".badnote_form .badnote_form_male .forename");
		$(".badnote_form .badnote_form_male .name").focus();		
	}

}); 						

$(".badnote_form .badnote_form_male .name").on("keyup", function(e){

	Capitalize(".badnote_form .badnote_form_male .name");
	
	var input_val = $(".badnote_form .badnote_form_male .name").val();
	var val_without_space_inside = input_val.replace(/ (?!$)/g, "");
	if(val_without_space_inside[val_without_space_inside.length-1]==" " && val_without_space_inside.trim() !=""){
		
		$(".badnote_form .badnote_form_male .name").val(val_without_space_inside.trim());
		if($("#name_suggestion").text()!="")
		{
			$(".badnote_form .badnote_form_male .name").val($("#name_suggestion").text());
			Capitalize(".badnote_form .badnote_form_male .name");
			$(".badnote_form .badnote_form_fem .t_forename").focus();
		}
		else
		{
			if(val_without_space_inside.trim().length>2)
			{
				Capitalize(".badnote_form .badnote_form_male .name");
				$(".badnote_form .badnote_form_fem .t_forename").focus();
			} 
		}
	}		
	else if(val_without_space_inside[0] == " " && $("#name_suggestion").text()!="")
	{
		$(".badnote_form .badnote_form_male .name").val($("#name_suggestion").text());
		Capitalize(".badnote_form .badnote_form_male .name");
		$(".badnote_form .badnote_form_fem .t_forename").focus();	
	}
	
}); 						



$(".badnote_form .badnote_form_fem .t_forename").on("keyup", function(e){

	Capitalize(".badnote_form .badnote_form_fem .t_forename");

	
	var input_val = $(".badnote_form .badnote_form_fem .t_forename").val();
	var val_without_space_inside = input_val.replace(/ (?!$)/g, "");
	if(val_without_space_inside[val_without_space_inside.length-1]==" " && val_without_space_inside.trim() !=""){
		
		$(".badnote_form .badnote_form_fem .t_forename").val(val_without_space_inside.trim());
		if($("#t_forename_suggestion").text()!="")
		{
			$(".badnote_form .badnote_form_fem .t_forename").val($("#t_forename_suggestion").text());
			Capitalize(".badnote_form .badnote_form_fem .t_forename");
			$(".badnote_form .badnote_form_fem .t_name").focus();

		}
		else
		{
			if(val_without_space_inside.trim().length>2)
			{
				Capitalize(".badnote_form .badnote_form_fem .t_forename");
				$(".badnote_form .badnote_form_fem .t_name").focus();
			} 
		}
	}
	else if(val_without_space_inside[0] == " " && $("#t_forename_suggestion").text()!="")
	{
		$(".badnote_form .badnote_form_fem .t_forename").val($("#t_forename_suggestion").text());
		Capitalize(".badnote_form .badnote_form_fem .t_forename");
		$(".badnote_form .badnote_form_fem .t_name").focus();
	}
});

$(".badnote_form .badnote_form_fem .t_name").on("keyup", function(e){

	Capitalize(".badnote_form .badnote_form_fem .t_name");

	var input_val = $(".badnote_form .badnote_form_fem .t_name").val();
	var val_without_space_inside = input_val.replace(/ (?!$)/g, "");
	if(val_without_space_inside[val_without_space_inside.length-1]==" " && val_without_space_inside.trim() !=""){
		
		$(".badnote_form .badnote_form_fem .t_name").val(val_without_space_inside.trim());
		if($("#t_name_suggestion").text()!="")
		{
			$(".badnote_form .badnote_form_fem .t_name").val($("#t_name_suggestion").text());
			Capitalize(".badnote_form .badnote_form_fem .t_name");
			$(".badnote_form .badnote_form_fem .t_name").blur();
			Get_name();
		}
		else
		{
			if(val_without_space_inside.trim().length>2)
			{
				Capitalize(".badnote_form .badnote_form_fem .t_name");
				$(".badnote_form .badnote_form_fem .t_name").blur();
				Get_name();

			} 
		}
	}
	else if(val_without_space_inside[0] == " " && $("#t_name_suggestion").text()!="")
	{
			$(".badnote_form .badnote_form_fem .t_name").val($("#t_name_suggestion").text());
			Capitalize(".badnote_form .badnote_form_fem .t_name");
			$(".badnote_form .badnote_form_fem .t_name").blur();
			Get_name();	
	}	
	
});


//Fonction qui change la font de badnote_form

var fonts = ['Arial','Verdana','Georgia','Comic Sans MS','Trebuchet MS','Arial Black','Impact','Courier','Symbol'];
var font = fonts[Math.random()*fonts.length<<0];

function Font_change(arg){
	font = fonts[Math.random()*fonts.length<<0];	
	arg.css("font-family", font);
}


//FONCTION QUI SHUFFLE LA TAILLE DES FONT POUR AVOIR DES NOMS DE TAILLES DIFFERENTES (JUSTE POUR L'ESTHETIQUE)


function Size_random(){
	var name_size_array = [12,16,20,24];
	var name_size = name_size_array[Math.random()*name_size_array.length<<0];	
	return name_size;
}

socket.on('message', function(message) {
                //alert(message);
            })


			

//------------------------------------------------------ PARTIE BADNOTE CONNECTE ---------------------------------------------------------

// FONCTION D'ENVOI DE NOM

// fonction qui trouve l'index d'un élément spécifique dans un array
function Find_index(array, element_key, element){

	var i
	var array_length = array.length;
	//alert(member_data[0]['login']);
	//alert(array_length);
	if(element != ""){
		for(i = 0; i < array_length; ++i){
			if(array[i][element_key] == element){
				return i;
			}
		}
		return (-1);
	}else{
		return (-2); // Cela veut dire que l'id = "", il est vide (donc c'est un nouveau nom)
	}

}


function Check_if_can_send(id, switch_pass){ // switch_pass = 1 s'il s'agit d'un up ou 0 s'il s'agit d'un down
	var id_index
	var id_switch_pass;
	//alert("yes");
	id_index = Find_index(member_data[0].id_name_switch_pass, '_id', id);
	//alert(id_index);
	if(id_index>0 || id_index == 0 ){
		id_switch_pass = member_data[0].id_name_switch_pass[id_index].switch_pass;
		//alert(id_switch_pass);
		if(id_switch_pass == switch_pass){
			var message ="Rank non autorisé !";
			Appear_info_message(message);	
			return (-1);
		}else { // Si id_switch_pass != switch_pass cela veut dire qu'on peut ranker
			return true;
		}
	}else if(id_index<0){ // si id_index = -1 ou -2
		if (id_index == (-2) && switch_pass == 1){ // on authorise (bien sur) à ranker un nom qui n'existe pas encore
			return true;
		}else if(id_index == (-2) && switch_pass == 0){ // on n'autorise pas à unranker un nom qui n'existe pas encore
			var message ="Rank non autorisé !";
			Appear_info_message(message);	
			return (-1);
		}else if(id_index == (-1)){
			return false;
		}
	}
		
}

function Check_what_switch_pass_is(id){ // switch_pass = 1 s'il s'agit d'un up ou 0 s'il s'agit d'un down
	var id_index
	var id_switch_pass;
	//alert("yes");
	id_index = Find_index(member_data[0].id_name_switch_pass, '_id', id);
	//alert(id_index);
	if(id_index>0 || id_index == 0 )
	{
		id_switch_pass = member_data[0].id_name_switch_pass[id_index].switch_pass;
		//alert(id_switch_pass);
		return id_switch_pass
	}
	else
	{
		return false;
	}		
}

var send_name_or_rank_trigger = true;
function Send_name()
{
	if(send_name_or_rank_trigger)
	{
		send_name_or_rank_trigger = false; 
		var id_to_send = $('.badnote_name_data').data('id');
		var	forename_to_send = forename;
		var	name_to_send = name;
		var	t_forename_to_send = t_forename;
		var	t_name_to_send = t_name;
		var font_to_send = font;
		var date_to_send = date;
		var id_autor_to_send = member_data[0]._id;			
		var switch_pass = 1;
		var up_rank;
		var down_rank = 0;
		var check_if_can_send_and_if_knows_name = Check_if_can_send(id_to_send, switch_pass);
		if(check_if_can_send_and_if_knows_name)
		{
			up_rank = 1;
			down_rank = -1;
		}
		else if (check_if_can_send_and_if_knows_name == false)
		{
			up_rank = 1;
		}
        if(check_if_can_send_and_if_knows_name != (-1) && forename_to_send!='' & name_to_send!='' & font_to_send!='' & date_to_send!='' & ajax_today == true)
		{ 	
			var name_data ={  
						id : id_to_send,
						forename : forename_to_send,  
						name : name_to_send,
						t_forename : t_forename_to_send,  
						t_name : t_name_to_send,
						font : font_to_send,
						date : date_to_send,
						id_autor : id_autor_to_send,									
						switch_pass : switch_pass,
						up_rank : up_rank,
						down_rank : down_rank,
						member_knows_name : check_if_can_send_and_if_knows_name		
					};  
			socket.emit('name_data', name_data);	
				
			//alert("name send !");	
				
		}
		send_name_or_rank_trigger = true;
	}
}
	
	
	
// FONCTION DE RECEPTION DE NOM


var forename
var name
var t_forename
var t_name
var	font_male
var font_fem
var posleft_badnote_form
var postop_badnote_form 
var badnote_data_visible = false;
var get_name_trigger = true;
var id_badnote_name_data = ""; // Cette variable stockera le nom NON TRANSPARENT d'une personne inscrite (c'est à dire qui a été marqué plusieurs fois, et donc avec une opacité non transparente)
var array_validation_taxe_dates
	
function Get_name(){
		
		
		if(Array.isArray(member_data) && $(badnote_form).css("display")!="none" && get_name_trigger == true){
			get_name_trigger = false;
			Capitalize(".badnote_form .badnote_form_male .forename");		
			Capitalize(".badnote_form .badnote_form_male .name");	
			Capitalize(".badnote_form .badnote_form_fem .t_forename");	
			Capitalize(".badnote_form .badnote_form_fem .t_name");	
			
			badnote_data_visible = true;
			var badnote_form = ".badnote_form";	
			
			forename = $('.forename').val().trim();
			name = $('.name').val().trim();
			
			t_forename = $('.t_forename').val().trim();
			t_name = $('.t_name').val().trim();
			
			font_male = $('.forename').css("font-family");
			font_fem = $('.t_forename').css("font-family");
			
			var forename_to_get = $('.forename').val().trim();
			var name_to_get = $('.name').val().trim();
			
			var t_forename_to_get = $('.t_forename').val().trim();
			var t_name_to_get = $('.t_name').val().trim();
			var id_autor_to_send = member_data[0]._id;			

			
			var body_width = $("body").width();
			var body_height = $("body").height();
			
			
			posleft_badnote_form = ($("body").width()/2)-($(".badnote_form").width()/2)+45;
			postop_badnote_form = ($("body").height()/2)-($(".badnote_form").height()/2)-150;
			
			if(forename_to_get !="" && name_to_get !="" && t_forename_to_get !="" && t_name_to_get !="" && date!=undefined &&/^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(forename_to_get) && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(name_to_get) && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(t_forename_to_get) && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(t_name_to_get) ){
			 
				if(isMobile()==false){
					Unbind_badnote_form_move();
				}	
		
				$('#badnote').fadeOut("fast", function (){

					Empty_form(".badnote_form",".forename",".name",".t_forename",".t_name");
						
						
						
						
						
					var get_name_data ={  
								forename : forename_to_get,  
								name : name_to_get,
								t_forename : t_forename_to_get,  
								t_name : t_name_to_get,
								id_autor : id_autor_to_send
								};  
					
					socket.emit('get_name_data', get_name_data);
					
				});		
		
						
							
		
					
			}else{get_name_trigger = true; return false;} 
		} 
	
}	
	
	
// partie 2 du Get_name() :

	

	
//Fonction qui insère et organise le code reçu par badnote.js ("docs" dans la fonction précédente) dans des divs que l'on crée 

function Get_name_data(name_data, first_name_insert, count_rank){ // Il ne faut pas confondre Get_name() avec Get_name_data(), ceux sont bien deux fonctions distinctes pour la reception du nom
$("#table_container").css("opacity",1); //on remet les opacités a 1 au cas ou elles seraient restées a 0 par des manipulations précédentes
$("#map_and_tools_of_map").css("opacity",1);
if(first_name_insert){
	Insert_new_name_data(name_data);
	
}else{
	
	Insert_known_name_data(name_data, count_rank);
}
Appear_calendar_this_month(/*name_data, */false);
Put_validation_taxe_dates_in_calendar();
$("#disconnection").css("display","none");
$("#badnote").css("display","none");
$("#badnote_name_data").css("opacity",0);
$("#badnote_name_data").css("display","block");

Refresh_css();
$("#badnote_name_data").fadeTo("fast", 1);
}	



//FONCTION QUI APPELE LES FONCTIONS PRECEDENTES LORSQUE LON CLIQUE SUR LE NOM POUR LE RECEVOIR

function Get_name_calling_function(event){
	if(check_browser()=="firefox" && event.keyCode == 9){
		Get_name();
	}else if(event.keyCode == 13){
		Get_name();
	}
}
	
// FONCTIONS DE RAFRAICHISSEMENT DES DONNEES (NOMS ET HELENES)

function Refresh_data(type_of_data, docs, count_rank){
//alert("so nice !");
//alert(docs[0]["forename"] +" "+docs[0]["name"] +" "+docs.length);

	if(type_of_data == "login" && docs[0]._id == member_data[0]._id){
	//alert("login dooooone");
			member_data = docs;
			Create_array_names_of_this_member(docs[0]["id_name_switch_pass"]);
	} else if(type_of_data == "name" && $(".badnote_name_data").length && forename == docs[0]["forename"] && name == docs[0]["name"] && t_forename == docs[0]["t_forename"] && t_name == docs[0]["t_name"]){
	//alert("name dooooone");
			$('.badnote_name_data, .day_doc_inc').remove();
	
			Insert_known_name_data(docs, count_rank);
			
			Appear_calendar_this_month(/*docs, */true);
			Clear_all_validation_taxe_dates_in_calendar(); //on enlève les anciennes dates (qui apparaissent en jaune dans le calendrier)...
			Put_validation_taxe_dates_in_calendar(); //... pour pouvoir reinsérer les neuves avec cette fonction
			
			
	} 
}

var name_full_male_and_fem;

function Insert_new_name_data(name_data){
		id_badnote_name_data = ""; 	

		$("#badnote_name_data").append('<div class="badnote_name_data" data-id="">'+
			//'<div id="crown">OtEzSaCoUrOnNeAuFoRtOtEzSaCoUrOnNeAuFoRtOtEzSaCoUrOnNeAuFoRt</div>'+
			//'<div id="crown">'+getRandomIntInclusive(100000000, 999999999)+getRandomIntInclusive(100000000, 999999999)+getRandomIntInclusive(100000000, 999999999)+getRandomIntInclusive(100000000, 999999999)+'</div>'+
			'<div class="badnote_male_and_fem_data">'+
				'<div class="badnote_form_male_data" style="font-family:'+font_male+';">'+
					'<div class="forename_data">'+
						'<div class="forename_data_content">'+
							'<img class="eye_male_data eye_data" style="opacity:1"; src="public/images/male_2.svg" alt="male"/>'+
							'<div style="opacity:0.5;">' + name_data[0]["forename"].substring(0, 3) + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="name_data" style="display:inline-block; opacity:0.5;">' + name_data[0]["name"] + '</div>'+
				'</div>'+

				'<div class="badnote_form_fem_data" style="font-family:'+font_fem+';">'+
					'<div class="t_forename_data">'+
						'<div class="t_forename_data_content">'+
							'<img class="eye_fem_data eye_data" style="opacity:1" src="public/images/fem_2.svg" alt="fem"/>'+
							'<div style="opacity:0.5;">' + name_data[0]["t_forename"].substring(0, 3) + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="t_name_data" style="opacity:0.5;">' + name_data[0]["t_name"] + '</div>'+		
				'</div>'+
			'</div>'+	
		'</div>');		
	array_validation_taxe_dates = name_data[0]["validation_taxe_date"];		
	//Set_size_and_position_badnote_name_data();
	//Set_position_crown();	
	$("#badnote").css("cursor","default");
	if(isMobile())
	{
		$(".badnote_name_data").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
			//Generic swipe handler for all directions
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) { 
			  if(direction=="left" && distance>200 && duration <500)
			  {
				Rank($(".badnote_name_data:eq(0)").data('id'), 0); 
			  }
			}
		});
	}
}

function Insert_known_name_data(name_data, count_rank){
	id_badnote_name_data = ""; 
	var i
	var opacity = 1;
	var color = "black";
	var pos_top;
	var pos_left;
	//var crown_or_not = "";
	if(count_rank<3){ // Si le count_rank est inférieur à 3, cela signifie qu'il y a moins que 3 fois plus de rank_up que de rank_down, et il faut donc faire apparaître le nom comme si c'était un nouveau nom car ce sont les règles de mon site.
		count_rank = 0;
		opacity=0.5;
		//crown_or_not = '<div id="crown">otezsacouronneaufortotezsacouronneaufortotezsacouronneaufort</div>'
		//crown_or_not = '<div id="crown">OtEzSaCoUrOnNeAuFoRtOtEzSaCoUrOnNeAuFoRtOtEzSaCoUrOnNeAuFoRt</div>'
		//crown_or_not = '<div id="crown">'+getRandomIntInclusive(100000000, 999999999)+getRandomIntInclusive(100000000, 999999999)+getRandomIntInclusive(100000000, 999999999)+getRandomIntInclusive(100000000, 999999999)+'</div>';
	}/*else if(count_rank>4){
		color = "yellow";
	}*/
	if(Check_what_switch_pass_is(name_data[0]["_id"]) == 1)
	{
		color = "yellow";
		opacity=1;
	}
	for(i=0; i<count_rank+1; i++){
		$("#badnote_name_data").append('<div class="badnote_name_data" data-id="' + name_data[0]["_id"] + '">'+
			//crown_or_not+
			'<div class="badnote_male_and_fem_data">'+
				'<div class="badnote_form_male_data" style="color:'+color+'; font-family:'+font_male+';">'+				
					'<div class="forename_data">'+
						'<div class="forename_data_content">'+
							'<img class="eye_male_data eye_data" src="public/images/male_2.svg" alt="male"/>'+
							'<div style="opacity:'+opacity+';">' + name_data[0]["forename"].substring(0, 3) + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="name_data" style="opacity:'+opacity+';">' + name_data[0]["name"] + '</div>'+
				'</div>'+

				'<div class="badnote_form_fem_data" style="color:'+color+'; font-family:'+font_fem+';">'+	
					'<div class="t_forename_data">'+
						'<div class="t_forename_data_content">'+
							'<img class="eye_fem_data eye_data" src="public/images/fem_2.svg" alt="fem"/>'+
							'<div style="opacity:'+opacity+';">' + name_data[0]["t_forename"].substring(0, 3) + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="t_name_data" style="opacity:'+opacity+';">' + name_data[0]["t_name"] + '</div>'+			
				'</div>'+
			'</div>'+	
			'<div class="date_data" style="display:none;">' + name_data[0]["date"][i] + '</div>'+ 
		'</div>');
	
		if(count_rank>3){	// Si le nom s'affiche de manière multiple, avec l'opacité à 1, alors on change les Font de chaque nom affiché pour un effet visuel de plusieurs font qui se superposent	
			Font_change($(".badnote_name_data .badnote_male_and_fem_data .badnote_form_male_data:eq("+i+")"));
			Font_change($(".badnote_name_data .badnote_male_and_fem_data .badnote_form_fem_data:eq("+i+")"));
			$(".badnote_name_data .badnote_male_and_fem_data .badnote_form_male_data:eq("+i+")").css("font-size", Size_random()+"px");
			$(".badnote_name_data .badnote_male_and_fem_data .badnote_form_fem_data:eq("+i+")").css("font-size", Size_random()+"px");
		}
	
	}

	array_validation_taxe_dates = name_data[0]["validation_taxe_date"];

	id_badnote_name_data = $(".badnote_name_data").data('id'); // on stocke l'ID du nom dans cette variable pour faciliter l'utilisation de l'ID du nom	
	//on ajoute les images :


	$(".eye_male_data").last().css("opacity",1);
	$(".eye_fem_data").last().css("opacity",1);




	//Set_size_and_position_badnote_name_data();
	$("#badnote").css("cursor","default");
	if(isMobile())
	{
		$(".badnote_name_data").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
		//Generic swipe handler for all directions
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) { 
		  if(direction=="left" && distance>200 && duration <500)
		  {
			Rank($(".badnote_name_data:eq(0)").data('id'), 0); 
		  }
		}
	  });
	}

}

//FONCTION D'ENVOI DU NOM
var timer_long_click;
$("#badnote_name_data").on("mousedown", ".badnote_name_data", function(){
    timer_long_click = setTimeout(function(){
			Send_name();  
			
    },700);
}).on("mouseup mouseleave",function(){
    clearTimeout(timer_long_click);
});


//ON AJOUTE LES SOCKETS	
	
socket.on("get_name_data", Get_name_data);
socket.on("refresh_login_data", Refresh_login_data);
socket.on("refresh_data", Refresh_data);
	
//FONCTION QUI EFFACE LES RESULTATS OBTENUS PAR Get_name() AVEC UN LONG CLICK



	


function Disappear_badnote_name_data(pos_left, pos_top){
	if($("#badnote_name_data").is(':visible'))
	{	
		$("#table_container").css("display","block");
		$(".eye_container").css("opacity","1");

		Set_position('.badnote_form', (pos_left-1), (pos_top-15));
		$('.badnote_form').css("opacity","1");

		Close_map();
		Clear_all_validation_taxe_dates_in_calendar();
		$('#badnote_name_data').fadeOut(500, function ()
		{
			$("table").css("display","none");
			$("#badnote").css("cursor","text");
			$('.badnote_name_data, .day_doc_inc').remove();
			Clear_array_week();
			id_badnote_name_data = "";
			badnote_data_visible = false;
			get_name_trigger = true; // On permet à nouveau de lancer la fonction Get_name
			send_name_or_rank_trigger = true; // on le remet a true au cas ou
			array_validation_taxe = []; //on vide le tableau des validations de taxe des alliés
			validation_taxe = false; //on remet le bool de possibilité de validation de taxe à sa valeur par defaut false
			close_validation_for_this_name = false; // on remet la variable de validation du nom (signalant que la Taxe a été faite ce jour la) à false, au cas ou elle aurait servi pour le nom précédent (on la remet à false pour l'utiliser par la suite si on veut valider un autre nom)
			validation_taxe_socket_trigger = true; //on remet la valeur par defaut du switcher qui bloque ou permet d'executer les fonctions de validation
			//$("#disconnection").css("display","block");
			$("#badnote").css("display","block");
			
			Disapear_badnote_form();
			$("input").blur();
			/*if(isMobile()==false)
			{
				Unbind_badnote_form_move();
				$('.forename').focus(); // en effet j'ai choisi de ne remettre le focus après un quit de nom que pour la version ordi, juste comme ça... 
			}*/		
		});
		if($("#map_and_tools_of_map").css("display") == "block")
		{
			$("#map_and_tools_of_map").fadeOut(500);
		}
			
	}
}

//FONCTION QUI VIDE LE CONTENU DES CHAMPS D'UN FORM	
	
function Empty_form(a,b,c,d,e){
	
	$(a).find(b).val("");
	$(a).find(c).val("");
	$(a).find(d).val("");
	$(a).find(e).val("");
	
}
	



// FONCTION QUI FERME LE GET NAME
var timer_long_click_2;

if(isMobile()) //si ce n'est un mobile on ferme le badnote_name_data en appuyant a droite du badnote_name_data
{
	$("#badnote_name_data").on("mousedown", function(e){
    timer_long_click_2 = setTimeout(function(){
		var pos_x = Get_position(".badnote_name_data").left-20;
		var table_container_or_map
		if($("#table_container").is(':visible'))
		{
			table_container_or_map = "#table_container";
		}
		else
		{
			table_container_or_map = "#map";
		}
		
		var pos_y = Get_position(table_container_or_map).top+$(table_container_or_map).height();
		if(e.pageX < pos_x && e.pageY < pos_y){
			Disappear_badnote_name_data(e.pageX, e.pageY);
		}
		},700);
	}).on("mouseup mouseleave",function(){
    clearTimeout(timer_long_click_2);
	});
}
else //si ce n'est pas un mobile on ferme le badnote_name_data en cliquant a gauche du badnote_name_data
{
	$("#badnote_name_data").on("mousedown", function(e){
		timer_long_click_2 = setTimeout(function(){
			var pos_x = Get_position(".badnote_name_data").left-20;
			if(e.pageX < pos_x){
				Disappear_badnote_name_data(e.pageX, e.pageY);
			}
		},700);
	}).on("mouseup mouseleave",function(){
		clearTimeout(timer_long_click_2);
	});	
}


// FONCTION QUI RENVOI A L'ECRAN D'ACCUEIL
if(isMobile())
{
	var timer_long_click_3;
	$("#badnote").on("mousedown", function(e){
		timer_long_click_3 = setTimeout(function(){
			var url_0 = window.location.href;
			var url = Slice_string(url_0, "/member_space.html");
			window.location.replace(url+"/index.html");	

		},700);
	}).on("mouseup mouseleave",function(){
		clearTimeout(timer_long_click_3);
	});	
}




	
//FONCTIONS DE DATE ET DE JOUR


var lundi= false;
var mardi= false;
var mercredi= false;
var jeudi= false;
var vendredi= false;
var samedi= false;
var dimanche= false;

var day_week_nbr
var day_week_txt
var month_txt
var date

var day
var month
var year

var hour
var min
var sec

var date_timeapi_format



var ajax_today = true;

//POUR LA VERSION LOCALE (ON NE DEMANDE PAS REELEMENT LA DATE POUR NE PAS AVOIR A ATTENDRE TIMEAPI)
/*
function Ajax_today(){
if(ajax_today){
$("#loading_message").css("display","block");

$("#loading_message").css("display","none");
date_timeapi_format = "Tue, 27 Sep 2016 19:50:49 GMT";	
day= date_timeapi_format.substring(5,7);
month= date_timeapi_format.substring(8,11);
year= date_timeapi_format.substring(12,16);
hour= date_timeapi_format.substring(17,19);   
min= date_timeapi_format.substring(20,22);   
sec= date_timeapi_format.substring(23,25);  



Today(); }

}
*/
//POUR LA VERSION EN LIGNE(ON FAIT LA REQUETE TIMEAPI)

function Ajax_today(){
if(ajax_today){
$("#loading_message").css("display","block");
$.ajax({
  url: 'http://www.timeapi.org/utc/now.json?callback=myCallback',
  type: 'GET',
  jsonpCallback: 'callback',
  dataType: 'jsonp',
  success: function(data) { 
$("#loading_message").css("display","none");
date_timeapi_format =(new Date(data.dateString)).toUTCString();
day= date_timeapi_format.substring(5,7);
month= date_timeapi_format.substring(8,11);
year= date_timeapi_format.substring(12,16);
hour= date_timeapi_format.substring(17,19);   
min= date_timeapi_format.substring(20,22);   
sec= date_timeapi_format.substring(23,25);  



Today(); },
    error :  function(xhr, textStatus, errorThrown ) {
         if (textStatus == 'timeout') {
            this.tryCount++;
             if (this.tryCount <= this.retryLimit) {
                //try again
                $.ajax(this);
				return;
             }            
           return;
         }
         if (xhr.status == 500) {
            //handle error
			 $.ajax(this);
         } else {
            //handle error
			 $.ajax(this);
         }
    }
  
});

}
}





//Fonction de jour


    function Today(){
if(month== "Jan")
{month="01"; month_txt="January";}
if(month== "Feb")
{month="02"; month_txt="February";}
if(month== "Mar")
{month="03"; month_txt="March";}
if(month== "Apr")
{month="04"; month_txt="April";}
if(month== "May")
{month="05"; month_txt="May";}
if(month== "Jun")
{month="06"; month_txt="June";}
if(month== "Jul")
{month="07"; month_txt="July";}
if(month== "Aug")
{month="08"; month_txt="August";}
if(month== "Sep")
{month="09"; month_txt="September";}
if(month== "Oct")
{month="10"; month_txt="October";}
if(month== "Nov")
{month="11"; month_txt="November";}
if(month== "Dec")
{month="12"; month_txt="December";}		  
var lun= "Mon";
var mar= "Tue";
var mer= "Wed";
var jeu= "Thu";
var ven= "Fri";
var sam= "Sat";
var dim= "Sun";

if(date_timeapi_format.indexOf(lun) != -1){
lundi=true;
day_week_txt = "lundi";
day_week_nbr = 1;
}
if(date_timeapi_format.indexOf(mar) != -1){
mardi=true;
day_week_txt = "mardi";
day_week_nbr = 2;
}
if(date_timeapi_format.indexOf(mer) != -1){
mercredi=true;
day_week_txt = "mercredi";
day_week_nbr = 3;
}
if(date_timeapi_format.indexOf(jeu) != -1){
jeudi=true;
day_week_txt = "jeudi";
day_week_nbr = 4;
}
if(date_timeapi_format.indexOf(ven) != -1){
vendredi=true;
day_week_txt = "vendredi";
day_week_nbr = 5;
}
if(date_timeapi_format.indexOf(sam) != -1){
samedi=true;
day_week_txt = "samedi";
day_week_nbr = 6;
}
if(date_timeapi_format.indexOf(dim) != -1){
dimanche=true;
day_week_txt = "dimanche";
day_week_nbr = 7;
}

day_int = parseInt(day); // Les day_int et year_int seront utilisés dans le calendrier

Put_in_calendar(); //  On remplit le calendrier maintenant que les jours, mois et années sont connus
date = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
connect_disconnect_trigger = true;
     	}				
		
		
var timer_ajax = null; 
function Start_ajax_today() { // On active cette fonction si l'on veut que la fonction Ajax_today se repète. Pour l'instant, je n'utilise pas cette fonction car je veux qu'elle ne s'active qu'une fois
		
	timer_ajax = setInterval( Ajax_today, 10000);
}
		
Ajax_today();










//FONCTION DE RANK

function Rank(id_to_send, switch_pass)
{
	if(send_name_or_rank_trigger)
	{
		
		send_name_or_rank_trigger = false;
		var id_autor_to_send = member_data[0]._id;			
		var id_name = $('.badnote_name_data').data('id');
		var check_if_can_send_and_if_knows_name = Check_if_can_send(id_to_send, switch_pass);
		var up_rank = 0;
		var down_rank ;
		if(check_if_can_send_and_if_knows_name)
		{
			down_rank = 1;
			up_rank = -1;
		}
		else if (check_if_can_send_and_if_knows_name == false)
		{
			down_rank = 1;
		}
		//alert("check_if_can_send_and_if_knows_name : "+check_if_can_send_and_if_knows_name);			
		if(check_if_can_send_and_if_knows_name  != (-1))
		{
			var name_data = {
						id:id_to_send,
						up_rank:up_rank,
						down_rank:down_rank,
						id_autor:id_autor_to_send,
						id_name:id_name,
						switch_pass:switch_pass,
						member_knows_name:check_if_can_send_and_if_knows_name 
					};
			socket.emit("name_data", name_data);

		}
	
		send_name_or_rank_trigger = true;
	}
}

//FONCTION DU CLICK SUR LE BOUTON D'UNRANK D'UN NAME


$("#badnote_name_data").on("dblclick", ".badnote_name_data", function(){
	Rank($(this).data('id'), 0);
});






//------------------------------------------------------ DATE ---------------------------------------------------------




function Get_date(arg){
	
var day= arg.substring(8,10);
var month= arg.substring(5,7);
var year= arg.substring(0,4);
	
var date = new Date(year,month-1,day);
var weekdays_txt = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
var weekdays_nbr = [7, 1, 2, 3, 4, 5, 6];


var day_week_txt = weekdays_txt[date.getDay()];
var day_week_nbr = weekdays_nbr[date.getDay()];
var month = date.getMonth();
var year = date.getYear();
	
		
    return {date: date, day_week_txt: day_week_txt, day_week_nbr: day_week_nbr, month: month, year: year};
}


// Fonctions qui donne la durée (différence) entre deux dates

function Diff_date_days(d1,d2){
	var WNbJours = d2.getTime() - d1.getTime();
	return Math.ceil(WNbJours/(1000*60*60*24));
}	

function dateDiff(d1, d2){
  var WNbJours = d2.getTime() - d1.getTime();
	return Math.ceil(WNbJours/(1000*60*60));
}

var array_week_0 = [0,0,0,0,0,0,0];
var array_week_1 = [0,0,0,0,0,0,0];
var array_week_2 = [0,0,0,0,0,0,0];
var array_week_3 = [0,0,0,0,0,0,0];

var array_week_day = [array_week_0, array_week_1, array_week_2, array_week_3];

function Clear_array_week(){
	
array_week_0 = [0,0,0,0,0,0,0];
array_week_1 = [0,0,0,0,0,0,0];
array_week_2 = [0,0,0,0,0,0,0];
array_week_3 = [0,0,0,0,0,0,0];

array_week_day = [array_week_0, array_week_1, array_week_2, array_week_3];	
	
}












//------------------------------------------------------ CALENDRIER ---------------------------------------------------------


function Put_in_calendar(){

 
	// names of months and week days.
	
	var calendar_years = ["2005","2006","2007","2008","2009","2010","2011","2012","2013","2014","2015"];
	var calendar_months = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
	var calendar_days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
	var day_per_month = ["31", "","31","30","31","30","31","31","30","31","30","31"]; 
	var i
	var i1
	var i2
	var i3
	var this_year = 2014; // On commence en effet en 2005
	var this_month
	var month_nbr_days
	var m = 0; // L'indice de le la clef d'array du mois en question et du nombre de jours pour ce mois
	var d = 2; // L'indice qui compte les jours. On commence à d = 2 car le premier jour est inscrit manuellement (voir plus bas), et c'est le 1 (samedi 1 janvier 2005). Le d sert dans le remplissage automatique qui se fait donc après l'entrée manuelle du 1er jour (samedi 1 janvier 2005).
	var $this = $(this);
	var i_tr = 0;
	var i_td = 6;
	var last_first_day_index
	var prev_month_nbr_days
	
	
	for (i2=0; i2<50; i2++){
	
		if(i2==0){
		
		$("#table_container").prepend(
			"<table id='"+i2+"' border-collapse: collapse;  cellspacing='2px' cellpadding='2px;' rules='all' class = 'January 2005' data-month='January' data-month_days_nbr='31' data-year='2005'>"  
				+"<tr>"			
					+"<th class='button_2'>L</th>"
					+"<th class='button_2'>M</th>"
					+"<th class='button_2'>M</th>"
					+"<th class='button_2'>J</th>"
					+"<th class='button_2'>V</th>"
					+"<th class='button_2'>S</th>"
					+"<th class='button_2'>D</th>"
				+"</tr>"
				+"<caption>"/*
				    +"<div id='previous_month_button' class='button_2' style='display:inline-block; width:15%; float:left; text-align: left; padding-left:5%;' ><</div>"
					+"<div id='table_month' style='display:inline-block; width:23%; text-align: left;'>Janvier</div>"
					+"<div id='table_year' style='display:inline-block; width:23%; text-align: right;'>2005</div>"
					+"<div id='next_month_button' class='button_2' style='display:inline-block; width:15%; float:right; text-align: right; padding-right:5%;'>></div>"
					*/
				    +"<div id='previous_month_button' class='button_2' style='display:inline-block; width:23%; float:left;' ><</div>"
					+"<div id='table_month' style='display:inline-block; width:23%; text-align: left;'>Janvier</div>"
					+"<div id='table_year' style='display:inline-block; width:23%; text-align: right;'>2005</div>"
					+"<div id='next_month_button' class='button_2' style='display:inline-block; width:23%; float:right;'>></div>"
				+"</caption>"	
			+"</table>"); 
		
		for (i=0; i<6; i++){
			$("table").append(
				"<tr class='calendar_day'></tr>"
			);
		}
		var $tr = $("table tr.calendar_day");
		$tr.each(function(){
			for (i1=0; i1<7; i1++){
				$(this).append("<td class='button_2'></td>");
			}
		});
		$("table:eq(0) tr.calendar_day:eq(0) td:eq(5)").text("1"); // On place le premier jour (samedi 1er janvier 2005) qui servira de point de départ pour placer les autres jours dans le calendrier

		
		
		
		
		}
		if(m > 11){ // si m a dépassé le nombre de mois maximum dans une année, soit plus de 12 mois 
			m =0;
			this_year = parseInt($("#table_container table:last-child").data("year"))+1;
		}
		
	

		//Determing if the month is February and if February (28,or 29) 
		
		
		
		if ((this_year%100!=0) && (this_year%4==0) || (this_year%400==0)){
			day_per_month[1] = "29";
		}else{
			day_per_month[1] = "28";
		}
		
		
		
		this_month = calendar_months[m];
		month_nbr_days = parseInt(day_per_month[m]);
		
		
		
		if(i2>0){ // On commence les clonages après le premier tour, car durant le premier tour, on crée déjà le premier table séparément
			$("table:last-child").clone().appendTo("#table_container").removeClass().addClass( ""+this_month+" "+this_year+"" ).data("month", this_month).data("month_days_nbr", month_nbr_days).data("year", this_year);  // On recopie juste le dernier, sinon on recopiera a chaque fois tous les tables crées et cela fera un clonage exponentiel infini et donc un gros bug. Par ailleurs, on insère les informations dans des classes en plus des attributs data- car je n'arrive pas a selectionner un objet par son attribut data- ! Je laisse donc les data- par principe mais c'est par les classes que je selectionnerai ces éléments via le mois ou l'année
			$("table:eq("+i2+")").attr("id",i2);
			$("table:eq("+i2+") #table_month").text(""+this_month+"");
			$("table:eq("+i2+") #table_year").text(""+this_year+"");
		}
		
		
		
		
		
		// On replace la position de depart (i_tr et i_td) du premier du mois pour ce mois-ci :
		if(i2>0){
		
			
			last_first_day_index = $("table:eq("+(i2-1)+") td").filter(function() {
										return $(this).text() === '1';
									}).last().index();	
			
			i_td = last_first_day_index;
			
			// On remplit aussi les cases vides au début de ce mois-ci par les dernières cases du mois précédent :
			
			prev_month_nbr_days = $("table:eq("+(i2-1)+")").data('month_days_nbr');
		
			for(i3=0; i3<i_td+1; i3++){
			
				$("table:eq("+i2+") tr.calendar_day:eq(0) td:eq("+(i_td-i3)+")").text(prev_month_nbr_days-i3+1);
				
			}

		
		}
		
		
		
		
		
		
	
		var $this_tr = $("table:eq("+i2+") tr.calendar_day");
		$this_tr.each(function(i){
			if(i>i_tr || i==i_tr){
				$(this).children("td").each(function(i){
					if(i>i_td || i==i_td ){
						if(d>month_nbr_days){ // si d a dépassé le nombre de jours maximum de ce mois-ci 
							d =1;
						}
						i_tr = -1;
						i_td = -1;
						$(this).text(d);
						d++;
					}
				});
			}
		});
		d =1;	
		
		
		var last_first = $("table:eq("+i2+") tr.calendar_day td").filter(function() {
										return $(this).text() === '1';
									}).last();
									
		var last_first_tr_index = last_first.parent().index(); 
		
		var last_first_td_index = last_first.index(); 
						



		var first_first = $("table:eq("+i2+") tr.calendar_day td").filter(function() {
										return $(this).text() === '1';
									}).first();
									
		var first_first_tr_index = first_first.parent().index(); 
		
		var first_first_td_index = first_first.index(); 

						
		
		$("table:eq("+i2+") td").css("color", "black"); //On remet toutes les td à leur couleur d'origine (noire)...	
		
		$( "table:eq("+i2+") tr.calendar_day:eq("+(first_first_tr_index-1)+") td:eq("+first_first_td_index+")" ).prevAll("td").css("color",'rgb(128, 128, 128)'); //... avant de colorer en gris les jours du mois précédent...
		
		$( "table:eq("+i2+") tr.calendar_day:eq("+(last_first_tr_index-1)+") td:eq("+last_first_td_index+")" ).nextAll("td").addBack().css("color",'rgb(128, 128, 128)'); //... et du mois suivant avec ces deux lignes de code
		$( "table:eq("+i2+") tr.calendar_day:eq("+last_first_tr_index+") td").nextAll("tr.calendar_day td").addBack().css("color",'rgb(128, 128, 128)');

		
		
		
		
		
		m++;

		
	
	}
	
Change_button_hover_for_mobile_and_no_mobile();
Refresh_css();	
}




function Put_class_to_grey_td(element){
	
	var $element = $(element);
	var $prev_element = $(element).prev("table");
	var $next_element = $(element).next("table");
	var table_td_length = $element.find("td").length;
	var i
	// POUR LA TABLE PRESENTE
	if(!$element.find("td:eq(17)").hasClass("td_this_month")) //pourquoi le td numero 17 ? car le 18 eme jour (soit le td numero 17), ne peut pas avoir la classe td_prev_month ou td_next_month mais uniquement td_this_month car 17 est un jour au milieu du mois. Aussi, si le 18 eme jour a la class td_this_month, alors cela veut dire que la fonction Put_class_to_grey_td a deja été attribuée pour cette table et qu'il n'est donc pas nécessaire de la réexecuter
	{
	for(i=0; i<table_td_length; i++){
		
		if($element.find("td:eq("+i+")").css("color")=== 'rgb(128, 128, 128)')
		{
			if(i < 14)// //  i < 14 : pour ne compter que les premiers jours en gris du mois suivant, et pas les mois en gris à la fin du mois suivant 
			{
				$element.find("td:eq("+i+")").addClass("td_prev_month"); 
			}
			else if(i > 27)// i > 27 : pour ne compter que les derniers jours en gris du mois précédent, et pas les mois en gris au début du mois précédent
			{
				$element.find("td:eq("+i+")").addClass("td_next_month"); 
			}
		}
		else
		{
			$element.find("td:eq("+i+")").addClass("td_this_month");
		}		
	}
	
	//POUR LA TABLE PRECEDENTE
	for(i=0; i<table_td_length; i++){
		
		if($prev_element.find("td:eq("+i+")").css("color")=== 'rgb(128, 128, 128)')
		{
		if(i > 27)// i > 27 : pour ne compter que les derniers jours en gris du mois précédent, et pas les mois en gris au début du mois précédent
			{
				$prev_element.find("td:eq("+i+")").addClass("td_next_month"); 
			}
		}
		else
		{
			$prev_element.find("td:eq("+i+")").addClass("td_this_month");
		}		
	}
	
	//POUR LA TABLE SUIVANTE
	for(i=0; i<table_td_length; i++){
		
		if($next_element.find("td:eq("+i+")").css("color")=== 'rgb(128, 128, 128)')
		{
			if(i < 14)// //  i < 14 : pour ne compter que les premiers jours en gris du mois suivant, et pas les mois en gris à la fin du mois suivant 
			{
				$next_element.find("td:eq("+i+")").addClass("td_prev_month"); 
			}	
		}
	
	}
	}
}

function Appear_calendar_this_month(/*docs, */refresh){
		
		if(refresh == false){	
			var this_table = "."+month_txt+"."+year+"";
			Put_class_to_grey_td(this_table);
			
			$(this_table).find("td.td_this_month").filter(function() {
											return $(this).text() == day_int;
											
									}).css("font-weight","bold").addClass("td_today"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier
									
			$(this_table).prev("table").find("td.td_next_month").filter(function() {
											return $(this).text() == day_int;
									}).css("font-weight","bold").addClass("td_today"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois précédent (parmi les jours en gris)

			$(this_table).next("table").find("td.td_prev_month").filter(function() {
											return $(this).text() == day_int;
									}).css("font-weight","bold").addClass("td_today"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois suivant (parmi les jours en gris)										
			$(this_table).css("display","block"); // On sélectionne par les class et non par les attributs data car je n'arrive pas a selectionner avec les attributs data, même si ca aurait été plus propre avec les attributs data...
			
		}	
}
			

$.fn.Target_text = function() { // Fonction pour obtenir le text d'une div et sans celui de ses enfants
    var str = '';

    this.contents().each(function() {
        if (this.nodeType == 3) {
            str += this.textContent || this.innerText || '';
        }
    });

    return str;
};



$("#table_container").on("click", '#previous_month_button', function(){
var previous_month = parseInt($(this).parent().parent().attr('id')) - 1;
if(previous_month>-1){
	$($(this).parent().parent()).css("display","none");
	$('table#'+previous_month+'').css("display","block");
}
});

$("#table_container").on("click", '#next_month_button', function(){
var next_month = parseInt($(this).parent().parent().attr('id')) + 1;
var $this_table_id =  parseInt($(this).parent().parent().attr('id'));
var last_table_id = parseInt($('#table_container').children('table').last().attr('id'));
if($this_table_id < last_table_id){
$($(this).parent().parent()).css("display","none");
$('table#'+next_month+'').css("display","block");

}
});


var month_nbr_txt_array={
    "01": "January",
    "02": "February",
	"03": "March",
    "04": "April",
	"05": "May",
    "06": "June",
	"07": "July",
    "08": "August",
	"09": "September",
    "10": "October",
	"11": "November",
    "12": "December"
};

function Month_nbr_to_txt(arg){

	return month_nbr_txt_array[arg];

}

function Remove_first_zero(arg){

	if(arg.charAt(0) == "0"){
		var arg_2 = arg.substring(1,2);
		return arg_2 ;
	} else {
		return arg;
	}

}


//FONCTION POUR PLACER LES VALIDATION DE TAXE DANS LES JOURS DU CALENDRIER DEPUIS LE TABLEAU array_validation_taxe_dates


function Put_validation_taxe_dates_in_calendar()
{		
		var array_validation_taxe_dates_length = array_validation_taxe_dates.length;
		if(array_validation_taxe_dates_length>0)
		{
		var i
		for(i=0; i<array_validation_taxe_dates_length ; i++)
		{
			var this_validation_taxe_date = array_validation_taxe_dates[i];
			var day_validation_taxe_int = parseInt(this_validation_taxe_date.substring(8,10));
			var month_validation_taxe_txt=  Month_nbr_to_txt(this_validation_taxe_date.substring(5,7));
			var year_validation_taxe= this_validation_taxe_date.substring(0,4);		

			
				var this_table = "."+month_validation_taxe_txt+"."+year_validation_taxe+"";
				Put_class_to_grey_td(this_table);
				
				$(this_table).find("td.td_this_month").filter(function() {
												return $(this).text() == day_validation_taxe_int;
												
										}).css("color","yellow").addClass("validation_taxe_day"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier
										
				$(this_table).prev("table").find("td.td_next_month").filter(function() {
												return $(this).text() == day_validation_taxe_int;
										}).css("color","yellow").addClass("validation_taxe_day"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois précédent (parmi les jours en gris)

				$(this_table).next("table").find("td.td_prev_month").filter(function() {
												return $(this).text() == day_validation_taxe_int;
										}).css("color","yellow").addClass("validation_taxe_day"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois suivant (parmi les jours en gris)										
				
			
		}
	}

}

function Clear_all_validation_taxe_dates_in_calendar()
{
		var array_validation_taxe_dates_length = array_validation_taxe_dates.length;
		if(array_validation_taxe_dates_length>0)
		{
		var i
		for(i=0; i<array_validation_taxe_dates_length ; i++)
		{
			var this_validation_taxe_date = array_validation_taxe_dates[i];
			var day_validation_taxe_int = parseInt(this_validation_taxe_date.substring(8,10));
			var month_validation_taxe_txt=  Month_nbr_to_txt(this_validation_taxe_date.substring(5,7));
			var year_validation_taxe= this_validation_taxe_date.substring(0,4);		

			
				var this_table = "."+month_validation_taxe_txt+"."+year_validation_taxe+"";
				Put_class_to_grey_td(this_table);
				
				$(this_table).find("td.td_this_month").filter(function() {
												return $(this).text() == day_validation_taxe_int;
												
										}).css("color","black"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier
										
				$(this_table).prev("table").find("td.td_next_month").filter(function() {
												return $(this).text() == day_validation_taxe_int;
										}).css("color","rgb(128, 128, 128)"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois précédent (parmi les jours en gris)

				$(this_table).next("table").find("td.td_prev_month").filter(function() {
												return $(this).text() == day_validation_taxe_int;
										}).css("color","rgb(128, 128, 128)"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois suivant (parmi les jours en gris)										
				
			
		}
	}
}

//----------------------------------------------------------- PARTIE GEOLOCALISATION ---------------------------------------------------------


function Check_if_array_contains(array, item){
	
	var array_length = array.length;
	var i
	for(i=0; i<array_length; i++){
		
		if(array[i]==item){
			return true;
		}
		
	}
	return false;
	
}




// Fonction qui enlève une valeur d'un tableau
function Remove_from_array(array, item){
	
	var i = array.indexOf(item);
	if(i != -1) {
		array.splice(i,1);
	}
	
}

// Fonction qui vérifie si un objet est vide
function isEmptyObject(obj) {
    var name;
    for (name in obj) {
        return false;
    }
    return true;
}


// Fonction qui compte les elements dun array associatif
function Count_element_of_associative_array(array)
{
	var i=0; 
	for (var key in array) 
	{ 
	i++;
	}
	return i
}

// Fonction qui verifie si un array associatif contient un element en particulier

function Check_if_associative_array_contains_element(associative_array, element)
{
	var bool = false;
	
	if(Length_of_associative_array(associative_array)!=0)
	{
		for(name in associative_array) // j'ai bien mis "name" et non le traditionnel "key", car le key pose probleme comme s'il était confondu avec le key d'autres fonctions (par exemple, ce bug est présent dans la fonction Create_or_update_enemy_markers(enemies_positions))
		{
			if (name== element)
			{
				bool = true;
				return bool;
			}
		}
	}
	return bool;
}




$("body").on("keyup", function(e){
	if($(".badnote_name_data").length)
	{
		if($("#map_and_tools_of_map").is(":hidden"))
		{
			if(e.keyCode == 69 && can_switch_table_container_map_to_map_and_tools_of_map) //e
			{
				can_switch_table_container_map_to_map_and_tools_of_map = false;
				ally_name_of_polyline_at_screen = login;
				$("#table_container").fadeTo("fast", 0, function(){
					$("#table_container").css("display","none");
					$("#map_and_tools_of_map").css("opacity",0);
					$("#map_and_tools_of_map").css("display","block");
					initMap();
					Refresh_css();
					Send_my_position_and_my_enemies_positions();
					$("#map_and_tools_of_map").fadeTo("fast", 1);
					// les quatre lignes de code suivantes peuvent paraitre inutiles (car il s'agit d'activer le bouton d'unite_name_input alors que celui-ci est encore vide) mais	il le faut pour que la carte se charge bien. Pourquoi ? je sais pas
					var e = jQuery.Event("keydown");
					e.which = 13; // # Some key code value
					e.keyCode = 13;
					$("#unite_name_input").trigger(e);		
					can_switch_table_container_map_to_map_and_tools_of_map = true;
				});
			}
		}
		else
		{
			if(e.keyCode == 69 && can_switch_table_container_map_to_map_and_tools_of_map)
			{	
				can_switch_table_container_map_to_map_and_tools_of_map = false;
				$("#map_and_tools_of_map").fadeTo("fast", 0, function(){	
					Close_map();
					$("#map_and_tools_of_map").css("display","none");
					$("#table_container").css("display","block");
					Refresh_css();
					$("#table_container").fadeTo("fast", 1);
					can_switch_table_container_map_to_map_and_tools_of_map = true;
				});
			}
		}
	}
});



//FONCTION DE CREATION DE MAP
var map=0;
var my_marker=0;
var ally_markers = [];
var enemy_markers = [];
var polylines = []; //en premier indice on enregistre les coordonnées lat et lng (associé au marker), et en deuxieme indice on enregistre l'objet polyline (associé au marker) lui meme
var polylines_from_ally = []; //les polylines des alliés
var name_target
var enemy_selection_mode = false;

function initMap() {

	name_target = $("#badnote_name_data").find(".forename_data:eq(0)").text();
	if(map==0)
	{
  // Create a map object and specify the DOM element for display.
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat:  34.0132500, lng: -6.8325500}, //coordonnées de rabat
    scrollwheel: true,
    zoom: 8
  });

  map.addListener('click', function(event) {

    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
	var latlng = new google.maps.LatLng(lat, lng);
	
	if(enemy_selection_mode) //si on est dans ce mode, le click crée un ennemi à l'endroit du click...
	{
		var enemy_markers_length = Length_of_associative_array(enemy_markers);
		Create_marker(1, new Date().getUTCMilliseconds(), lat, lng, "", true);
		Send_my_position_and_my_enemies_positions(); //on envoit la position du nouvel ennemi (et aussi sa propre position car j'ai mis les deux dans la meme fonction...)
	}
	/*
	else//...sinon elle deplace la cible a l'endroit du click
	{
		enemy_markers[name_target].setPosition(latlng);
	}*/
	
	else//...dans la version actuelle le click position notre marker et non la cible
	{
		var my_marker_0_lat_lng = my_marker[0].getPosition();
		var my_marker_1_lat_lng = my_marker[2].getPosition();
		if(my_marker_0_lat_lng == my_marker_1_lat_lng)
		{
			my_marker[0].setPosition(latlng);
			my_marker[2].setPosition(latlng);
		}
		else
		{
			my_marker[0].setPosition(latlng);
		}
		

	}
  });
 
   map.addListener('dblclick', function(event) { //pour eviter que le double click sur la map ne provoque un zoom, car le double click est reservé pour d'autres fonctions
		event.preventDefault();
  });
	}
  if(my_marker==0)
  {
	Create_marker(-1, login, 34.0132500, -6.8325500, login, true); //on cree notre marker
	Create_marker(1, name_target, 34.0132500, -6.8325500, "", true, true); //on crée la cible	
  }

}

var watchId = 0;

function Update_position()
{/*
	if(navigator.geolocation)
	{
		watchId = navigator.geolocation.watchPosition(successCallback,
								null,
								{enableHighAccuracy:true});
	}
	else
	{
	  alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");    
	}*/
	Send_my_position();
}

function successCallback(position){
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
	map.panTo(latlng);
	my_marker[0].setPosition(latlng);
	my_marker[2].setPosition(latlng);
	Send_my_position_and_my_enemies_positions();
}


// FONCTION DE CREATION DE MARKER

function Create_marker(ally_or_ennemy_or_ally_polyline_marker, marker_name, lat, lng, marker_name_for_ally_polyline, visible_or_not_when_created, bool_true_if_target)
{
	var pin_color = "";
	var visible_or_not = map;
	var name_pin = marker_name; 
	if(!visible_or_not_when_created)
	{
		visible_or_not = null;
	}
	if(ally_or_ennemy_or_ally_polyline_marker==0 || ally_or_ennemy_or_ally_polyline_marker==2)
	{
		pin_color ="0000ff"; //couleur bleue foncé
	}
	else if(ally_or_ennemy_or_ally_polyline_marker==1)
	{
		if(bool_true_if_target) //s'il s'agit de la cible
		{
			pin_color ="ffd700"; // couleur or
		}
		else//s'il s'agit d'un ennemi normal
		{
			pin_color ="ff0000"; // couleur rouge		
		}
	}
	else // s'il s'agit de mon marker
	{
		pin_color ="00ffff"; // couleur bleu clair
	}
	var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+name_pin+"|"+pin_color+"|"+pin_color+"|");
	var latlng = new google.maps.LatLng(lat, lng);
	if(ally_or_ennemy_or_ally_polyline_marker == 0)
	{	// on ajoute dans le tableau ally_markers : le marker (fixe), le marker fixe a l'issue du drag, et le marker draggable qui sera utilisé pour le tracé du parcours. Donc trois élements (markers) dans chaque element du array. 
		ally_markers[marker_name] = [new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:false}), new google.maps.Marker({position: latlng, map: map, icon: pin_image, opacity: 0, draggable:true}), new google.maps.Marker({position: latlng, map: map, icon: pin_image, opacity: 0, draggable:true})]; 
		ally_markers[marker_name][0].setMap(visible_or_not);
		ally_markers[marker_name][1].setMap(visible_or_not);
		ally_markers[marker_name][2].setMap(visible_or_not);
		Add_events_ally_markers(ally_markers[marker_name], marker_name);
		polylines[marker_name] = [3]; //en effet pour chaque element de l'array polylines, il y a quatre élements (les coordonnées en premier indice, l'objet en lui-meme en deuxieme indice, la derniere position du polyline en troisieme indice, le booleen qui dit s'il s'agit d'un allié ou d'un enemi)
		polylines[marker_name][0]= []; // on fait cette déclaration pour pouvoir utiliser le push avec les coordonnées du polylines de ce nom (rappel : les coordonnées sont en premier indice)
	}
	else if(ally_or_ennemy_or_ally_polyline_marker == 1)
	{
		enemy_markers[marker_name]=new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:true});
		enemy_markers[marker_name].setMap(visible_or_not);
		Add_events_enemy_markers(enemy_markers[marker_name], marker_name);
		if(!bool_true_if_target)
		{
			Add_enemy_into_list_of_enemies_if_doesnt_exist(marker_name);//s'il ne sagit pas de la cible alors on met le nom dans la liste d'ennemis (car la cible ne doit pas figurer dans la liste d'ennemis)	
		}
		
	}
	else if(ally_or_ennemy_or_ally_polyline_marker == 2)//S'il sagit d'un marker allié de polyline allié
	{

		polylines_from_ally[marker_name_for_ally_polyline][marker_name][1] = new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:false}) ;	
		polylines_from_ally[marker_name_for_ally_polyline][marker_name][1].setMap(visible_or_not);	
	}

	else
	{
		my_marker = [new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:true}), new google.maps.Marker({position: latlng, map: map, icon: pin_image, opacity: 0, draggable:true}), new google.maps.Marker({position: latlng, map: map, icon: pin_image, opacity: 0, draggable:true})];
		my_marker[0].setMap(visible_or_not);
		my_marker[1].setMap(visible_or_not);
		my_marker[2].setMap(visible_or_not);
		Add_events_my_marker();
		polylines[login] = [3]; //en effet pour chaque element de l'array polylines, il y a quatre élements (les coordonnées en premier indice, l'objet en lui-meme en deuxieme indice, la derniere position du polyline en troisieme indice, le booleen qui dit s'il s'agit d'un allié ou d'un enemi)
		polylines[login][0]= []; // on fait cette déclaration pour pouvoir utiliser le push avec les coordonnées du polylines de ce nom (rappel : les coordonnées sont en premier indice)
		Make_maker_disappear_without_remove_him(my_marker[2]);// on ajoute ces deux lignes de code pour que le my_marker soit par défaut en mode draggable et non en mode tracé de poyline
		Make_maker_disappear_without_remove_him(my_marker[1]);
	}
}

function Length_of_associative_array(associative_array)
{
	var associative_length = Object.keys(associative_array).length;
	return associative_length;
}

/*
Create_marker(0, "ALEXANDRE", 34.0132500, -6.8325500, "", true);
Create_marker(0, "ACHILLE", 33.5883100, -7.6113800, "", true);
*/
// EVENTS A AJOUTER AUX MARKERS

function Add_events_ally_markers(ally_markers_name, marker_name)
{
	// pour l'indice 2
	
	google.maps.event.addListener(ally_markers_name[2], 'dragstart', function(event) {
		ally_markers_name[2].setOpacity(1);
		Remove_current_polyline_if_redraw(0, marker_name);
	});

	google.maps.event.addListener(ally_markers_name[2], 'dragend', function(event) {
		Place_marker_at_the_end_of_polyline(0, marker_name);
	});

	google.maps.event.addListener(ally_markers_name[2], 'drag', function(event) {
		Trace_polyline_while_draging_marker(0, marker_name, 2);
	});
	
	google.maps.event.addListener(ally_markers_name[1], 'dblclick', function(event) {
		Place_marker_at_the_position_of_an_other_marker(ally_markers_name[1], ally_markers_name[0]);
		Remove_current_polyline_if_redraw(0, marker_name);
	});		
	
	
	// pour l'indice 1
	
	google.maps.event.addListener(ally_markers_name[1], 'dragstart', function(event) {
		//note : cette fois on ne reinitialise pas le tracé a zero car on ne fait pas un nouveau tracé avec le dragstart, mais on continue le tracé qui exitse deja;
	});



	google.maps.event.addListener(ally_markers_name[1], 'drag', function(event) {
		Trace_polyline_while_draging_marker(0, marker_name, 1);
	});	
}

function Add_events_my_marker()
{
	// pour l'indice 2
	
	google.maps.event.addListener(my_marker[2], 'dragstart', function(event) {
		my_marker[2].setOpacity(1);
		Remove_current_polyline_if_redraw(-1, login);
	});

	google.maps.event.addListener(my_marker[2], 'dragend', function(event) {
		Place_marker_at_the_end_of_polyline(-1, login);
		Send_my_position_and_my_enemies_positions();
	});

	google.maps.event.addListener(my_marker[2], 'drag', function(event) {
		Trace_polyline_while_draging_marker(-1, login, 2);
	});
	
	google.maps.event.addListener(my_marker[1], 'dblclick', function(event) {
		//alert("my_marker_1!");
		var my_marker_0_lat_lng = my_marker[0].getPosition();
		var my_marker_1_lat_lng = my_marker[1].getPosition();
		if(my_marker_0_lat_lng == my_marker_1_lat_lng)
		{
			Make_maker_disappear_without_remove_him(my_marker[2]);
			Make_maker_disappear_without_remove_him(my_marker[1]);
			Remove_current_polyline_if_redraw(-1, login);
		}
		else
		{
			Place_marker_at_the_position_of_an_other_marker(my_marker[1], my_marker[0]);
			my_marker[1].setOpacity(0);
			Remove_current_polyline_if_redraw(-1, login);			
		}

		//alert("my_marker_1!");
	});		
	
	google.maps.event.addListener(my_marker[2], 'dblclick', function(event) {
		//alert("my_marker_2!");
		Make_maker_disappear_without_remove_him(my_marker[2]);
		Make_maker_disappear_without_remove_him(my_marker[1]);
		Remove_current_polyline_if_redraw(-1, login);
		//alert("my_marker_2!");
	});		
	google.maps.event.addListener(my_marker[0], 'dblclick', function(event) {
		//alert("my_marker_0!");
		Place_marker_at_the_position_of_an_other_marker(my_marker[2], my_marker[0]);
		//alert("my_marker_0!");
	});		
	// pour l'indice 1
	
	google.maps.event.addListener(my_marker[1], 'dragstart', function(event) {
		my_marker[1].setOpacity(1); //je sais pas pourquoi j'ai du mettre cette ligne alors que je ne l'ai pas rajouté pour les alliés et les ennemis alors que la logique est pourtant la meme ...
		//note : cette fois on ne reinitialise pas le tracé a zero car on ne fait pas un nouveau tracé avec le dragstart, mais on continue le tracé qui exitse deja;
	});



	google.maps.event.addListener(my_marker[1], 'drag', function(event) {
		Trace_polyline_while_draging_marker(-1, login, 1);
	});
	google.maps.event.addListener(my_marker[0], 'dragend', function(event) {
		Send_my_position_and_my_enemies_positions();
	});
	google.maps.event.addListener(my_marker[1], 'dragend', function(event) {
		Send_my_position_and_my_enemies_positions();
	});	
}

$("body").on("keyup", function(e){
	if($("#map").is(":visible")){
		if (e.keyCode == 74) //"j"
		{
			alert("enemy markers 1 out of the map !");
		}
		else if (e.keyCode == 75 && ally_name_of_polyline_at_screen == login)//keycode 75 = "k" et en effet il faut aussi que l'ally_name_of_polyline_at_screen soit notre propre polylines car on ne doit pas pouvoir dessiner de polylines si l'on est en train de visualiser le polyline d'un allié 
		{
			alert("enemy markers 1 there !");
		}
		else if (e.keyCode == 32)
		{
			Remove_all_plans(false, true);
	}
	}
});

function Add_events_enemy_markers(enemy_markers_name, marker_name)
{
	if(marker_name!=name_target)
	{
		google.maps.event.addListener(enemy_markers_name, 'dragstart', function(event) {
			name_enemy_selected_by_click = marker_name;
		});	

		google.maps.event.addListener(enemy_markers_name, 'click', function(event) {

			name_enemy_selected_by_click = marker_name;
		});			
		
		google.maps.event.addListener(enemy_markers_name, 'dblclick', function(event) { // on double click sur le marker de l'ennemi pour le supprimer

			Remove_marker(enemy_markers[marker_name]);
			delete enemy_markers[marker_name];
			Remove_enemy_name_from_enemies_list(marker_name);
			Send_my_position_and_my_enemies_positions();
			
		});
		google.maps.event.addListener(enemy_markers_name, 'dragend', function(event) {
			Send_my_position_and_my_enemies_positions();
		});			
		
	}
	else //si il s'agit de la cible, on ne met pas de nom pour name_enemy_selected_by_click car on ne doit pas pouvoir changer le nom de la cible
	{
		google.maps.event.addListener(enemy_markers_name, 'dragstart', function(event) {

			name_enemy_selected_by_click = "";
			
		});	

		google.maps.event.addListener(enemy_markers_name, 'click', function(event) {

			name_enemy_selected_by_click = "";
		});			
	}

	
}

function Remove_enemy_name_from_enemies_list(name_enemy)
{
	$(".enemy_name").each(function() {
		if($(this).text() == name_enemy)
		{	
			$(this).remove();
		}
	});		
}

function Send_my_position_and_my_enemies_positions()
{
	var my_lat_and_lng = Extract_lat_and_lng_from_position(my_marker[0].getPosition());
	var enemies_position = [];
	var enemy_markers_length = Length_of_associative_array(enemy_markers);
	if(enemy_markers_length != 0) // si le tableau de mes ennemis contient bien des ennemis
	{	enemies_position ={};
		for (var key in enemy_markers) 
		{
			
			var lat_and_lng_to_extract = Extract_lat_and_lng_from_position(enemy_markers[key].getPosition());
			 //oui il faut faire un objet : si on le fait avec un array (comme ceci : enemies_position =[]) on ne peut plus l'envoyer avec le socket, je ne sais pas pourquoi !
			enemies_position[key] = lat_and_lng_to_extract;
			
		}
	}
	socket.emit('position_and_enemies_position', login, my_lat_and_lng, enemies_position, unite_name, id_badnote_name_data);	
}

$("body").on("keydown", function(e){
	if($("#map").is(":visible")){
		if(e.keyCode == 82)
		{
			Send_my_position_and_my_enemies_positions();
		}
	}
});


socket.on('get_position_and_enemies_position', function(login_of_ally,  my_lat_and_lng, enemies_positions_of_ally, this_unite_name, this_id_target){
	if(unite_name!= "" && this_unite_name == unite_name && this_id_target == id_badnote_name_data && this_id_target!="")
	{
		Add_ally_into_list_of_ally_if_doesnt_exist(login_of_ally);
		var enemies_positions_of_ally_length = Length_of_associative_array(enemies_positions_of_ally);
		
		if(enemies_positions_of_ally_length != 0) // si le tableau de mes ennemis contient bien des ennemis
		{	
			for (var key in enemies_positions_of_ally) 
			{
				
				Add_enemy_into_list_of_enemies_if_doesnt_exist(key);
				
			}
		}
		Create_or_update_ally_marker(login_of_ally, my_lat_and_lng.lat, my_lat_and_lng.lng);
		Create_or_update_enemy_markers(enemies_positions_of_ally);
	}
	
});

function Create_or_update_ally_marker(login_of_ally, lat, lng)
{		
		var ally_already_exists = Check_if_associative_array_contains_element(ally_markers, login_of_ally)
		if(!ally_already_exists) // si l'allié est nouveau dans notre liste on cree son marker
		{
			Create_marker(0, login_of_ally, lat, lng, "", true);
		}
		else // si l'allié est deja dans notre liste, on ne fait qu'updater la position sans creer de nouveau marker puisqu'il existe deja
		{
			var latlng = new google.maps.LatLng(lat, lng);
			ally_markers[login_of_ally][0].setPosition(latlng);
			ally_markers[login_of_ally][1].setPosition(latlng);
			ally_markers[login_of_ally][2].setPosition(latlng);
		}
		
}



function Create_or_update_enemy_markers(enemies_positions)
{
	$(".enemy_name").remove(); //on supprime d'abord tous les noms d'ennemis de la liste d'ennemis, car on va les récrire au cours de cette fonction (dans le Create_marker())
	
	if(Length_of_associative_array(enemies_positions)>0)
	{
		Remove_all_allies_markers_or_enemies_markers(false, true);
		for (key in enemies_positions)
		{	
			
			var lat = enemies_positions[key].lat;
			var lng = enemies_positions[key].lng;
			if(key != name_target)
			{
				Create_marker(1, key, lat, lng, "", true); //si le nom n'est pas celui de la cible, alors c'est un ennemi normal et on cree donc un ennemi normal 
			}
			else //si le nom est celui de la cible, on ne créé pas un ennemi normal mais la cible
			{
				Create_marker(1, key, lat, lng, "", true, true);
			}
				
		}
	}	
}



function Trace_polyline_from_position(position, polylines_or_polylines_from_ally, marker_name)
{
	var position_length = position.length;
	var i
	if(polylines_or_polylines_from_ally)
	{
		for (i=0; i< position_length; i++)
		{
			var latlng = position[i];
			polylines[marker_name][2] = latlng; //en troisieme indice de polylines, on place la derniere position du polyline, ce qui sera pratique pour positionner le marker à la fin du polyline
			if(polylines[marker_name][1] != undefined)
			{
				polylines[marker_name][1].setMap(null);  //rappel : les objets polylines (pas les coordonnées) sont stockés en deuxieme indice de l'array nominal polylines. On efface ici le polyline pour recreer la derniere mise a jour du polyline
			}
			polylines[marker_name][1] = new google.maps.Polyline({
				path: polylines[marker_name][0],
				geodesic: true,
				strokeColor: '#FF0000',
				strokeOpacity: 1.0,
				strokeWeight: 2
			});
			
			polylines[marker_name][1].setMap(map);			
		}		
	}

}

$("body").on("keyup", function(e){
	/*if (e.keyCode == 39)//fleche droite
	{
		var latlng = new google.maps.LatLng(35.46162, -5.59895);
		my_marker.setPosition(latlng);
	}*/
	if($("#map").is(":visible"))
	{
		if (e.keyCode == 80) //p
		{	
			if(ally_name_of_polyline_at_screen == login) // si l'on visualise bien notre polyline, on peut l'envoyer (car on ne peut pas envoyer son polyline en visualisant celui d'un allié)
			{
				Send_polylines(login, polylines);	
			}
		}
	}
	
});



//PARTIE POLYLINES



function Remove_current_polyline_if_redraw(ally_or_enemy_bool, marker_name)
{
	polylines[marker_name][0] =[]; //on reinitialise le tracé a zero car on fait un nouveau tracé avec le dragstart
	polylines[marker_name][1].setMap(null);
	polylines[marker_name][1]=undefined;
	if(ally_or_enemy_bool ==0)
	{
		ally_markers[marker_name][1].setOpacity(0);
	}
	else
	{
		my_marker[1].setOpacity(0);
	}
	
}


function Place_marker_at_the_end_of_polyline(ally_or_enemy_bool, marker_name)
{
		
		if(ally_or_enemy_bool == 0)
		{
			var latlng_marker_before_move = ally_markers[marker_name][0].getPosition();
			var latlng_marker_after_move = ally_markers[marker_name][2].getPosition();
			ally_markers[marker_name][1].setPosition(latlng_marker_after_move);
			ally_markers[marker_name][1].setOpacity(1);
			ally_markers[marker_name][2].setPosition(latlng_marker_before_move);
			ally_markers[marker_name][2].setOpacity(0);			
		}

		else
		{	
			var latlng_marker_before_move = my_marker[0].getPosition();
			var latlng_marker_after_move = my_marker[2].getPosition();
			my_marker[1].setPosition(latlng_marker_after_move);
			my_marker[1].setOpacity(1);
			my_marker[2].setPosition(latlng_marker_before_move);
			my_marker[2].setOpacity(0);					
		}
}






function Place_marker_at_the_position_of_an_other_marker(marker_1, marker_2)
{
	var position_marker_2 = marker_2.getPosition();
	marker_1.setPosition(position_marker_2);
}

function Trace_polyline_while_draging_marker(ally_or_enemy_bool, marker_name, marker_after_drag_or_while_drag)
{		
		var latlng
		if(ally_or_enemy_bool == 0)
		{
			latlng = ally_markers[marker_name][marker_after_drag_or_while_drag].getPosition();
		}
		else
		{
			latlng = my_marker[marker_after_drag_or_while_drag].getPosition();	
		}
		polylines[marker_name][0].push(latlng);
		polylines[marker_name][2] = latlng; //en troisieme indice de polylines, on place la derniere position du polyline, ce qui sera pratique pour positionner le marker à la fin du polyline
		if(polylines[marker_name][1] != undefined)
		{
			polylines[marker_name][1].setMap(null);  //rappel : les objets polylines (pas les coordonnées) sont stockés en deuxieme indice de l'array nominal polylines. On efface ici le polyline pour recreer la derniere mise a jour du polyline
		}
		polylines[marker_name][1] = new google.maps.Polyline({
			path: polylines[marker_name][0],
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		
		polylines[marker_name][1].setMap(map);
}


function Make_maker_disappear_without_remove_him(marker)
{
	marker.setOpacity(0);
	var latlng = new google.maps.LatLng(-76.300003, -148.000000);// lat long de l'antarctique !
	marker.setPosition(latlng);
	//alert("antarctic !");
}

//FONCTIONS DE TRANSFERT DU TRACE AUX ALLIES

socket.on('polylines_from_ally', function(ally_name, polylines_coordinates_from_ally, this_unite_name, this_id_target){

		if(unite_name!= "" && this_unite_name == unite_name && this_id_target == id_badnote_name_data && this_id_target!="")
	{
		Create_polylines_from_ally(ally_name, polylines_coordinates_from_ally);
		if(ally_name_of_polyline_at_screen == ally_name) // si l'on visualise le polyline de cet allié, on le réactualise directement, sans avoir a cliquer sur le nom de l'allié, vu que le polyline a l'ecran est celui de cet allié
		{
			Switch_polyline(ally_name);
		}
		else if(ally_name_of_polyline_at_screen == login)
		{
			Switch_polyline(login);
		}
	}
	
});



//FONCTIONS D'AFFICHAGE DES TRACE TRANSFERES


function Create_polylines_from_ally(ally_name, polylines_coordinates_concerned)
{	
	//Remove_plan(ally_name); //on retire d'abord de l'écran les polylines associés a ce nom s'ils existent
	Remove_all_plans(true,true); //on retire de l'ecran tous les tracés
	var i=0;
	var polylines_coordinates_concerned_length = polylines_coordinates_concerned.length;
	polylines_from_ally[ally_name] = [];
	for (i=0; i<polylines_coordinates_concerned_length; i++)
	{
		polylines_from_ally[ally_name][polylines_coordinates_concerned[i].name] =[];
		polylines_from_ally[ally_name][polylines_coordinates_concerned[i].name][3] = polylines_coordinates_concerned[i].polyline; // oui car le 0, le 1 et 2 sont deja reservés a d'autres fonctions. le 3 contient les coordonées du polyline, et sera utilisé pour le tracé progressif du polyline
		polylines_from_ally[ally_name][polylines_coordinates_concerned[i].name][0] = new google.maps.Polyline({
			path: polylines_coordinates_concerned[i].polyline,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1.0,
			strokeWeight: 2
		});
		//polylines_from_ally[ally_name][polylines_coordinates_concerned[i].name][0].setMap(map);
		var length_polylines_coordinates_concerned_i_polyline = polylines_coordinates_concerned[i].polyline.length;
		if(length_polylines_coordinates_concerned_i_polyline>0) // s'il y a bien un polyline associé a ce nom;
		{
			var last_lat_polyline_position = polylines_coordinates_concerned[i].polyline[length_polylines_coordinates_concerned_i_polyline-1].lat;
			var last_lng_polyline_position = polylines_coordinates_concerned[i].polyline[length_polylines_coordinates_concerned_i_polyline-1].lng;

			Create_marker(2, polylines_coordinates_concerned[i].name, last_lat_polyline_position , last_lng_polyline_position, ally_name, false);	
			
				
		}
		
	}
		
}


function Create_array_of_polylines_coordinates(polylines)
{
	var polylines_coordinates_array = [];
	var k = 0;
	for (var key in polylines) 
	{ 
		var i = 0;
		
		var polylines_key_length = polylines[key][0].length;
		var polyline_array_for_each_key = [];
		
		for(i=0; i<polylines_key_length; i++)
		{
			var lat_and_lng_from_position_extracted = Extract_lat_and_lng_from_position(polylines[key][0][i]);
			polyline_array_for_each_key.push(lat_and_lng_from_position_extracted);							
		}	
		var name_enemy ="";

		polylines_coordinates_array[k] = {name:key, polyline: polyline_array_for_each_key, name_enemy: name_enemy}; 
		k++;
	}
	return polylines_coordinates_array ;
}

function Extract_lat_and_lng_from_position(position)
{
	var lat_and_lng_from_position_extracted = {lat :position.lat(), lng: position.lng()};
	return lat_and_lng_from_position_extracted;
}

function Send_polylines(name, polylines)
{
	var polylines_coordinates = Create_array_of_polylines_coordinates(polylines);
	socket.emit('polylines_from_ally', name, polylines_coordinates, unite_name, id_badnote_name_data); //on envoit les coordonées de notre polyline	
}



function Remove_line(line)
{
	if(line!=undefined)
	{
		line.setMap(null);
	}
	
}

function Remove_marker(marker)
{
	if(marker!=undefined)
	{
		marker.setMap(null);
	}
}




//fonctions de tests divers :
var login ="";
var id_login="";
/*
$("body").on("keydown", function(e){
	if($("#map").is(":visible")){
		if(e.keyCode == 65)
		{
			login = "JIN";
			Create_marker(-1, login, 33.5883100, -7.6113800, "", true);
			ally_name_of_polyline_at_screen = login;
		}
		else if(e.keyCode == 90)
		{
			login = "JEAN";
			Create_marker(-1, login, 34.0132500, -6.8325500, "", true);
			ally_name_of_polyline_at_screen = login;
		}	
	}	
});
*/
//fin de fonctions de tests divers

function Check_if_have_ally(ally_name)
{
	var bool = false;
    $(".ally_name").each(function() {
		if($(this).text() == ally_name)
		{
			bool = true;
			return false;
		}
    });	
	return bool;
}

function Check_if_have_enemy(enemy_name)
{
	var bool = false;
    $(".enemy_name").each(function() {
		if($(this).text() == enemy_name)
		{
			bool = true;
			return false;
		}
    });	
	return bool;
}



var unite_name = "";
$("#unite_name_input").on("keydown", function(e){
	if($("#map").is(":visible")){
		if(e.keyCode == 13)
		{	
			var this_unite_name = $(this).val(); //on retient le nom d'unité qu'on vient d'entrer
			Close_map(); //on reset tout, au cas ou on avait rentré une unité précédemment et qu'on veut donc a present reset les variables...
			initMap();//...
			$(this).val(this_unite_name); // après avoir reset, on entre le nom d'unité qu'on avait entré
			unite_name = this_unite_name; // et on l'enregistre en tant que nouveau nom d'unité dans la variable globale unite_name
			Send_my_position();
		}
	}
});

$("#unite_name_input").on("blur", function(e){
	if($("#map").is(":visible")){
		if(unite_name != "")
		{
			$(this).val(unite_name);		
		}
	}
});

function Remove_plan(my_name_or_ally_name)
{	
	if(my_name_or_ally_name == login)
	{
		
		for (var key in polylines)
		{
			if(polylines[key] != "")
			{
				polylines[key][1].setMap(null);
				ally_markers[key][1].setOpacity(0);
			}
		}		
	}	
	else
	{
		if(polylines_from_ally[my_name_or_ally_name] != undefined)
		{		
			for (var key in polylines_from_ally[my_name_or_ally_name])
			{
				if(polylines_from_ally[my_name_or_ally_name][key][0] != "" && polylines_from_ally[my_name_or_ally_name][key][1] != undefined)
				{
					var line = polylines_from_ally[my_name_or_ally_name][key][0];
					var marker = polylines_from_ally[my_name_or_ally_name][key][1];
					Remove_line(line);
					Remove_marker(marker);
				}
			}
		}
	}
}

function Remove_all_plans(allies, enemies)
{	
	if(polylines!= [])
	{	
		for (var key in polylines)
		{	
			if(polylines[key][1] != undefined) //si polylines contient bien un marker et un polyline associé à ce nom
			{
				if(key!=login) // s'il ne s'agit pas du polyline de notre marker
				{
					var line = polylines[key][1];
					Remove_line(line);

					ally_markers[key][1].setOpacity(0); // s'il s'agit bien d'un polyline d'allié
					
	
				}
				else //s'il s'agit du polyline de notre marker
				{
					var line = polylines[key][1];
					Remove_line(line);
					my_marker[1].setOpacity(0); 
				}
			}
		}
	}
	if(polylines_from_ally!= [])
	{
		for(var key_1 in polylines_from_ally)
		{
			Remove_plan(key_1);
		}
	}	
}

function Remove_all_allies_markers_or_enemies_markers(allies, enemies) //booleen : si allies true on remove les alliés, si enemies true on remove les enemies
{
	if(allies == true && Length_of_associative_array(ally_markers))
	{
		for(key in ally_markers)
		{
			Remove_marker(ally_markers[key][0]);
			Remove_marker(ally_markers[key][1]);
			Remove_marker(ally_markers[key][2]);
		}
		ally_markers = [];
		
	}
	if(enemies == true && Length_of_associative_array(enemy_markers))
	{
		for(key in enemy_markers)
		{
			Remove_marker(enemy_markers[key]);
		}
		enemy_markers = [];
	}
}




function Show_plan(my_name_or_ally_name)
{
	if(my_name_or_ally_name == login && Length_of_associative_array(polylines)>0)
	{
		for (var key in polylines)
		{
			if(polylines[key][1] != undefined)
			{
				if(key!=login) //s'il ne s'agit pas du polyline de mon marker
				{
					//le probleme est la
					polylines[key][1].setMap(map);

					ally_markers[key][1].setPosition(polylines[key][2]);
					ally_markers[key][1].setOpacity(1);					

				}
				else//s'il s'agit du polyline de mon marker
				{
					polylines[key][1].setMap(map);
					my_marker[1].setPosition(polylines[key][2]);
					my_marker[1].setOpacity(1);		
				}
			}
		}
	}
	else if(Length_of_associative_array(polylines_from_ally)>0)
	{
		if(polylines_from_ally[my_name_or_ally_name] != undefined)
		{
			for (var key in polylines_from_ally[my_name_or_ally_name])
			{
				if(polylines_from_ally[my_name_or_ally_name][key] != "" && polylines_from_ally[my_name_or_ally_name][key][0] != "" && polylines_from_ally[my_name_or_ally_name][key][1] != undefined)
				{
					polylines_from_ally[my_name_or_ally_name][key][0].setMap(map);
					polylines_from_ally[my_name_or_ally_name][key][1].setMap(map);
				}
			}			
		}
	}
} 





//fonctions de transfert de noms d'alliés et d'unités


function Add_ally_into_list_of_ally_if_doesnt_exist(login_of_ally)
{
	if(!Check_if_have_ally(login_of_ally))
	{
		Append_ally_to_allies_list(login_of_ally);	
	}	
}

function Append_ally_to_allies_list(name){
	$("#allies_list").append("<div id="+name+" class='ally_name'>"+name+"</div>");
	
};

function Add_enemy_into_list_of_enemies_if_doesnt_exist(name_of_enemy)
{
	if(!Check_if_have_enemy(name_of_enemy))
	{
		Append_ally_to_enemies_list(name_of_enemy);
		
	}	
}

function Append_ally_to_enemies_list(name){
	$("#enemies_list").append("<div id="+name+" class='enemy_name'>"+name+"</div>");
	
};

function Change_color_of_ally_name_of_polyline_at_screen(ally_name)
{
	$(".ally_name").each(function() {
		if($(this).text() == ally_name)
		{
			$(this).css("color","orange");
		}
		else
		{
			$(this).css("color","black");
		}
    });	
}

var ally_name_of_polyline_at_screen = login;

function Switch_polyline(name)
{
	
	Remove_all_plans(true, true);
	Show_plan(name);
	ally_name_of_polyline_at_screen = name;
	Change_color_of_ally_name_of_polyline_at_screen(name);
	if(name == login)
	{
		Drag_or_Undrag_markers(true);
	}
	else
	{
		Drag_or_Undrag_markers(false);
	}
	
}


function Drag_or_Undrag_markers(true_or_false)
{
	my_marker[1].setDraggable(true_or_false);
	my_marker[2].setDraggable(true_or_false);
	
	for (var key in ally_markers)
	{
		ally_markers[key][1].setDraggable(true_or_false);
		ally_markers[key][2].setDraggable(true_or_false);
	}

}



$("#allies_list").on("click", ".ally_name", function(){
	if(ally_name_of_polyline_at_screen!=$(this).text()) //si l'on a deja le polyline de cet allié a l'écran, inutile de lancer la fonction Switch_polyline
	{
		Switch_polyline($(this).text());
	}
});

$("body").on("keydown", function(e)
{	if($("#map").is(":visible")){
		if(e.keyCode == 78) //code pour "n"
		{
			Switch_polyline(login);
		}
	}
});


$("body").on("keydown", function(e)
{	
	if($("#map").is(":visible")){
		if(e.keyCode == 71) //code pour "g"
		{
			enemy_selection_mode = true;
		}
	}
});

$("body").on("keyup", function(e)
{	
	if($("#map").is(":visible")){
		if(e.keyCode == 71) //code pour "g"
		{
			enemy_selection_mode = false;
		}
	}
});


var pointerEventToXY = function(e){ // Fonction qui permet d'avoir l'équivalent de e.pageX et de e.pageY mais pour les évenements de mobile comme touchstart 
      var out = {x:0, y:0};
      if(e.type == 'touchstart' || e.type == 'touchmove' || e.type == 'touchend' || e.type == 'touchcancel'){
        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
        out.x = touch.pageX;
        out.y = touch.pageY;
      } else if (e.type == 'mousedown' || e.type == 'mouseup' || e.type == 'mousemove' || e.type == 'mouseover'|| e.type=='mouseout' || e.type=='mouseenter' || e.type=='mouseleave') {
        out.x = e.pageX;
        out.y = e.pageY;
      }
      return out;
    };

// sur mobile
if(isMobile())
{
	$("#badnote_name_data").on("click", function(e){
		var e_pageX = e.pageX;
		var pos_x = Get_position("#map_and_tools_of_map").left;
		if(e_pageX< pos_x){;
			if(!enemy_selection_mode)
			{
				enemy_selection_mode = true;
				$(".right_of_map").css("border","2px solid red");
			}
			else
			{
				enemy_selection_mode = false;
				$(".right_of_map").css("border","none");
			}
		}
	});
}



/*
$("body").on("keyup", function(e)
{	
	if(e.keyCode == 72) //code pour "h"
	{
		alert(enemy_markers_polylines_mode);
		if(!enemy_markers_polylines_mode)
		{
			enemy_markers_polylines_mode = true;
			Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(true); // on retire les markers ennemis draggables pour les polylines d'ennemis
		}
		else
		{
			enemy_markers_polylines_mode = false;
			Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(false); // on retire les markers ennemis draggables pour les polylines d'ennemis			
		}
	}
});
*/


var name_enemy_selected_by_click;


$("#enemy_name_input").on("keyup", function(e){
	if(e.keyCode == 13 && name_enemy_selected_by_click!="") //si on a appuyé sur entré et si on a bien rentré un nom
	{
		var my_enemy_new_name = $(this).val();
		//Change_enemy_name_of_selected_enemy_marker(my_enemy_new_name);

		Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(name_enemy_selected_by_click, my_enemy_new_name);
		socket.emit('change_name_enemy', name_enemy_selected_by_click, my_enemy_new_name, unite_name, id_badnote_name_data); //on envoit les coordonées de notre polyline
	}
});
/*
function Change_enemy_name_of_selected_enemy_marker(enemy_new_name)
{
	if(enemy_name_selected_after_click != "" && Length_of_associative_array(enemy_markers[enemy_name_selected_after_click])>0)
	{	
		var lat = enemy_markers[enemy_name_selected_after_click][0].getPosition().lat();
		var lng = enemy_markers[enemy_name_selected_after_click][0].getPosition().lng();
		Remove_marker(enemy_markers[enemy_name_selected_after_click][0]);
		Remove_marker(enemy_markers[enemy_name_selected_after_click][1]);
		Remove_line(polylines[enemy_name_selected_after_click][1]);
		Create_marker(1, enemy_new_name, lat, lng, "", true);
		polylines[enemy_new_name] = polylines[enemy_name_selected_after_click];
		delete polylines[enemy_name_selected_after_click]; 
		delete enemy_markers[enemy_name_selected_after_click];
		enemy_name_selected_after_click = enemy_new_name;
		Show_plan(ally_name_of_polyline_at_screen);
	}
}

function Check_the_enemy_changes_name_and_update_polylines()
{
	for (name in enemy_markers)
	{
		polylines[name] = polylines[enemy_name_selected_after_click];
	}
}

/*
function Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(id_enemy, new_name)
{
	
	var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+new_name+"|ff0000|ff0000|");
	for (name in enemy_markers)
	{
		if(enemy_markers[name][2] == id_enemy)
		{

			enemy_markers[name][0].setIcon(pin_image);
			enemy_markers[name][1].setIcon(pin_image);
		}
	}	
}
*/
function Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(ancien_name, new_name)
{
	$(".enemy_name").each(function() 
	{
		if($(this).text() == ancien_name)
		{
			$(this).text(new_name)
		}
    });	
	var lat = enemy_markers[ancien_name].getPosition().lat();	
	var lng = enemy_markers[ancien_name].getPosition().lng();	
	Remove_marker(enemy_markers[ancien_name]);
	delete enemy_markers[ancien_name];
	Create_marker(1, new_name, lat, lng, "", true);

	
	/*
	for (ally_name in polylines_from_ally)
	{
		for (enemy_and_ally_name in polylines_from_ally[ally_name])
		{
			if(polylines_from_ally[ally_name][enemy_and_ally_name][2] != undefined)
			{ 
				if(polylines_from_ally[ally_name][enemy_and_ally_name][2] == ancient_name)
				{
					alert("enemy_and_ally_name is "+enemy_and_ally_name); alert("bingo");
					var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+new_name+"|ff0000|ff0000|");

					polylines_from_ally[ally_name][enemy_and_ally_name][1].setIcon(pin_image);
					alert("doooooooooooNE");
					polylines_from_ally[ally_name][enemy_and_ally_name][2] = new_name;
				}	
			}	
		}

	}*/
	
	
	
	
	/*
	var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+new_name+"|ff000|ff000|");
	polylines[ancient_name].setIcon(pin_image); 

	alert("go");
	for (name_ally in polylines_from_ally)
	{alert("name_ally is "+name_ally);

			var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+new_name+"|ff000|ff000|");
			polylines_from_ally[name_ally][ancient_name].setIcon(pin_image); 
	
		}
	}
	Show_plan(ally_name_of_polyline_at_screen);






	
		var lat_0 = enemy_markers[enemy_name_selected_after_click][0].getPosition().lat();
		var lng_0 = enemy_markers[enemy_name_selected_after_click][0].getPosition().lng();

		var lat_1 = enemy_markers[enemy_name_selected_after_click][1].getPosition().lat();
		var lng_1 = enemy_markers[enemy_name_selected_after_click][1].getPosition().lng();	
		
	//dans l'array enemy_markers :
		Remove_marker(enemy_markers[enemy_name_selected_after_click][0]);
		Remove_marker(enemy_markers[enemy_name_selected_after_click][1]);
		Remove_line(polylines[enemy_name_selected_after_click][1]);
		Create_marker(1, enemy_new_name, lat_0, lng_1, "", true);
		var latlng_for_enemy_indice_1 = new google.maps.LatLng(lat_1, lng_1);
		enemy_markers[enemy_name_selected_after_click][1].setPosition(latlng_for_enemy_indice_1);
		
	//dans le polylines :
	
	
*/		
}


socket.on('get_change_name_enemy', function(ancien_name, new_name, this_unite_name, this_id_target){
		if(unite_name!= "" && this_unite_name == unite_name && this_id_target == id_badnote_name_data && this_id_target!="")
	{
		Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(ancien_name, new_name)
	}
});







// le timer




function Trace_polyline_progressive(coordinates_line, duration, delay_before_start)
{


	var coordinates_line_length = coordinates_line.length;
	var i
	var polyline_to_draw = [2]; // en indice 0 les coordonnées, en indice 1 l'objet polyline
	polyline_to_draw[0] =[];
	setTimeout(function(){
		for(i=0; i<coordinates_line_length; i++)
		{	
			(function(i)
			{
				setTimeout(function(){
				var latlng = new google.maps.LatLng(coordinates_line[i].lat, coordinates_line[i].lng);
				polyline_to_draw[0].push(latlng);
				polyline_to_draw[1] = new google.maps.Polyline({
					path: polyline_to_draw[0],
					geodesic: true,
					strokeColor: '#FFA500',
					strokeOpacity: 1.0,
					strokeWeight: 3
				});
				polyline_to_draw[1].setMap(map);
				}, 100 * i);
			}(i));
		}
	}, delay_before_start);
}	



$("body").on("keyup",function(e){

	if(e.keyCode == 70)//f
	{
		Trace_polyline_progressive(polylines_from_ally["JIN"]["JEAN"][3], 0, 0)
	}
	
});
	

	




//Fonctions pour la transmission reguliere de sa position aux alliés (et inversement) en mode GPS 	
	
	

function Send_my_position()
{
	var my_lat_and_lng = Extract_lat_and_lng_from_position(my_marker[0].getPosition());
	socket.emit('my_position', login, my_lat_and_lng, unite_name, id_badnote_name_data);	
}


socket.on('get_position_ally', function(login_of_ally,  my_lat_and_lng, this_unite_name, this_id_target){

		if(unite_name!= "" && this_unite_name == unite_name && this_id_target == id_badnote_name_data && this_id_target!="")
	{	
		Add_ally_into_list_of_ally_if_doesnt_exist(login_of_ally);
		Create_or_update_ally_marker(login_of_ally, my_lat_and_lng.lat, my_lat_and_lng.lng);
		Send_my_position_and_my_enemies_positions(); //oui, on recoit la position de l'allié et on renvoit notre position et la position des ennemis sur notre map
		
	}
});


function Close_map()
{

	//if(watchId != 0)
	//{
		//navigator.geolocation.clearWatch(watchId);
		//watchId = 0;
		map=0;
		my_marker=0;
		$("#map").html("");
		ally_markers = [];
		enemy_markers = [];
		polylines = []; 
		polylines_from_ally = [];
		enemy_selection_mode = false;
		ally_name_of_polyline_at_screen = login;
		name_enemy_selected_by_click ="";
		$("#allies_list").empty();
		$(".enemy_name").remove();
		$("#unite_name_input").val("");
		socket.emit('disconnection_ally', login, unite_name, id_badnote_name_data);
		unite_name ="";
		name_target ="";
	//}

}


function Disconnection_ally_from_map(name_ally, this_unite_name)
{	
	$("#allies_list #"+name_ally+"").empty();
	Remove_line(polylines[name_ally][1]);
	Remove_marker(ally_markers[name_ally][0]);
	Remove_marker(ally_markers[name_ally][1]);
	Remove_marker(ally_markers[name_ally][2]);
	if(polylines[name_ally] != undefined)
	{
		delete polylines[name_ally];
	}
	if(ally_markers[name_ally] != undefined)
	{
		delete ally_markers[name_ally];
	}
	if(array_validation_taxe[name_ally] != undefined)
	{	
		delete array_validation_taxe[name_ally]
	}
	Send_polylines(login, polylines); //et on renvoit le polylines aux autres afin que chez les autres, notre polyline ne contienne plus et n'affiche plus ni le marker ni le polyline de l'allié deconnecté
	if (ally_name_of_polyline_at_screen == name_ally) //afin que si on est en train de visualiser le polyline de la personne qui s'est deconnecté, puisqu'il n'y a plus rien a afficher vu qu'elle est partie, on affiche alors notre polyline (un affichage defaut en quelque sorte)
	{
		Switch_polyline(login);
	}
	
}


socket.on('get_disconnection_ally', function(name_ally, this_unite_name, this_id_target){

		if(unite_name!= "" && this_unite_name == unite_name && this_id_target == id_badnote_name_data && this_id_target!="")
	{	
		Disconnection_ally_from_map(name_ally, this_unite_name);
	}
});



//PARTIE VALIDER LA TAXE (OU TOUS LES MEMBRE DE L'UNITE DOIVENT APPUYER EN MEME TEMPS SUR LA CIBLE POUR VALIDER)

var validation_taxe = false;
var array_validation_taxe = [];

$("#badnote_name_data").on("mousedown", ".badnote_name_data", function()
{
	if(validation_taxe == false && validation_taxe_socket_trigger==true && close_validation_for_this_name == false)
	{
		validation_taxe_socket_trigger = false;
		validation_taxe = true;
		if(Check_for_each_ally_validation_taxe() == true &&validation_taxe == true)
		{
			//alert("validation taxe ok !");
			var id_autor = member_data[0]._id;
			socket.emit("store_validation_in_database", id_badnote_name_data, date, id_autor);
		}
		else
		{	
			socket.emit("validation_taxe", validation_taxe, login, unite_name, id_badnote_name_data);
		}
	}

});



$("#badnote_name_data").on("mouseup mouseout mouseleave touchend", ".badnote_name_data", function()
{
		validation_taxe = false;
		if(close_validation_for_this_name == false)
		{
			socket.emit("validation_taxe", validation_taxe, login, unite_name, id_badnote_name_data);
			validation_taxe_socket_trigger = true;
		}
		
});

var validation_taxe_socket_trigger = true;
var close_validation_for_this_name = false;

socket.on('validation_taxe', function(ally_validation_taxe, ally_name, this_unite_name, this_id_target)
{	
	if(validation_taxe_socket_trigger && close_validation_for_this_name == false)
	{	
		validation_taxe_socket_trigger = false;
		if(unite_name!= "" && this_unite_name == unite_name && this_id_target == id_badnote_name_data && this_id_target!="")
		{	
			array_validation_taxe[ally_name] = ally_validation_taxe;
			//alert("my validation_taxe "+validation_taxe);
			if(Check_for_each_ally_validation_taxe() == true && validation_taxe == true)
			{
				//alert("validation taxe ok !");
				var id_autor = member_data[0]._id;
				socket.emit("store_validation_in_database", id_badnote_name_data, date, id_autor);
				close_validation_for_this_name = true;
			}
		}
		validation_taxe_socket_trigger = true;
	}
});	

socket.on('validation_taxe_done', function()
{
	
	$(".ally_name").css("color","yellow");
});

function Check_for_each_ally_validation_taxe()
{
	var bool_to_return = false; 
	$(".ally_name").each(function() 
	{
		var this_ally_name = $(this).text(); 
		if(array_validation_taxe[this_ally_name] != undefined)
		{ //alert("array_validation_taxe["+this_ally_name+"] "+array_validation_taxe[this_ally_name]);
			if (array_validation_taxe[this_ally_name] == true)
			{
				$(this).css("color","yellow");
				bool_to_return = true;
			}
			else
			{
				$(this).css("color","#000059");
				bool_to_return = false;
			}
		}
		else
		{
			$(this).css("color","#000059");
			//alert(this_ally_name +"n'a pas clique");
			bool_to_return = false;
			return false;
		}
    });
	return bool_to_return;
}


$(".loses_focus_after_enter").on("keyup", function(e){
		if (e.keyCode == 13)
		{
			$(this).blur();
		}
});


var array_names_of_this_member


function Create_array_names_of_this_member(id_name_switch_pass)
{
	array_names_of_this_member = {forename:[], name:[], t_forename:[], t_name:[]};
	var id_name_switch_pass_length = id_name_switch_pass.length;
	var i
	
	for(i=0; i<id_name_switch_pass_length; i++)
	{
		if(id_name_switch_pass[i].switch_pass==1)
		{
			array_names_of_this_member.forename[i] = id_name_switch_pass[i].forename;
			array_names_of_this_member.name[i] = id_name_switch_pass[i].name;
			array_names_of_this_member.t_forename[i] = id_name_switch_pass[i].t_forename;
			array_names_of_this_member.t_name[i] = id_name_switch_pass[i].t_name;			
		}

	}
}

function Create_name_shortcup_suggestion(forename_or_name_or_t_forname_or_t_name)
{
	if(forename_or_name_or_t_forname_or_t_name == "forename")
	{
		
		var array_names_of_this_member_forename_length = array_names_of_this_member.forename.length;
		var array_names_of_this_member_forename = array_names_of_this_member.forename;
		
		var i
		for(i=0; i<array_names_of_this_member_forename_length; i++)
		{
			var array_names_of_this_member_forename_i = array_names_of_this_member_forename[i];
			
			var forename = array_names_of_this_member_forename_i;
			var forename_length =  forename.length;
			var forename_val_length = $(".forename").val().length; 
			if($(".forename").val()==forename.substring(0, forename_val_length) && $(".forename").val()!="")
			{
				$("#forename_suggestion").text(forename);
				$("#name_suggestion").text(array_names_of_this_member.name[i]);
				$("#t_forename_suggestion").text(array_names_of_this_member.t_forename[i]);
				$("#t_name_suggestion").text(array_names_of_this_member.t_name[i]);
				return false;
			}
			else
			{
					$("#forename_suggestion").text("");
			}
			
		}
	}
	else if(forename_or_name_or_t_forname_or_t_name == "name")
	{
		var array_names_of_this_member_name_length = array_names_of_this_member.name.length;
		var array_names_of_this_member_name = array_names_of_this_member.name;
		
		var i
		for(i=0; i<array_names_of_this_member_name_length; i++)
		{
			var array_names_of_this_member_name_i = array_names_of_this_member_name[i];
			
			var name = array_names_of_this_member_name_i;
			var name_length =  name.length;
			var name_val_length = $(".name").val().length; 
			if($(".name").val()==name.substring(0, name_val_length) && $(".name").val()!="") 
			{
				$("#name_suggestion").text(name);
				$("#t_forename_suggestion").text(array_names_of_this_member.t_forename[i]);
				$("#t_name_suggestion").text(array_names_of_this_member.t_name[i]);
				return false;
			}
			else
			{
					$("#name_suggestion").text("");
			}
			
		}		
	}
	else if(forename_or_name_or_t_forname_or_t_name == "t_forename")
	{
		
		var array_names_of_this_member_t_forename_length = array_names_of_this_member.t_forename.length;
		var array_names_of_this_member_t_forename = array_names_of_this_member.t_forename;
		
		var i
		for(i=0; i<array_names_of_this_member_t_forename_length; i++)
		{
			var array_names_of_this_member_t_forename_i = array_names_of_this_member_t_forename[i];
			
			var t_forename = array_names_of_this_member_t_forename_i;
			var t_forename_length =  t_forename.length;
			var t_forename_val_length = $(".t_forename").val().length; 
			if($(".t_forename").val()==t_forename.substring(0, t_forename_val_length) && $(".t_forename").val()!="")
			{
				$("#t_forename_suggestion").text(t_forename);
				$("#t_name_suggestion").text(array_names_of_this_member.t_name[i]);
				return false;
			}
			else
			{
					$("#t_forename_suggestion").text("");
			}
			
		}
	}
	else if(forename_or_name_or_t_forname_or_t_name == "t_name")
	{
		var array_names_of_this_member_t_name_length = array_names_of_this_member.t_name.length;
		var array_names_of_this_member_t_name = array_names_of_this_member.t_name;
		
		var i
		for(i=0; i<array_names_of_this_member_t_name_length; i++)
		{
			var array_names_of_this_member_t_name_i = array_names_of_this_member_t_name[i];
			
			var t_name = array_names_of_this_member_t_name_i;
			var t_name_length =  t_name.length;
			var t_name_val_length = $(".t_name").val().length; 
			if($(".t_name").val()==t_name.substring(0, t_name_val_length) && $(".t_name").val()!="")
			{	
				$("#t_name_suggestion").text(t_name);
				return false;
			}
			else
			{
					$("#t_name_suggestion").text("");
			}
			
		}		
	}
}

function Fill_names_shortcup_suggestion(names_object)
{
	$("#forename_suggestion").text(names_object.forename);
	$("#name_suggestion").text(names_object.name);
	$("#t_forename_suggestion").text(names_object.t_forename);
	$("#t_name_suggestion").text(names_object.t_name);
}

$(".forename").on("keyup", function()
{
	Create_name_shortcup_suggestion("forename");
});

$(".name").on("keyup", function()
{
	Create_name_shortcup_suggestion("name");
});

$(".t_forename").on("keyup", function()
{
	Create_name_shortcup_suggestion("t_forename");
});

$(".t_name").on("keyup", function()
{
	Create_name_shortcup_suggestion("t_name");
});

//sur mobile:
/*
$("body").on("click", function(){
	enemy_selection_mode = true;
});
*/





/*POUR LES TESTS :

a et z pour placer les markers de login

entree pour envoyer son unite_name

r pour envoyer sa position et la position de ses ennemis

p pour envoyer son polylines

n pour switcher d'un polylines alliés vers son polyline

cliquer tout en appuyant sur g pour créer un marker enemi

double cliquer sur le marker enemi pour pouvoir le dragger et créer un parcours

re double cliquer sur le marker ennemi ou sur son marker draggé pour effacer le marker draggé et son parcours

cliquer sur un marker ennemi pour le locker, et appuyer sur entrée dans l'input du nom d'ennemi (après l'avoir rempli par un nouveau nom d'ennemi) pour changer le nom de l'ennemi 
*/



/*A SAVOIR

Pour l'ally_markers[key][], key est le nom de l'allié.
Pour l'enemy_markers[key][], key est l'id de l'ennemi. Le nom de l'ennemi est stocké dans enemy_markers[key][2].

*/











//------------------------------------------------------------------ PARTIE POUR LES TESTS --------------------------------------------------------


















$("body").fadeTo("fast",1);