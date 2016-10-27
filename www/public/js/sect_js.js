
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

/*
$("body, #our_mind, #sch").css("width",""+(screen.width)*0.95+"px");
$("body, #our_mind, #sch").css("height",""+((screen.height)*0.85)+"px");


$(".menu_text_block").css("max-height",""+($("body").height()-$("body").height()*0.32)+"px");

$("#badnote").css("width","100%");
$("#badnote").css("height","85%");

$("#integral_txt_cache, #integral_txt, #menu_chapters").css("width",""+((screen.width)*0.95)+"px");
$("#integral_txt_cache, #integral_txt").css("height",""+((screen.height)*0.85)+"px");
*/

//$("body").css("opacity",1);


function Readjust_img_size(img,open_or_close_img)
{
	var $this = $(img);
	var multiple = 0.9;
	var width = $this.width();
	if(open_or_close_img)
	{
		$this.css("width",""+width*multiple+"px");
	}else
	{
		$this.css("width",""+width/multiple+"px");
	}

}

function RotationForAllBrowsers(element, degrees)
{
element.style.webkitTransform = 'rotate('+degrees+'deg)';
element.style.MozTransform = 'rotate('+degrees+'deg)';
element.style.msTransform = 'rotate('+degrees+'deg)';
element.style.OTransform = 'rotate('+degrees+'deg)';
element.style.transform = 'rotate('+degrees+'deg)';
	
}

function RotationForAllBrowsersMultipleElements(elements, degrees)
{
	for (var i = 0; i < elements.length; ++i) {
		elements[i].style.webkitTransform = 'rotate('+degrees+'deg)';
		elements[i].style.MozTransform = 'rotate('+degrees+'deg)';
		elements[i].style.msTransform = 'rotate('+degrees+'deg)';
		elements[i].style.OTransform = 'rotate('+degrees+'deg)';
		elements[i].style.transform = 'rotate('+degrees+'deg)';
	}
	
}

function ObtenirPosition(arg){
	
		
    return {y: $(arg).offset().top, x: $(arg).offset().left};
}

function ObtenirPositionDuCentreElement(arg){
	
	var positionCentreX = ObtenirPosition(arg).x+($(arg).width())/2;
	var positionCentreY = ObtenirPosition(arg).y+($(arg).height())/2;
	
    return {y: positionCentreY, x: positionCentreX};
}

function EtablirPositionDuCentreElement(arg1, arg2, arg3){
	
	var tailleWidth = $(arg1).width()/2;
	var tailleHeight = $(arg1).height()/2;	
	$(arg1).css({"left":""+(arg2-tailleWidth)+"px"});

	$(arg1).css({"top":""+(arg3-tailleHeight)+"px"});	
}

function EtablirPositionDuCentreElementParRapportParent(arg1){
	
	var tailleWidth = $(arg1).width()/2;
	var tailleHeight = $(arg1).height()/2;	
	var parentWidth = $(arg1).parent().width()/2;
	var parentHeight = $(arg1).parent().height()/2;
	
	$(arg1).css({"left":""+(parentWidth-tailleWidth)+"px"});

	$(arg1).css({"top":""+(parentHeight-tailleHeight)+"px"});	
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
		$(".button_mobile").on("touchend", function(){
			$(".button_mobile").css("color","black");
			$(this).css("font-width","normal");
		});		
	}
	else
	{
		$("th, td").addClass("button_th_td_no_mobile");
	}

}

var body_width = $("body").width();
var body_height = $("body").height();

EtablirPositionDuCentreElement("#loading_message", body_width/2, body_height/2);

if(isMobile()) //on réajuste les images et la position des formulaire badnote, en les superposant plutôt qu'alignés pour que ce soit adapté à la taille des mobiles
{/*
	var elements = document.getElementsByClassName('img');
	RotationForAllBrowsersMultipleElements(elements, -90)
	$(".img, .img .schema").css("height", ""+body_width+"px");// oui on	EtablirPositionDuCentreElement(".img", 100, 100);
	$(".img, .img .schema").css("width", ""+body_height+"px");// oui on	EtablirPositionDuCentreElement(".img", 100, 100);
	$(".img .schema").css("max-width", ""+body_height+"px");
	//$(".img .schema_description").css("max-height", "0px");
	Display_none(".img .schema_description");*/
	var badnote_form_width = $(".badnote_form, .badnote_form_copy").width();
	$(".badnote_form, .badnote_form_copy").css("width", ""+(badnote_form_width/2)+"px");
	var badnote_male_and_fem_width = $(".badnote_male_and_fem, .badnote_male_and_fem_copy").width();
	$(".badnote_form_male, .badnote_form_male_copy, .badnote_form_fem, .badnote_fem_copy").css("display","block");
	/*//on reajuste la taille des div maille et vilain
	$("#maille, #enemy_settings, #maille_input, #enemy_name").css("width", "30px");
	//on change aussi le css du menu des chapitre pour version mobile :
	Display_none("#menu_chapters");
	$("#menu_chapters").css("opacity",1);*/
}
// else
// {
	// $(".schWhereAreMarcheAndMorale, .schWhereIsMoraleLaiqueReligieuse").css("position","relative");
	// $(".schWhereAreMarcheAndMorale, .schWhereIsMoraleLaiqueReligieuse").css("top","10px");
	// $(".img, .img .schema").css("width", ""+body_width+"px");// oui on	EtablirPositionDuCentreElement(".img", 100, 100);
	// $("#sch").find("img").css("width",""+((screen.width)*0.9)+"");
	// $("#sch").find("img.schWhereAreMarcheAndMorale").css("width",""+((screen.width)*0.8)+"");
	// $("#sch").find("img.schWhereIsMoraleLaiqueReligieuse").css("width",""+((screen.width)*0.6)+"");
	// $("#sch").find("img#marche_pur_moralise").css("width",""+((screen.width)*0.6)+"");/*pour l'exploitation de la haine marché pur moralisé, il faut reduire encore un peu la taille de l'image pour avoir les cercles entiers et la description*/
	// $("#sch").find("img#amour_sexuel").css("width",""+((screen.width)*0.5)+"");/*pareil pour l'amour*/
	// $("#sch").find("img#costumes").css("width",""+((screen.width)*0.8)+"");/*pareil*/
	// $("#sch").find("img#tact_strat_morale_religieuse").css("width",""+((screen.width)*0.5)+"");/*pareil*/
	// $("#sch").find("img#tact_strat_morale_laique").css("width",""+((screen.width)*0.5)+"");/*pareil*/
	
// }

jQuery.event.props.push("touches");
jQuery.event.props.push("changedTouches");
var socket0 = io.connect('http://192.168.1.14:8080');
var socket = io('http://192.168.1.14:8080/member-space');
var member_data = 0;
/*
socket.on('client_connection', function(){
	alert("client connected !");
});

socket0.on('client_connection', function(){
	alert("client connected !");
});
*/
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

// FONCTION QUI DESACTIVE LA SELECTION DU TEXTE
										
										
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

// PARTIE INSCRIPTION AUTHENTIFICATION

$("#subscribe_button").on("click", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
	$('.info_message').remove();
	Display_none("#login_form");
	Display_block("#subscribe_form");

});

$("#login_button").on("click", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
	$('.info_message').remove();
	Display_none("#subscribe_form");
	Display_none("#forgot_pass");
	
	Display_block("#login_form");

});

$("#login_and_nav_div, #connection_disconnection").on("click", function(e){// FONCTION NECESSAIRE POUR MOBILE
    e.stopImmediatePropagation();
});


$("body").children().not("#login_and_nav_div, #connection_disconnection").on("click", function(e){

	Display_none("#login_form");
	Display_none("#subscribe_form");
	Display_none("#forgot_pass");
});

var connect_disconnect_trigger = ""; // Cette variable est en fait un booléen, qui permet de se connecter ou se deconnecter si true. Mais avant de le transformer en booléen et de permettre la connexion ou deconnexion, il faut s'assurer que l'ajax de timeapi de la fonction Ajax_today() a fonctionné. Donc cette variable ne devient un booléen qu'en cas de succès  de la fonction ajax (voir fonction Ajax_today())

$("#forgot_pass_button").on("click", function(){
		
		Visibility_switch("#forgot_pass");

});


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
					$('.info_message').remove();
					Appear_info_message('#forgot_pass_email', "E-mail non conforme !", 0, 15, false);
					connect_disconnect_trigger = true;
				}
				
				if(!/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(new_pass)){
					$('.info_message').remove();
					Appear_info_message('#forgot_pass_new_pass', "Le mot de passe doit contenir au moins 8 caractères, au moins une majuscule, une minuscule, et un nombre ou caractère spécial.", 0, 15, false);
					connect_disconnect_trigger = true;
				}				
			
				if(new_pass != confirm_new_pass){
					$('.info_message').remove();
					Appear_info_message('#confirm_new_pass', "Tu n'as pas confirmé le même mot de passe !", 0, 15, false);
					connect_disconnect_trigger = true;
				}
					
			}else if(email!='' && new_pass !="" && confirm_new_pass !=""){
				var forgot_pass_data ={  
						email : email,
						new_pass : new_pass,
						url : url,
						new_pass_confirmation_pass : new_pass_confirmation_pass
					};  
				$('.info_message').remove();	
				socket0.emit('forgot_pass_data', forgot_pass_data);	
				
			}else{
				connect_disconnect_trigger = true;	
			 } 
	}
	
}

socket0.on('new_pass_send', function(new_pass_confirm){
	if(new_pass_confirm == "to_confirm"){
			$('.info_message').remove();
			Appear_info_message('#forgot_pass_send_button', "Un nouveau mot de passe va être envoyé à l'adresse que tu as donnée !", 0, 100, true);
			connect_disconnect_trigger = true;		
		
	}else if (new_pass_confirm == "confirmed"){
			var url_0 = window.location.href;
			var url = Slice_string(url_0, "?key");
			window.location.replace(url);
			Appear_info_message('body', "Ton mot de passe a été changé.", 0, 65, true);
	}
});



function Subscribe(){	 	
	
	if(connect_disconnect_trigger){
			connect_disconnect_trigger = false;		
			var	subs_login = $('#subs_login').val().trim();
			var	subs_pass = $('#subs_pass').val().trim();
			var confirm_pass = $('#confirm_pass').val().trim();
			var	subs_email = $('#subs_email').val().trim(); // note : avec encodeURIComponent, le @ sera remplacé par %40
			var subs_date = year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec;
			var to_check = $('#to_check');
			var	username = $('#username').val();
			var url = window.location.href;
			var confirmation_pass = Password(50, false); // une key de 50 caractères pour la confirmation de mail d'inscription

		if(! /^[a-zA-Z0-9éèçàù@-_]{3,15}$/.test(subs_login) || ! /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\-_]+\.[a-zA-Z\.\-_]{1,}[a-zA-Z\-_]+/.test(subs_email) || ! /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(subs_pass) || subs_pass != confirm_pass || !to_check.is(':checked')){
			if(! /^[a-zA-Z0-9éèçàù@-_]{3,15}$/.test(subs_login) ){
				$('.info_message').remove();
				Appear_info_message('#subs_login', "Pseudo non conforme !", 0, 15, false);
				connect_disconnect_trigger = true;
			}
				
			if(! /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\.\-_]*@[a-zA-Z0-9\-_]+\.[a-zA-Z\.\-_]{1,}[a-zA-Z\-_]+/.test(subs_email) ){
				$('.info_message').remove();
				Appear_info_message('#subs_email', "E-mail non conforme !", 0, 15, false);
				connect_disconnect_trigger = true;
			}

			if(! /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(subs_pass) ){
				$('.info_message').remove();
				Appear_info_message('#subs_pass', "Le mot de passe doit contenir au moins 8 caractères, au moins une majuscule, une minuscule, et un nombre ou caractère spécial.", 0, 15, false);
				connect_disconnect_trigger = true;
			}
				
			if(subs_pass != confirm_pass){
				$('.info_message').remove();
				Appear_info_message('#confirm_pass', "Tu n'as pas confirmé le même mot de passe !", 0, 15, false);
				connect_disconnect_trigger = true;
			}
				
			if(!to_check.is(':checked')){
				$('.info_message').remove();
				Appear_info_message('#to_check', "Tu dois cocher cette case pour t'inscrire !", 0, 15, false);
				connect_disconnect_trigger = true;
			}			
				
         }else if(subs_date!='' && username == "" && to_check.is(':checked')){
		 
		 
		 	var subscribe_to_confirm_data ={  
						login : subs_login,  
						pass : subs_pass,
						email : subs_email,
						date : subs_date,
						url : url,
						confirmation_pass : confirmation_pass
					};  
			 $('.info_message').remove();			
			 socket0.emit('subscribe_to_confirm_data', subscribe_to_confirm_data);
				
			 }else{
				connect_disconnect_trigger = true;	
			 } 
	}
}


function Appear_info_message(element, message, left_plus, top_plus, fadeOut){
	
var pos_left = Get_position(element).left + left_plus;	
var pos_top = Get_position(element).top + top_plus;

$(element).parent().append('<div class="info_message" style="font-style: italic; color: orange; position: absolute; left :'+pos_left+'px; top: '+pos_top+'px">'+ message +
		'</div>');		
if(fadeOut){
setTimeout(function(){ $('.info_message').fadeOut(250, function(){$('.info_message').remove();}) }, 2000);	
}		
		
}

 socket0.on('subscribe_data_to_confirm', function(message) {
	Appear_info_message('body', message, 0, 100, true);
 connect_disconnect_trigger = true;	
 });
	

function Login(){	 	
	
		
	if(connect_disconnect_trigger){
			connect_disconnect_trigger = false;		
			var	connect_login = $('#login').val().trim();
			var	connect_pass = $('#pass').val().trim();
		
         if(/^[a-zA-Z0-9éèçàù@-_]{3,15}$/.test(connect_login) &&  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(connect_pass)){
		 
		 
		 
		 
		 
		 	
				
				var login_data ={  
						login : connect_login ,  
						pass : connect_pass
					};  
			$('.info_message').remove();				
			socket0.emit('login_data', login_data);
			 
				
			 }else{
				connect_disconnect_trigger = true;		
			 }
	}
}

socket0.on('fail_to_login', function (reason) {

if(reason == "login_already_used"){
	$('.info_message').remove();
	Appear_info_message('#login', "Ce compte est déjà en cours d'utilisation !", 0, 15, false);
}else if (reason == "unknown_login"){
	$('.info_message').remove();
	Appear_info_message('#login', "Ce compte n'existe pas.", 0, 15, false);
}
connect_disconnect_trigger = true;	
});

socket.addEventListener("get_deconnection_data", Get_deconnection_data, false); // listener crée dès l'ouverture de page (contrairement aux autres listeners dans get_login_data) car cet evenement peut être appelé même si l'user n'est pas connecté : en effet, lorsque le serveur s'est crashé et se reconnecte, il force le refresh du client par cet event de deconnection, que le client soit connecté ou pas. 
socket.addEventListener("error_page", Error_page, false); // listener crée dès l'ouverture de page (contrairement aux autres listeners dans get_login_data) car cet evenement peut être appelé même si l'user n'est pas connecté : en effet, lorsque le serveur s'est crashé et se reconnecte, il force le refresh du client par cet event de deconnection, que le client soit connecté ou pas. 

socket0.on('get_login_data', function(docs) {
 
member_data = docs;
Close_section(); 
Display_none(".connection, #login_and_nav_div, #txt_integral_button");
Display_none("#post_these");	
Display_block(".disconnection");	 
	
	socket.addEventListener("refresh_login_data", Refresh_login_data, false);
	socket.addEventListener("get_name_data", Get_name_data, false);
	socket.addEventListener("refresh_data", Refresh_data, false);

	var message ="Bienvenue " +member_data[0].login+ " !";
	Appear_info_message('body', message, 0, 50, true);
	connect_disconnect_trigger = true;	

});

socket.on('get_login_data', function(docs) {
 
member_data = docs;
Close_section(); 
Display_none(".connection, .connection_button, #txt_integral_button");	
Display_none("#post_these");
Display_block(".disconnection");	 
	
	socket.addEventListener("refresh_login_data", Refresh_login_data, false);
	socket.addEventListener("get_name_data", Get_name_data, false);
	socket.addEventListener("refresh_data", Refresh_data, false);

	var message ="Bienvenue " +member_data[0].login+ " !";
	Appear_info_message('body', message, 0, 50, true);
	connect_disconnect_trigger = true;	

});
 
function Disconnection (){	
         if(Array.isArray(member_data) && connect_disconnect_trigger == true){ // car member_data n'est sous forme d'array que lorsque le membre est connecté, sinon il vaut 0 et c'est donc un nu
				
				connect_disconnect_trigger = false;		
				Disappear_badnote_name_data();
				socket.emit("deconnection_data");
			 }
}

function Get_deconnection_data(){
	Appear_info_message('body', "Bye !", 0, 65, false);
	var url_0 = window.location.href;
	if(url_0.includes("key")){
		var url = Slice_string(url_0, "?key");
		window.location.replace(url);		
	}else{
		window.location.replace(url_0);	
	}		
}







function Refresh_login_data(docs){
member_data = docs; 
} 

function Error_page(){
	
	alert("Error !");
}

// PARTIE IDEO

var ch_max = 22;
var i
for(i=1; i<ch_max; i++){
	$('#ch_'+i+'').load("public/ch_"+i+"/ch_"+i+".html");
}

//$('#democracy').load("public/articles/democratie.html");


// Fonctions d'affichage des images
 

 $("#integral_txt").on("click", ".sch", function(e){
	 /*
	if(($("#menu_chapters").css("opacity")==0 && e.pageY>body_height*0.20) || ($("#menu_chapters").css("display")=="none" && e.pageY>body_height*0.20))
	{
	var sch_id = $(this).attr("id");
	$("#integral_txt").css("display","none");
	if(!isMobile())
	{
		$("#menu_chapters").css("display","none");
	}
	$("#sch").css("display","block");
	$("#"+sch_id+"_pic").css("display","block");
	Readjust_img_size("#"+sch_id+"_pic .schema",1);
	if(isMobile())
	{
		var center_sch = ObtenirPositionDuCentreElement("#sch");
		EtablirPositionDuCentreElement("#"+sch_id+"_pic", center_sch.x, center_sch.y);	

	
		var sch_width_half = ($("#"+sch_id+"_pic").width())/2;
		var sch_middle = ($("#sch").width())/2;
		var sch_height_half = ($("#"+sch_id+"_pic").height())/2;
		var sch_middle_height = ($("#sch").height())/2;
		Set_position("#"+sch_id+"_pic", (sch_middle-sch_width_half), (sch_middle_height-sch_height_half));
		

	}
	else
	{
		var sch_height_half = ($("#"+sch_id+"_pic").height())/2;
		var sch_middle = ($("#sch").height())/2;
		Set_position("#"+sch_id+"_pic", 0, (sch_middle-sch_height_half));
	}
 }
 */
 var sch_id = $(this).attr("id");
 $("#integral_txt").css("display","none");
 $("#sch").css("display","block");
 $("#"+sch_id+"_pic").css("display","block");
 
}); 


// Fonction de retrait de l'image affichée
$("#sch").on("click", ".img", function(){
	/*
	var $this_id = $(this).attr("id");
	Readjust_img_size("#"+$this_id+" .schema",0);
	$(this).css("display","none");
	$("#sch").css("display","none");
	$("#integral_txt").css("display","block");
	if(!isMobile())
	{
		$("#menu_chapters").css("display","block");
	}
	*/
	$(this).css("display","none");
	$("#sch").css("display","none");
	$("#integral_txt").css("display","block");
});


// Fonctions qui permettent de se déplacer vers une ancre dans un paragraphe
function Go_to_word(a,b,c){

var  top2= $(a).position().top;	
var  top1

top1= $(b).position().top;	
$(c).scrollTop(top2-top1);
	
}

// FONCTION POUR MOBILE DE CLICK SUR HAUT DE PAGE POUR FAIRE APPARAITRE LE MENU 
if(isMobile())
{/*
	$("#integral_txt").on("click", function(e){
			if(e.pageY<body_height*0.30){
				if($("#menu_chapters").css("display") == "none")
				{
					Display_block("#menu_chapters");
				}
			}
			else
			{	
				Display_none("#menu_chapters");
			}

		
		
	});
	*/
	$("#menu_chapters").on("click", function(){
		var $this = $(this);
		var $this_opacity = $this.css("opacity");
		if($this_opacity ==0)
		{
			$this.css("opacity",1);
		}
		else
		{
			$this.css("opacity",0);
		}
		
	});
}

function Appear_disappear_these(){
	if($("#ideo").is(":hidden"))
	{
		$(".out_of_these").css("display","none");
		Display_block("#ideo");
	}
	else 
	{
		Display_none("#ideo");	
		$(".out_of_these").css("display","block");
	}
}


$("#txt_integral_button").on("click", function(){
	Display_none("#badnote");
	Appear_disappear_these();
});


if (!isMobile())
{
	$("#menu_chapters").on("mousemove", function(){
		$(this).css("opacity", "1");
	});

	$("#menu_chapters").on("mouseleave", function(){

	$(this).css("opacity", "0");
	});

	$("#integral_txt").on("mousemove", function(){
	$("#menu_chapters").css("opacity", "0");
	});
}

$(".chapter").on("click", function(){

	var title = "ch_"+$(this).attr("id");
	Go_to_word("#"+title+"","#ch_1","#integral_txt");

});


$(".badnote_off, #index, #arrow_left_window").on("mousemove", function(){
	if($("#badnote_name_data").css("display")=="none") // si l'on est pas connecté en mode badnote_name_data
	{
			Display_none("#badnote");
	}
});

$("#badnote").on("mousemove", function(){
Display_block("#badnote");
});





$("html").on("mousemove", function(e){
	
   if(e.target === this && $("#index").css("display")=="none" && $("#badnote_name_data").css("display")=="none") { //pour ne selectionner que la balise html et seulement si l'index n'est pas visible (si aucun article n'est visible) et si l'on est pas connecté avec le badnote_name_data ouvert
		Display_none("#badnote");     
   }
});

$("body").on("mousemove", function(e){
	
   if(e.target === this && $("#index").css("display")=="none") { //pour ne selectionner que la balise body et seulement si l'index n'est pas visible (si aucun article n'est visible)
		Display_block("#badnote");     
   }
});

if(!isMobile())
{
	$("#arrow_left_window").on("mousemove", function(e){
		if (Check_if_article_visible_and_txt_integral_invisible() == true)
		{
			$("#arrow_left_window").css("opacity",1);
			
		}
		else 
		{
			$("#arrow_left_window").css("opacity",0);
		}
		
	});

	$("#arrow_left_window").on("mouseout", function(e){
			$("#arrow_left_window").css("opacity",0);
	});	
	
	$("#arrow_left_window").on("click", function(e){
			Close_section();
		
	});
}


function Check_if_article_visible_and_txt_integral_invisible()
{
	var $this = $(".menu_text_block, #ideo");
	var result = false;
	
		$this.each(function(){
			if ($(this).css("display")=="block")
			{				
				result = true;
			} 	
		});
	return result;		
}

function Switch_badnote_index(to_badnote_or_index)//true pour badnote false pour index
{
	if(to_badnote_or_index)
	{
		Display_none("#index");
		Display_none("#ideo");
		Display_block("#badnote");
		$("#post_these").css("display","block");		
	}
	else
	{
		Display_none("#badnote");
		Display_block("#index");
		if($("#join_sect").css("display") == "none")
		{
			$("#post_these").css("display","none");
		}
		else
		{
			$("#post_these").css("display","block");
		}			
	}
}
function Close_section(){

		$(".menu_text_block").css("display","none");
		$(".title_index").css("text-decoration","none"); //on enleve les underline éventuels des titres
		if($("#ideo").is(":visible")) // s'il s'agit de faire disparaitre la div de la these
		{
			Appear_disappear_these();
		}
		Switch_badnote_index(true); //on fait disparaitre l'index et on fait apparaitre badnote
			
	
}


// FONCTION QUI DETECTE S'IL S'AGIT D'UN MOBILE OU PAS

/* FONCTION POUR TOUS LES MOBILES
function isMobile() {
 try {
    if(/Android|webOS|iPhone|iPad|iPod|pocket|psp|kindle|avantgo|blazer|midori|Tablet|Palm|maemo|plucker|phone|BlackBerry|symbian|IEMobile|mobile|ZuneWP7|Windows Phone|Opera Mini/i.test(navigator.userAgent)) {
     return true;
    };
    return false;
 } catch(e){ console.log("Error in isMobile"); return false; }
}
*/
/*
function isMobile() { // FONCTION POUR QUE CA MARCHE QUE SUR ANDROID (LA SEULE FONCTIONNELLE POUR L'INSTANT)
 try {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		return true;
    }else
	{
		return false;
	}
    return false;
 } catch(e){ console.log("Error in isMobile"); return false; }
}
*/

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




//PARTIE BADNOTE

//Connexion avec le serveur

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




function Display_none(arg){
	if($(arg).css("display") == "block"){
		$(arg).css("display","none");
	}
}

function Display_block(arg){
	if($(arg).css("display") == "none"){
		$(arg).css("display","block");
	}
}




// S'IL NE S'AGIT PAS D'UN MOBILE MAIS D'UN ORDI

if(isMobile() == false){ 


function Badnote_form_move(e){
Empty_form(".badnote_form",".forename",".name",".t_forename",".t_name");
$(".forename").focus();	
posleft_event = e.pageX-1;
postop_event = e.pageY-15;

Set_position(".badnote_form", posleft_event, postop_event);
	
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
			Display_none(".badnote_form");
		}else if(posleft_event<badnote_width && badnote_data_visible == false){
			Display_block(".badnote_form");
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
	 
	Appear_badnote_form();
	

   
});

$("body").on("click", function(e) {
	posleft_event = e.pageX;
	var badnote_width = parseInt($("#badnote").css("width"));
	if (posleft_event>badnote_width) {
		Display_none(".badnote_form");
	}else if(posleft_event<badnote_width && badnote_data_visible == false){
		Display_block(".badnote_form");
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



function Disapear_badnote_form(){

$('.badnote_form').css("opacity","0");
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

input_val = $(".badnote_form .badnote_form_male .forename").val();

if(Str_contain_char(input_val , " ")){

$(".badnote_form .badnote_form_male .name").focus(); 
}

}); 						

$(".badnote_form .badnote_form_male .name").on("keyup", function(e){

Capitalize(".badnote_form .badnote_form_male .name");

input_val = $(".badnote_form .badnote_form_male .name").val();

if(Str_contain_char(input_val , " ")){

$(".badnote_form .badnote_form_fem .t_forename").focus(); 
}

}); 						



$(".badnote_form .badnote_form_fem .t_forename").on("keyup", function(e){

Capitalize(".badnote_form .badnote_form_fem .t_forename");
Capitalize(".badnote_form .badnote_form_fem .t_name");
input_val = $(".badnote_form .badnote_form_fem .t_forename").val();

if(Str_contain_char(input_val , " ")){
	
$(".badnote_form .badnote_form_fem .t_name").focus(); 
}
});
/*
if(isMobile()){
	$(".badnote_form .badnote_form_fem .t_name").on("keyup", function(e){

	Capitalize(".badnote_form .badnote_form_fem .t_forename");
	Capitalize(".badnote_form .badnote_form_fem .t_name");
	input_val = $(".badnote_form .badnote_form_fem .t_forename").val();

	if(Str_contain_char(input_val , " ")){
		Get_name(); 
	}
	}); 	
}
*/

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
                alert(message);
            })




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
			var message ="rank non autorisé !";
			Appear_info_message('body', message, posleft_badnote_form, postop_badnote_form+50, true);	
			return (-1);
		}else { // Si id_switch_pass != switch_pass cela veut dire qu'on peut ranker
			return true;
		}
	}else if(id_index<0){ // si id_index = -1 ou -2
		if (id_index == (-2) && switch_pass == 1){ // on authorise (bien sur) à ranker un nom qui n'existe pas encore
			return true;
		}else if(id_index == (-2) && switch_pass == 0){ // on n'autorise pas à unranker un nom qui n'existe pas encore
			var message ="rank non autorisé !";
			Appear_info_message('body', message, posleft_badnote_form, postop_badnote_form+50, true);	
			return (-1);
		}else if(id_index == (-1)){
			return false;
		}
	}
		
}
var send_name_or_rank_trigger = true;
function Send_name(){
	if(send_name_or_rank_trigger){
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
			if(check_if_can_send_and_if_knows_name){
				up_rank = 1;
				down_rank = -1;
			}else if (check_if_can_send_and_if_knows_name == false){
				up_rank = 1;
			}
         if(check_if_can_send_and_if_knows_name != (-1) && forename_to_send!='' & name_to_send!='' & font_to_send!='' & date_to_send!='' & ajax_today == true){
		 
				

				
				
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
				
		 }else{	send_name_or_rank_trigger = true;} 
	}else{
		var message ="Tu viens à peine d'interragir avec ce nom !";
		Appear_info_message('body', message, posleft_badnote_form, postop_badnote_form+50, true);	
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
			
			if(forename_to_get !="" && name_to_get !="" && t_forename_to_get !="" && t_name_to_get !="" && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(forename_to_get) && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(name_to_get) && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(t_forename_to_get) && /^[a-zA-Zéèçàù]+[a-zA-Zéèçàù-]+[a-zA-Zéèçàù]+$/.test(t_name_to_get) ){
			 
				if(isMobile()==false){
					Unbind_badnote_form_move();
				}	
		
				Display_none(badnote_form);
				Empty_form(".badnote_form",".forename",".name",".t_forename",".t_name");
					
					
					
					
					
				var get_name_data ={  
							forename : forename_to_get,  
							name : name_to_get,
							t_forename : t_forename_to_get,  
							t_name : t_name_to_get,
							id_autor : id_autor_to_send
							};  
						
				socket.emit('get_name_data', get_name_data);	
					
					
		
						
							
		
					
			}else{get_name_trigger = true; return false;} 
		} 
	
}	
	
	
// partie 2 du Get_name() :

	

	
//Fonction qui insère et organise le code reçu par badnote.js ("docs" dans la fonction précédente) dans des divs que l'on crée 

function Get_name_data(name_data, first_name_insert, count_rank){ // Il ne faut pas confondre Get_name() avec Get_name_data(), ceux sont bien deux fonctions distinctes pour la reception du nom

if(first_name_insert){
	Insert_new_name_data(name_data);
	
}else{
	
	Insert_known_name_data(name_data, count_rank);
}
Appear_calendar_this_month(/*name_data, */false);
Display_none("#disconnection");
Display_block("#badnote_name_data");
Refresh_css();
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
	} else if(type_of_data == "name" && $(".badnote_name_data").length && $(".forename_data:eq(0)").text() == docs[0]["forename"] && $(".t_forename_data:eq(0)").text() == docs[0]["t_forename"]){
	//alert("name dooooone");
			$('.badnote_name_data, .day_doc_inc').remove();
	
			Insert_known_name_data(docs, count_rank);
			
			Appear_calendar_this_month(/*docs, */true);
			
	} 
}

function Insert_new_name_data(name_data){
		id_badnote_name_data = ""; 	

		$("#badnote_name_data").append('<div class="badnote_name_data" data-id="">'+
			'<div class="badnote_male_and_fem_data">'+
				'<div class="badnote_form_male_data" style="font-family:'+font_male+';">'+
					'<div class="forename_data">'+
						'<div class="forename_data_content">'+
							'<img class="eye_male_data eye_data" style="opacity:1"; src="public/images/male_2.svg" alt="male"/>'+
							'<div style="opacity:0.5;">' + name_data[0]["forename"] + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="name_data" style="display:inline-block; opacity:0.5;">' + name_data[0]["name"] + '</div>'+
				'</div>'+

				'<div class="badnote_form_fem_data" style="font-family:'+font_fem+';">'+
					'<div class="t_forename_data">'+
						'<div class="t_forename_data_content">'+
							'<img class="eye_fem_data eye_data" style="opacity:1" src="public/images/fem_2.svg" alt="fem"/>'+
							'<div style="opacity:0.5;">' + name_data[0]["t_forename"] + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="t_name_data" style="opacity:0.5;">' + name_data[0]["t_name"] + '</div>'+		
				'</div>'+
			'</div>'+	
		'</div>');		

	//Set_size_and_position_badnote_name_data();
	//Set_position_crown();	
	$("#badnote").css("cursor","default");
}

function Insert_known_name_data(name_data, count_rank){
	id_badnote_name_data = ""; 
	var i
	var opacity = 1;
	var color = "black";
	var pos_top;
	var pos_left;
	if(count_rank<3){ // Si le count_rank est inférieur à 3, cela signifie qu'il y a moins que 3 fois plus de rank_up que de rank_down, et il faut donc faire apparaître le nom comme si c'était un nouveau nom car ce sont les règles de mon site.
		count_rank = 0;
		opacity=0.5;
		
	}else if(count_rank>4){
		color = "yellow";
	}
	
	
	for(i=0; i<count_rank+1; i++){
		$("#badnote_name_data").append('<div class="badnote_name_data" data-id="' + name_data[0]["_id"] + '">'+
			'<div class="badnote_male_and_fem_data">'+
				'<div class="badnote_form_male_data" style="color:'+color+'; font-family:'+font_male+'; font-size:'+Size_random()+'px;">'+				
					'<div class="forename_data">'+
						'<div class="forename_data_content">'+
							'<img class="eye_male_data eye_data" src="public/images/male_2.svg" alt="male"/>'+
							'<div>' + name_data[0]["forename"] + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="name_data" style="opacity:'+opacity+';">' + name_data[0]["name"] + '</div>'+
				'</div>'+

				'<div class="badnote_form_fem_data" style="color:'+color+'; font-family:'+font_fem+'; font-size:'+Size_random()+'px;">'+	
					'<div class="t_forename_data">'+
						'<div class="t_forename_data_content">'+
							'<img class="eye_fem_data eye_data" src="public/images/fem_2.svg" alt="fem"/>'+
							'<div>' + name_data[0]["t_forename"] + '</div>'+
						'</div>'+
					'</div>'+
					//'<div class="t_name_data" style="opacity:'+opacity+';">' + name_data[0]["t_name"] + '</div>'+			
				'</div>'+
			'</div>'+	
			'<div class="date_data" style="display:none;">' + name_data[0]["date"][i] + '</div>'+ 
		'</div>');
		
	if(count_rank>0){	// Si le nom s'affiche de manière multiple, avec l'opacité à 1, alors on change les Font de chaque nom affiché pour un effet visuel de plusieurs font qui se superposent
		id_badnote_name_data = $(".badnote_name_data").data('id'); // on stocke l'ID du nom dans cette variable pour faciliter l'utilisation de l'ID du nom	(on ne stocke l'ID du nom que pour un nom non transparent, qui a été marqué plusieurs fois)		
		Font_change($(".badnote_name_data .badnote_male_and_fem_data .badnote_form_male_data:eq("+i+")"));
		Font_change($(".badnote_name_data .badnote_male_and_fem_data .badnote_form_fem_data:eq("+i+")"));	
	}
	



}
//on ajoute les images :


$(".eye_male_data").last().css("opacity",1);
$(".eye_fem_data").last().css("opacity",1);




//Set_size_and_position_badnote_name_data();
$("#badnote").css("cursor","default");
}
/*
function Set_size_and_position_badnote_name_data()
{
	
	var body_width = $("body").width();
	var body_height = $("body").height();
	
	if(!isMobile())
	{
		Set_size_and_position_badnote_name_data_elements(400);		
	}
	else
	{
		Set_size_and_position_badnote_name_data_elements(300);
	}

		var center_body = ObtenirPositionDuCentreElement("body");
		var top_badnote_name_data = body_height-0.1*body_height;
		EtablirPositionDuCentreElement(".badnote_name_data", center_body.x, top_badnote_name_data);		
	
}

function Set_size_and_position_badnote_name_data_elements(width)
{

		var width_half = width/2;
		$(".badnote_name_data, .badnote_male_and_fem_data").css("width",""+width+"px");
		$(".badnote_form_male_data, .badnote_form_fem_data").css("width",""+width_half+"px");
		$(".badnote_form_fem_data").css("left",""+width_half+"px");

}

function Set_position_crown()
{
	
	var body_width = $("body").width();
	var body_height = $("body").height();
	var crown_width = $("table").width()+$("table").width()*0.15;
	var crown_size = $("#crown").css("font-size"); 
	$("#crown").css("width",""+crown_width+"px");
	$("#crown").css("max-height",""+crown_size+"");
	//var center_body = ObtenirPositionDuCentreElement("body");
	
	//var top_crown = ($(".badnote_name_data").first().offset().top)-parseInt(crown_size);
	//EtablirPositionDuCentreElement("#crown", center_body.x, top_crown);	
	Display_block("#crown");
	
}
*/

//FONCTION D'ENVOI DU NOM
var timer_long_click;
$("#badnote_name_data").on("mousedown", ".badnote_name_data", function(){
    timer_long_click = setTimeout(function(){
			Send_name();  
			
    },700);
}).on("mouseup mouseleave",function(){
    clearTimeout(timer_long_click);
});



	
//FONCTION QUI EFFACE LES RESULTATS OBTENUS PAR Get_name() AVEC UN LONG CLICK



	


function Disappear_badnote_name_data(pos_left, pos_top){
	if($("#badnote_name_data").is(':visible')){
		$(".eye_container").css("opacity","1");

		Set_position('.badnote_form', (pos_left-1), (pos_top-15));
		Display_block('.badnote_form');
		$('.badnote_form').css("opacity","1");
		if(isMobile()==false){
			Unbind_badnote_form_move();
			$('.forename').focus(); // en effet j'ai choisi de ne remettre le focus après un quit de nom que pour la version ordi, juste comme ça... 
		}

		$('#badnote_name_data').fadeOut(500, function (){
		$("#badnote").css("cursor","text");
		$('.badnote_name_data, .day_doc_inc').remove();
		Clear_array_week();
		id_badnote_name_data = "";
		badnote_data_visible = false;
		get_name_trigger = true; // On permet à nouveau de lancer la fonction Get_name
		send_name_or_rank_trigger = true; // On permet à nouveau de lancer les fonctions Send_name et Rank
		Display_block("#disconnection");	
		});	
			
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
var timer_long_click;
$("#badnote").on("mousedown", function(e){
    timer_long_click_2 = setTimeout(function(){
		var pos_x = Get_position(".badnote_name_data").left;
		if(e.pageX < pos_x){
			Disappear_badnote_name_data(e.pageX, e.pageY);
		}
    },700);
}).on("mouseup mouseleave",function(){
    clearTimeout(timer_long_click_2);
});





// Fonction qui attribue une position et fait apparaître un élément


function Set_position_and_appear(element, left, top){

Set_position(element, left, top);
Display_block(element);

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

function Ajax_today(){
if(ajax_today){
Display_block("#loading_message");

Display_none("#loading_message");
date_timeapi_format = "Tue, 19 Apr 2016 19:50:49 GMT";	
day= date_timeapi_format.substring(5,7);
month= date_timeapi_format.substring(8,11);
year= date_timeapi_format.substring(12,16);
hour= date_timeapi_format.substring(17,19);   
min= date_timeapi_format.substring(20,22);   
sec= date_timeapi_format.substring(23,25);  



Today(); }

}


//POUR LA VERSION EN LIGNE(ON FAIT LA REQUETE TIMEAPI)
/*
function Ajax_today(){
if(ajax_today){
Display_block("#loading_message");
$.ajax({
  url: 'http://www.timeapi.org/utc/now.json?callback=myCallback',
  type: 'GET',
  jsonpCallback: 'callback',
  dataType: 'jsonp',
  success: function(data) { 
Display_none("#loading_message");
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

*/



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
		Display_block(arg);
	} else if ($(arg).css("display")=='block'){
		Display_none(arg);
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







//FONCTION DE RANK

function Rank(id_to_send, switch_pass){

	if(send_name_or_rank_trigger){
		//alert("okiii");
		send_name_or_rank_trigger = false;
		var id_autor_to_send = member_data[0]._id;			
		var id_name = $('.badnote_name_data').data('id');
		var check_if_can_send_and_if_knows_name = Check_if_can_send(id_to_send, switch_pass);
		var up_rank = 0;
		var down_rank ;
		if(check_if_can_send_and_if_knows_name){
			down_rank = 1;
			up_rank = -1;
		}else if (check_if_can_send_and_if_knows_name == false){
			down_rank = 1;
			}
		//alert("check_if_can_send_and_if_knows_name : "+check_if_can_send_and_if_knows_name);			
		if(check_if_can_send_and_if_knows_name  != (-1)){
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

		}else{	send_name_or_rank_trigger = true;} 
	}else{
		var message ="Tu viens à peine d'interragir avec ce nom !";
		Appear_info_message('body', message, posleft_badnote_form, postop_badnote_form+50, true);			
	} 
}

//FONCTION DU CLICK SUR LE BOUTON D'UNRANK D'UN NAME


$("#badnote").on("dblclick", ".badnote_name_data", function(){
	Rank($(this).data('id'), 0);
});


// FONCTIONS DE CALENDRIER ET REPERAGE DANS LE TEMPS



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











// Le calendrier



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
	var this_year = 2005; // On commence en effet en 2005
	var this_month
	var month_nbr_days
	var m = 0; // L'indice de le la clef d'array du mois en question et du nombre de jours pour ce mois
	var d = 2; // L'indice qui compte les jours. On commence à d = 2 car le premier jour est inscrit manuellement (voir plus bas), et c'est le 1 (samedi 1 janvier 2005). Le d sert dans le remplissage automatique qui se fait donc après l'entrée manuelle du 1er jour (samedi 1 janvier 2005).
	var $this = $(this);
	var i_tr = 0;
	var i_td = 6;
	var last_first_day_index
	var prev_month_nbr_days
	
	
	for (i2=0; i2<300; i2++){
	
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
				+"<caption>"
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
	
//MAINTENANT ON S'OCCUPE DU PLACEMENT DU CALENDRIER 

/*
if(isMobile())
{
	var badnote_form_male_width = $(".badnote_form_male").width();
	$("table").css("width",""+badnote_form_male_width*0.7+"px");
}
else
{
	var badnote_form_width = $(".badnote_form").width();
	$("table").css("width",""+badnote_form_width*0.4+"px");
}
var table_width_section = ($('table').width())/7;
$("th, td").css("width",""+table_width_section+"px");
var th_width = $("th").width();
$("th, td").css("height", ""+th_width+"px");


var body_height = $("body").height();
var table_height = $("table").height();
var new_position_table_relative = body_height-table_height*0.6;
$("table").css("top","15px");

var table_y = $("table").css("top");
var table_width = $("table").width();
var table_height = $("table").height();
*/
Change_button_hover_for_mobile_and_no_mobile();
Refresh_css();	
}




function Put_class_to_grey_td(element){
	
	var $element = $(element);
	var $prev_element = $(element).prev("table");
	var $next_element = $(element).next("table");
	var table_td_length = $element.find("td").length;
	var i
	for(i=0; i<table_td_length; i++){
		
		if($element.find("td:eq("+i+")").css("color")=== 'rgb(128, 128, 128)'){
			$element.find("td:eq("+i+")").addClass("td_other_month");		
		}
		if($prev_element.find("td:eq("+i+")").css("color")=== 'rgb(128, 128, 128)' && i > 27){ // i > 27 : pour ne compter que les derniers jours en gris du mois précédent, et pas les mois en gris au début du mois précédent
			$prev_element.find("td:eq("+i+")").addClass("td_other_month");			
		}
		if($next_element.find("td:eq("+i+")").css("color")=== 'rgb(128, 128, 128)' && i < 14){ //  i < 14 : pour ne compter que les premiers jours en gris du mois suivant, et pas les mois en gris à la fin du mois suivant
			$next_element.find("td:eq("+i+")").addClass("td_other_month");	
		}			
	}
	
}


function Appear_calendar_this_month(/*docs, */refresh){

		if(refresh == false){	
			var this_table = "."+month_txt+"."+year+"";
			Put_class_to_grey_td(this_table);
			
			$("."+month_txt+"."+year+"").find("td").not(".td_other_month").filter(function() {
											return $(this).text() == day_int;
									}).first().css("font-weight","bold"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier
									
			$("."+month_txt+"."+year+"").prev("table").find("td.td_other_month").filter(function() {
											return $(this).text() == day_int;
									}).last().css("font-weight","bold"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois précédent (parmi les jours en gris)

			$("."+month_txt+"."+year+"").next("table").find("td.td_other_month").filter(function() {
											return $(this).text() == day_int;
									}).first().css("font-weight","bold"); // On fait apparaitre en gras le jour d'aujourd'hui dans le calendrier du mois suivant (parmi les jours en gris)										
			Display_block($("."+month_txt+"."+year+"")); // On sélectionne par les class et non par les attributs data car je n'arrive pas a selectionner avec les attributs data, même si ca aurait été plus propre avec les attributs data...
			
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
	Display_none($(this).parent().parent());
	Display_block($('table#'+previous_month+''));
}
});

$("#table_container").on("click", '#next_month_button', function(){
var next_month = parseInt($(this).parent().parent().attr('id')) + 1;
var $this_table_id =  parseInt($(this).parent().parent().attr('id'));
var last_table_id = parseInt($('#table_container').children('table').last().attr('id'));
if($this_table_id < last_table_id){
Display_none($(this).parent().parent());
Display_block($('table#'+next_month+''));

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







// FONCTIONS POUR LE TEXTE INTEGRALE

//$('#integral_txt').on('touchmove, mousemove', 'p', function(){

//$(this).css("color", "red");

//});

//$('#integral_txt').on('touchend, touchcancel, mouseout, mouseup', 'p', function(){

//$(this).css("color", "black");

//});



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
	socket0.emit('subscribe_data', key);
	} else if(key != false && key.length < 41){ // si key possède moins de 40 caractères, c'est une confirmation de mail de changement de mot de passe
		socket0.emit('password_change', key);
	}else{
	
	return false;
	}
			}, 500);
}

	
	
socket0.on('confirmation_done_ok_redirect', function(){
	var message ="Ton compte est finalisé !";
	Appear_info_message('body', message, 0, 50, true);
	var url_0 = window.location.href;
	var url = Slice_string(url_0, "?key");
	window.location.replace(url);
});

socket0.on('login_already_exists', function(){

var message ="Pseudo déjà utilisé !";
Appear_info_message('#subs_login', message, 0, 15, true);
connect_disconnect_trigger = true;	

});

socket0.on('email_already_exists', function(){

var message ="E-mail déjà utilisé !";
Appear_info_message('#subs_email', message, 0, 15, true);
connect_disconnect_trigger = true;

});



socket0.on('login_already_exists_just_before_confirmation', function(){

var message ="Désolé, mais ce pseudo a été validé par une autre personne juste avant ta validation ! ... :(";
Appear_info_message('body', message, 0, 50, true);


});


socket0.on('email_already_exists_just_before_confirmation', function(){

var message ="Désolé, mais cet e-mail a été validé par une autre personne juste avant ta validation ! ... :(";
Appear_info_message('body', message, 0, 50, true);

});


Get_confirmation_key(); // On lance la fonction de confirmation de key à chaque fois qu'on ouvre la page


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

/*
var ideo = document.getElementById('ideo');
swipedetect(ideo, function(swipedir){
    //swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
	{
		Close_section();
	}
});

var index = document.getElementById('index');
swipedetect(index, function(swipedir){
    //swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
	{
		Close_section();
	}
});
*/

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
				alert("element "+element);
				bool = true;
				return bool;
			}
		}
	}
	alert("check done");
	return bool;
}

/*
function swipedetect(el, callback){
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
	
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
		if( startY>el_pos_y_start){
		};
		//e.preventDefault()
    }, false)
		touchsurface.addEventListener('touchmove', function(e){
			//e.preventDefault() // prevent scrolling when inside DIV on -------> On le désactive car on veut justement pouvoir scroller le text integral
		}, false)
	  
		touchsurface.addEventListener('touchend', function(e){
				var touchobj = e.changedTouches[0]
				distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
				distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
				elapsedTime = new Date().getTime() - startTime // get time elapsed
				if (elapsedTime <= allowedTime){ // first condition for awipe met
					if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
						swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
					}
					else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
						swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
					}
				}
				handleswipe(swipedir)
				//e.preventDefault()
			
		}, false)
	
}*/
  
//USAGE:
/*
var el = document.getElementById('someel')
swipedetect(el, function(swipedir){
    swipedir contains either "none", "left", "right", "top", or "down"
    if (swipedir =='left')
        alert('You just swiped left!')
})
*/





//FONCTIONS DE L'INDEX


$("#whoweare_title").on("click", function(){
	$("#why_title, #join_title, #democracy_title, #power_title").css("text-decoration","none");
	$("#whoweare_title").css("text-decoration","underline");
	Display_none("#why");
	Display_none("#join_sect");
	Display_none("#democracy");
	Display_none("#power");
	Display_block("#whoweare");
	Switch_badnote_index(false);
});



$("#why_title").on("click", function(){
	$("#whoweare_title, #join_title, #democracy_title, #power_title").css("text-decoration","none");
	$("#why_title").css("text-decoration","underline");
	Display_none("#whoweare");
	Display_none("#join_sect");
	Display_none("#democracy");
	Display_none("#power");
	Display_block("#why");
	Switch_badnote_index(false);
});



$("#join_title").on("click", function(){
	$("#why_title, #whoweare_title, #democracy_title, #power_title").css("text-decoration","none");
	$("#join_title").css("text-decoration","underline");
	Display_none("#whoweare");
	Display_none("#why");
	Display_none("#democracy");
	Display_none("#power");
	Display_block("#join_sect");
	Switch_badnote_index(false);
});

$("#democracy_title").on("click", function(){
	$("#why_title, #whoweare_title, #join_title, #power_title").css("text-decoration","none");
	$("#democracy_title").css("text-decoration","underline");
	Display_none("#whoweare");
	Display_none("#why");
	Display_none("#join_sect");
	Display_none("#power");
	Display_block("#democracy");
	Switch_badnote_index(false);
});

$("#power_title").on("click", function(){
	$("#why_title, #whoweare_title, #join_title, #democracy_title").css("text-decoration","none");
	$("#power_title").css("text-decoration","underline");
	Display_none("#whoweare");
	Display_none("#why");
	Display_none("#join_sect");
	Display_none("#democracy");
	Display_block("#power");
	Switch_badnote_index(false);
});



//$(window).resize(function() {
  //alert("ok");
//});






//PARTIE HELPBOX

/*
if(isMobile())
{
		var help_box_border_width = parseInt($("#help_box").css('borderWidth'));
		$("#help_box").css("padding-left","0px");
		$("#help_box").css("padding-right","0px");
		$("#help_box").css("max-width",""+(body_width+100)+"px"); //on ajoute 100 pour avoir de la marge en plus, au cas où...
		$("#help_box").css("width",""+(body_width-help_box_border_width*2)+"px"); //on enleve l'epaisseur du border pour qu'il n'y ai pas de décalage
		$("#help_box").css("height",""+body_height+"px");
		$("#help_box").css("top","0px");
		$("#help_box_content").addClass("help_box_content_config_for_mobile");	
}*/

$("#help_box").css("width",""+($("body").width()-16)+"px");

function Appear_help_box(definition_name, click_position_left, click_position_top)
{/*
	if(!isMobile())
	{
		var position_left = click_position_left;
		var position_top = click_position_top;
		
		var definition_html_to_add = $("#"+definition_name).html();
		$("#help_box_content").empty();
		
		$("#help_box_content").append(definition_html_to_add);
		
		var help_box_new_width = $("#help_box").width();
		var help_box_new_height = $("#help_box").height();
		
		if((position_left+help_box_new_width)>body_width)
		{
			position_left -= help_box_new_width;
		}
		if((position_top+help_box_new_height)>body_height)
		{
			position_top -= help_box_new_height;	
		}
		Display_block("#help_box");
		$("#help_box").css("left",""+position_left+"px");
		$("#help_box").css("top",""+position_top+"px");
	}
	else
	{*/
		var definition_html_to_add = $("#"+definition_name).html();
		$("#help_box_content").empty();
		$("#help_box_content").append(definition_html_to_add);
		$(".blurable").addClass("blur");
		Display_block("#help_box");
		
	/*}*/
}


$("body").on("click", function(e){
		if($("#help_box").css("display")=="block")
		{
			Display_none("#help_box");
			$(".blurable").removeClass("blur");
		}
		

});

$(".definition").on("click", function(e){
	e.stopPropagation();
	var definition_name = $(this).attr('class').split(' ')[0];
	var event_position_left = e.pageX;
	var event_position_top = e.pageY;
	Appear_help_box(definition_name, event_position_left, event_position_top);

});

//CSS A REACTIVER SI CHANGEMENT DE TAILLE D'ECRAN (agrandissement de la fenetre ou changement de résolution). CONCERNE EN FAIT TOUT CE QUE JE N'AI PAS REUSSI A FAIRE AVEC LE CSS PURE

function Refresh_css()
{
	var td_width = ($("table").width()/7);
	$("td").css("height",""+td_width+"px");
	
	$("#help_box").css("width",""+($("body").width()-16)+"px");
	
	var ideo_width = $("body").width();
	$("#menu_chapters").css("width",""+ideo_width+"px");
}


window.onresize = function(event) {
    Refresh_css();
};



var index = document.getElementById("index");
var ideo = document.getElementById("ideo");

index.addEventListener('touchstart', handleTouchStart, false);        
index.addEventListener('touchmove', handleTouchMove, false);

ideo.addEventListener('touchstart', handleTouchStart, false);        
ideo.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;                                                        

function handleTouchStart(evt) {                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
			Close_section();
        } else {
            /* right swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */ 
        } else { 
            /* down swipe */
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};


//FONCTION 

$("#post_these").on("mousemove", function(){
	$(this).css("opacity",1);
	$(this).children("p").css("opacity",1);
});
$("#post_these").on("mouseleave", function(){
	$(this).children("p").css("opacity",0);
	$(this).css("opacity",0.6);
});



//PARTIE GEOLOCALISATION


//FONCTION DE CREATION DE MAP
var map
function initMap() {
  // Create a map object and specify the DOM element for display.
	map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 34.0132500, lng: -6.8325500},
    scrollwheel: true,
    zoom: 8
  });
  
  map.addListener('click', function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
	if(enemy_selection_mode)
	{
		var enemy_markers_length = Length_of_associative_array(enemy_markers);
		Create_marker(1, new Date().getUTCMilliseconds(), lat, lng, "", true, "ENEMYENEMYENEMY"+enemy_markers_length+"");		
	}
  });
 
}

initMap();

var my_marker;
var ally_markers = [];
var enemy_markers = [];
var polylines = []; //en premier indice on enregistre les coordonnées lat et lng (associé au marker), et en deuxieme indice on enregistre l'objet polyline (associé au marker) lui meme
var polylines_from_ally = []; //les polylines des alliés

// FONCTION DE CREATION DE MARKER

function Create_marker(ally_or_ennemy_or_ally_polyline_marker, name_or_id_if_enemy, lat, lng, marker_name_for_ally_polyline, visible_or_not_when_created, enemy_name_if_enemy)
{
	var pin_color = "";
	var visible_or_not = map;
	var name_pin = name_or_id_if_enemy; 
	if(!visible_or_not_when_created)
	{
		visible_or_not = null;
	}
	if(ally_or_ennemy_or_ally_polyline_marker==0 || ally_or_ennemy_or_ally_polyline_marker==2)
	{
		pin_color ="0000ff";
	}
	else if(ally_or_ennemy_or_ally_polyline_marker==1 || ally_or_ennemy_or_ally_polyline_marker==3)
	{
		pin_color ="ff0000";
		name_pin = enemy_name_if_enemy; 
	}
	else // s'il s'agit de mon marker
	{
		pin_color ="00ffff";
	}
	var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+name_pin+"|"+pin_color+"|"+pin_color+"|");
	var latlng = new google.maps.LatLng(lat, lng);
	if(ally_or_ennemy_or_ally_polyline_marker == 0)
	{	// on ajoute dans le tableau ally_markers : le marker (fixe), le marker fixe a l'issue du drag, et le marker draggable qui sera utilisé pour le tracé du parcours. Donc trois élements (markers) dans chaque element du array. 
		ally_markers[name_or_id_if_enemy] = [new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:false}), new google.maps.Marker({position: latlng, map: map, icon: pin_image, opacity: 0, draggable:true}), new google.maps.Marker({position: latlng, map: map, icon: pin_image, opacity: 0, draggable:true})]; 
		ally_markers[name_or_id_if_enemy][0].setMap(visible_or_not);
		ally_markers[name_or_id_if_enemy][1].setMap(visible_or_not);
		ally_markers[name_or_id_if_enemy][2].setMap(visible_or_not);
		Add_events_ally_markers(ally_markers[name_or_id_if_enemy], name_or_id_if_enemy);
		polylines[name_or_id_if_enemy] = [4]; //en effet pour chaque element de l'array polylines, il y a quatre élements (les coordonnées en premier indice, l'objet en lui-meme en deuxieme indice, la derniere position du polyline en troisieme indice, le booleen qui dit s'il s'agit d'un allié ou d'un enemi)
		polylines[name_or_id_if_enemy][3] = true;
		polylines[name_or_id_if_enemy][0]= []; // on fait cette déclaration pour pouvoir utiliser le push avec les coordonnées du polylines de ce nom (rappel : les coordonnées sont en premier indice)
	}
	else if(ally_or_ennemy_or_ally_polyline_marker == 1)
	{
		enemy_markers[name_or_id_if_enemy]=[new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:true}), new google.maps.Marker({position: 0, map: map, icon: pin_image, opacity: 0, draggable:true}), enemy_name_if_enemy]; 
		enemy_markers[name_or_id_if_enemy][0].setMap(visible_or_not);
		enemy_markers[name_or_id_if_enemy][1].setMap(visible_or_not);
		Add_events_enemy_markers(enemy_markers[name_or_id_if_enemy], name_or_id_if_enemy);
		polylines[name_or_id_if_enemy] = [4]; //en effet pour chaque element de l'array polylines, il y a quatre élements (les coordonnées en premier indice, l'objet en lui-meme en deuxieme indice, la derniere position du polyline en troisieme indice, le booleen qui dit s'il s'agit d'un allié ou d'un enemi)
		polylines[name_or_id_if_enemy][3] = false;
		
		polylines[name_or_id_if_enemy][0]= []; // on fait cette déclaration pour pouvoir utiliser le push avec les coordonnées du polylines de ce nom (rappel : les coordonnées sont en premier indice)		
	}
	else if(ally_or_ennemy_or_ally_polyline_marker == 2)//S'il sagit d'un marker allié de polyline allié
	{

		polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][1] = new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:false}) ;	
		polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][1].setMap(visible_or_not);	
	}
	else if(ally_or_ennemy_or_ally_polyline_marker == 3)//S'il sagit d'un marker ennemi de polyline allié
	{

		polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][1] = new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:false}) ;	
		polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][1].setMap(visible_or_not);
		polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][2] = enemy_name_if_enemy; //si c'est un ennemi, alors son id sera stocké	en troisieme indice
		google.maps.event.addListener(polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][1], 'dblclick', function(event) {
			alert("id is "+polylines_from_ally[marker_name_for_ally_polyline][name_or_id_if_enemy][2]);

		});		
	}
	else
	{
		my_marker = new google.maps.Marker({position: latlng, map: map, icon: pin_image, draggable:false});
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
		Remove_current_polyline_if_redraw(true, marker_name);
	});

	google.maps.event.addListener(ally_markers_name[2], 'dragend', function(event) {
		Place_marker_at_the_end_of_polyline(true, marker_name);
	});

	google.maps.event.addListener(ally_markers_name[2], 'drag', function(event) {
		Trace_polyline_while_draging_marker(true, marker_name, 2);
	});
	
	google.maps.event.addListener(ally_markers_name[1], 'dblclick', function(event) {
		Place_marker_at_the_position_of_an_other_marker(ally_markers_name[1], ally_markers_name[0]);
		ally_markers_name[1].setOpacity(0);
		Remove_current_polyline_if_redraw(true, marker_name);
	});		
	
	
	// pour l'indice 1
	
	google.maps.event.addListener(ally_markers_name[1], 'dragstart', function(event) {
		//note : cette fois on ne reinitialise pas le tracé a zero car on ne fait pas un nouveau tracé avec le dragstart, mais on continue le tracé qui exitse deja;
	});



	google.maps.event.addListener(ally_markers_name[1], 'drag', function(event) {
		Trace_polyline_while_draging_marker(true, marker_name, 1);
	});	
}

$("body").on("keyup", function(e){
	if (e.keyCode == 74) //"j"
	{
		Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(false);
		alert("enemy markers 1 out of the map !");
	}
	else if (e.keyCode == 75 && ally_name_of_polyline_at_screen == login)//keycode 75 = "k" et en effet il faut aussi que l'ally_name_of_polyline_at_screen soit notre propre polylines car on ne doit pas pouvoir dessiner de polylines si l'on est en train de visualiser le polyline d'un allié 
	{
		Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(true);
		alert("enemy markers 1 there !");
	}
	else if (e.keyCode == 32)
	{
		Remove_all_plans(false, true);
	}
});

function Add_events_enemy_markers(enemy_markers_name, marker_name)
{
	google.maps.event.addListener(enemy_markers_name[0], 'dragstart', function(event) {
	});	
	google.maps.event.addListener(enemy_markers_name[0], 'dragend', function(event) {
		//Place_marker_at_the_position_of_an_other_marker(enemy_markers[marker_name][1], enemy_markers_name[0]);
	});

	google.maps.event.addListener(enemy_markers_name[0], 'click', function(event) {
		enemy_name_and_id_selected_by_click[0] = marker_name;
		enemy_name_and_id_selected_by_click[1] = enemy_markers[marker_name][2];
	});	

	google.maps.event.addListener(enemy_markers_name[1], 'click', function(event) {
		enemy_name_and_id_selected_by_click[0] = marker_name;
		enemy_name_and_id_selected_by_click[1] = enemy_markers[marker_name][2];
	});	
		
	
	google.maps.event.addListener(enemy_markers_name[0], 'dblclick', function(event) {
		alert("id is "+marker_name+" and name is "+enemy_markers[marker_name][2]);
		if(ally_name_of_polyline_at_screen == login) // on ne peut tracer de polylines d'enemi que si l'on visualise notre polylines (c'est comme pour les alliés)
		{
			if(enemy_markers[marker_name][1].getOpacity() == 0)
			{
				Place_marker_at_the_position_of_an_other_marker(enemy_markers[marker_name][1], enemy_markers_name[0]);
				Remove_current_polyline_if_redraw(false, marker_name);			
			}
			else
			{
				Place_this_enemy_marker_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(marker_name, false);		
				enemy_markers[marker_name][1].setOpacity(0);
				Remove_current_polyline_if_redraw(false, marker_name);			
			}			
		}
	});

	
	// pour l'indice 1
	
	google.maps.event.addListener(enemy_markers_name[1], 'dragstart', function(event) {
		enemy_markers[marker_name][1].setOpacity(1);
		//Remove_current_polyline_if_redraw(false, marker_name);
	});

	google.maps.event.addListener(enemy_markers_name[1], 'dragend', function(event) {
		Place_marker_at_the_end_of_polyline(marker_name);
	});

	google.maps.event.addListener(enemy_markers_name[1], 'drag', function(event) {

		Trace_polyline_while_draging_marker(false, marker_name, 1);
	});
	google.maps.event.addListener(enemy_markers_name[1], 'dblclick', function(event) {
		alert("id is "+marker_name+" and name is "+enemy_markers[marker_name][2]);
		Place_this_enemy_marker_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(marker_name, false);		
		enemy_markers[marker_name][1].setOpacity(0);
		Remove_current_polyline_if_redraw(false, marker_name);
	});	
	
	
	
	// pour l'indice 1
	/*
	google.maps.event.addListener(enemy_markers_name[1], 'dragstart', function(event) {
		//note : cette fois on ne reinitialise pas le tracé a zero car on ne fait pas un nouveau tracé avec le dragstart, mais on continue le tracé qui exitse deja;
	});



	google.maps.event.addListener(enemy_markers_name[1], 'drag', function(event) {
		Trace_polyline_while_draging_marker(false, marker_name, 1);
	});	*/
}



function Send_my_position_and_my_enemies_positions()
{alert("send my positions2");
	var my_lat_and_lng = Extract_lat_and_lng_from_position(my_marker.getPosition());
	var enemies_position = [];
	var enemy_markers_length = Length_of_associative_array(enemy_markers);
	if(enemy_markers_length != 0) // si le tableau de mes ennemis contient bien des ennemis
	{	enemies_position ={};
		for (var key in enemy_markers) 
		{
			
			var lat_and_lng_to_extract = Extract_lat_and_lng_from_position(enemy_markers[key][0].getPosition());
			lat_and_lng_to_extract[2] = enemy_markers[key][2];
			 //oui il faut faire un objet : si on le fait avec un array (comme ceci : enemies_position =[]) on ne peut plus l'envoyer avec le socket, je ne sais pas pourquoi !
			enemies_position[key] = lat_and_lng_to_extract;
			
		}
	}
	alert("send my positions2");
	socket.emit('position_and_enemies_position', login, my_lat_and_lng, enemies_position);	
}

$("body").on("keydown", function(e){
	if(e.keyCode == 82)
	{
		Send_my_position_and_my_enemies_positions();
	}	
});


socket.on('get_position_and_enemies_position', function(login_of_ally,  my_lat_and_lng, enemies_positions_of_ally){
	alert("go for allies positions");
	Create_or_update_ally_marker(login_of_ally, my_lat_and_lng.lat, my_lat_and_lng.lng);
	alert("go for enemies positions");
	Create_or_update_enemy_markers(enemies_positions_of_ally);
	alert("done");
	if(ally_name_of_polyline_at_screen == login_of_ally) // si l'on visualise le polyline de cet allié, on le réactualise directement, sans avoir a cliquer sur le nom de l'allié, vu que le polyline a l'ecran est celui de cet allié
	{
		Switch_polyline(login_of_ally);
	}
	
	
});

function Create_or_update_ally_marker(login_of_ally, lat, lng)
{alert("receved");
		var ally_already_exists = Check_if_associative_array_contains_element(ally_markers, login_of_ally)
		if(!ally_already_exists) // si l'allié est nouveau dans notre liste on cree son marker
		{
			Create_marker(0, login_of_ally, lat, lng, "", true);
		}
		else // si l'allié est deja dans notre liste, on ne fait qu'updater la position sans creer de nouveau marker puisqu'il existe deja
		{
			var latlng = new google.maps.LatLng(lat, lng);
			ally_markers[login_of_ally][0].setPosition(latlng);
			ally_markers[login_of_ally][2].setPosition(latlng);
		}
		
}



function Create_or_update_enemy_markers(enemies_positions)
{
	
	alert("number of enemies of the ally ="+ Length_of_associative_array(enemies_positions));
	if(Length_of_associative_array(enemies_positions)>0)
	{
		var enemy_markers_1_opacity_array_for_each_key = Enemy_markers_1_opacity_array_for_each_key();
		Remove_all_allies_markers_or_enemies_markers(false, true);
		for (key in enemies_positions)
		{	
			alert("OOOOOOOOOOOOOOOOOOOK enemies_positions[key][2] = "+enemies_positions[key][2]);
			var lat = enemies_positions[key].lat;
			var lng = enemies_positions[key].lng;
			var name_enemy = enemies_positions[key][2];
			alert("enemy name receved before loop="+ key);
			//var enemy_already_exists = Check_if_associative_array_contains_element(enemy_markers, key);
			alert("ok coco0");

			if(polylines[key]!=undefined)
			{
				if(polylines[key][1]!=undefined)
				{
					polylines[key][1].setMap(null);
				}
			var polylines_of_this_enemy_data = polylines[key][0];("ok coco");
			var last_position_of_polyline = polylines[key][2];
			var enemy_markers_1_opacity = enemy_markers_1_opacity_array_for_each_key[key];
			Create_marker(1, key, lat, lng, "", true, name_enemy);
			polylines[key][0] = polylines_of_this_enemy_data;
			polylines[key][2] = last_position_of_polyline;
			enemy_markers[key][1].setPosition(polylines[key][2]);
			Trace_polyline_from_position(polylines[key][0], true, key);
			alert("enemy_markers[key][1] OPACITY "+enemy_markers_1_opacity);
			enemy_markers[key][1].setOpacity(enemy_markers_1_opacity);
			}
			else
			{
				Create_marker(1, key, lat, lng, "", true, name_enemy);
			}
						
			/*VERSION PRECEDENTE DE L'UPDATE DES MARKERS ENEMIS OU L'ON N ENLEVAIT PAS TOUS LES MARKERS ENEMIS POUR LES RECREER ENSUITE, DANS UN BUT DE PERFORMANCES. MAIS FINALEMENT LA METHODE PRECEDENTE DE REMPLACEMENT TOTALE A ETE CHOISIE POUR DES RAISONS DE CLARTE ET D ORGANISATION, VOICI DONC LA VERSION PRECEDENTE:
			if(!enemy_already_exists) // si l'enemi est nouveau dans notre liste on cree son marker
			{	alert("enemy name receved ="+ key);
				Create_marker(1, key, lat, lng, "", true);
			}
			else // si l'enemi est deja dans notre liste, on ne fait qu'updater la position sans creer de nouveau marker puisqu'il existe deja
			{
				var latlng = new google.maps.LatLng(lat, lng);
				enemy_markers[key][0].setPosition(latlng);
				alert("enemy known and his name is = "+key);
			}
			*/
			alert("enemy of ally created");
		}
	}	
}

function Enemy_markers_1_opacity_array_for_each_key()
{
	var enemy_markers_1_opacity_array_for_each_key = [];
	
	for(id_enemy in enemy_markers)
	{
		enemy_markers_1_opacity_array_for_each_key[id_enemy] = enemy_markers[id_enemy][1].getOpacity();
		alert("enemy_markers[id_enemy][1].getOpacity() = "+enemy_markers[id_enemy][1].getOpacity());
	}
	return enemy_markers_1_opacity_array_for_each_key;
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
	
	if (e.keyCode == 80) //p
	{	
		if(ally_name_of_polyline_at_screen == login) // si l'on visualise bien notre polyline, on peut l'envoyer (car on ne peut pas envoyer son polyline en visualisant celui d'un allié)
		{
			Send_polylines(login, polylines);	
		}
	}
	
	
});



//PARTIE POLYLINES



function Remove_current_polyline_if_redraw(ally_or_enemy_bool, marker_name)
{
	polylines[marker_name][0] =[]; //on reinitialise le tracé a zero car on fait un nouveau tracé avec le dragstart
	polylines[marker_name][1].setMap(null);
	polylines[marker_name][1]=undefined;
	if(ally_or_enemy_bool)
	{
		ally_markers[marker_name][1].setOpacity(0);
	}
	else
	{
		enemy_markers[marker_name][1].setOpacity(0);
	}
	
}


function Place_marker_at_the_end_of_polyline(ally_or_enemy_bool, marker_name)
{
		
		if(ally_or_enemy_bool)
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
			var latlng_marker_after_move = enemy_markers[marker_name][0].getPosition();
			enemy_markers[marker_name][1].setPosition(latlng_marker_after_move);
			enemy_markers[marker_name][1].setOpacity(1);		
		}
}


function Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(bool_end_of_the_map_or_at_this_enemy_marker_0_position)
{
	if(!bool_end_of_the_map_or_at_this_enemy_marker_0_position)
	{
		for (name in enemy_markers)
		{
			var latlng = new google.maps.LatLng(-83.02621885344846, -125.859375); // ce sont les coordonnées de l'antarctique ! l'idée est de perdre ce marker dans une position lointaine
			enemy_markers[name][1].setPosition(latlng);
			enemy_markers[name][1].setOpacity(0);
		}
	}
	else
	{
		for (name in enemy_markers)
		{
			var latlng = enemy_markers[name][0].getPosition(); 
			enemy_markers[name][1].setPosition(latlng);
			enemy_markers[name][1].setOpacity(0);
		}
	}
}

function Place_this_enemy_marker_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(name, bool_end_of_the_map_or_at_this_enemy_marker_0_position)
{
	if(!bool_end_of_the_map_or_at_this_enemy_marker_0_position)
	{

		var latlng = new google.maps.LatLng(-83.02621885344846, -125.859375); // ce sont les coordonnées de l'antarctique ! l'idée est de perdre ce marker dans une position lointaine
		enemy_markers[name][1].setPosition(latlng);
		enemy_markers[name][1].setOpacity(0);
		
	}
	else
	{

		var latlng = enemy_markers[name][0].getPosition(); 
		enemy_markers[name][1].setPosition(latlng);
		enemy_markers[name][1].setOpacity(0);
		
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
		if(ally_or_enemy_bool)
		{
			latlng = ally_markers[marker_name][marker_after_drag_or_while_drag].getPosition();
		}
		else
		{
			latlng = enemy_markers[marker_name][marker_after_drag_or_while_drag].getPosition();			
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

//FONCTIONS DE TRANSFERT DU TRACE AUX ALLIES

socket.on('polylines_from_ally', function(ally_name, polylines_coordinates_from_ally){
	alert("id 0: "+polylines_coordinates_from_ally[1].name_enemy);
	Create_polylines_from_ally(ally_name, polylines_coordinates_from_ally);
	if(ally_name_of_polyline_at_screen == ally_name) // si l'on visualise le polyline de cet allié, on le réactualise directement, sans avoir a cliquer sur le nom de l'allié, vu que le polyline a l'ecran est celui de cet allié
	{
		Switch_polyline(ally_name);
	}
	
});



//FONCTIONS D'AFFICHAGE DES TRACE TRANSFERES


function Create_polylines_from_ally(ally_name, polylines_coordinates_concerned)
{	
	Remove_plan(ally_name); //on retire d'abord de l'écran les polylines associés a ce nom s'ils existent
	alert("creating");
	var i=0;
	var polylines_coordinates_concerned_length = polylines_coordinates_concerned.length;
	polylines_from_ally[ally_name] = [];
	for (i=0; i<polylines_coordinates_concerned_length; i++)
	{
		polylines_from_ally[ally_name][polylines_coordinates_concerned[i].name] =[];
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
			if(polylines_coordinates_concerned[i].ally_or_enemy_bool== true)// s'il s'agit d'un marker d'allié envoyé par l'allié
			{
				Create_marker(2, polylines_coordinates_concerned[i].name, last_lat_polyline_position , last_lng_polyline_position, ally_name, false);	
			}
			else// s'il s'agit d'un marker d'ennemi envoyé par l'allié
			{
				Create_marker(3, polylines_coordinates_concerned[i].name, last_lat_polyline_position , last_lng_polyline_position, ally_name, false, polylines_coordinates_concerned[i].name_enemy);	
			}				
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
		var ally_or_enemy_bool = polylines[key][3];
		
		for(i=0; i<polylines_key_length; i++)
		{
			var lat_and_lng_from_position_extracted = Extract_lat_and_lng_from_position(polylines[key][0][i]);
			polyline_array_for_each_key.push(lat_and_lng_from_position_extracted);							
		}	
		var name_enemy ="";

		if(Check_if_associative_array_contains_element(enemy_markers, key))
		{
			name_enemy = enemy_markers[key][2];
		}
		polylines_coordinates_array[k] = {name:key, polyline: polyline_array_for_each_key, ally_or_enemy_bool: ally_or_enemy_bool, name_enemy: name_enemy}; 
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
	socket.emit('polylines_from_ally', name, polylines_coordinates); //on envoit les coordonées de notre polyline	
	
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

$("body").on("keydown", function(e){
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
});

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





var unite_name = "";

$("#unite_name_input").on("keydown", function(e){
	if(e.keyCode == 13)
	{
		unite_name = $(this).val();
		Send_my_unite_name();
	}
});

$("#unite_name_input").on("blur", function(e){
	if(unite_name != "")
	{
		$(this).val(unite_name);		
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
{	Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(false); // on retire les markers ennemis draggables pour les polylines d'ennemis
	if(polylines!= [])
	{	
		for (var key in polylines)
		{	alert("polylines[key][1] is "+polylines[key][1]);
			if(polylines[key][1] != undefined) //si polylines contient bien un marker et un polyline associé à ce nom
			{
				var line = polylines[key][1];
				Remove_line(line);
				if(polylines[key][3])
				{
					ally_markers[key][1].setOpacity(0); // s'il s'agit bien d'un polyline d'allié
				}
				else
				{
					enemy_markers[key][1].setOpacity(0);// s'il s'agit bien d'un polyline d'ennemi
				}
			}
		}
	}
	if(polylines_from_ally!= [])
	{
		for(var key_1 in polylines_from_ally)
		{
			if(polylines_from_ally[key_1] != undefined)
			{				
				for (var key_2 in polylines_from_ally[key_1])
				{	
					if(polylines_from_ally[key_1][key_2] != undefined && polylines_from_ally[key_1][key_2][0] != undefined && polylines_from_ally[key_1][key_2][1] != undefined)
					{	
						var line = polylines_from_ally[key_1][key_2][0];
						var marker = polylines_from_ally[key_1][key_2][1];
						Remove_line(line);
						Remove_marker(marker);
						
					}
				}
			}
		}
	}	
}

function Remove_all_allies_markers_or_enemies_markers(allies, enemies) //booleen : si allies true on remove les alliés, si enemies true on remove les enemies
{
	alert("go remvoe");
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
	{alert("Length_of_associative_array(enemy_markers) = "+Length_of_associative_array(enemy_markers));
		for(key in enemy_markers)
		{
			Remove_marker(enemy_markers[key][0]);
			Remove_marker(enemy_markers[key][1]);
		}
		enemy_markers = [];
		alert("nice 2");
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
				//le probleme est la
				polylines[key][1].setMap(map);
				alert(polylines[key][3]);
				if(polylines[key][3] ==true) //s'il s'agit d'un allié
				{
					ally_markers[key][1].setPosition(polylines[key][2]);
					ally_markers[key][1].setOpacity(1);					
				}
				else
				{//s'il s'agit d'un ennemi
					enemy_markers[key][1].setPosition(polylines[key][2]);
					enemy_markers[key][1].setOpacity(1);						
				}

				alert("ok show polylines");
			}
		}
	}
	else if(Length_of_associative_array(polylines_from_ally)>0)
	{

		for(var key_1 in polylines_from_ally)
		{
			if(Length_of_associative_array(polylines_from_ally[key_1])>0)
			{
				for (var key_2 in polylines_from_ally[key_1])
				{
					if(polylines_from_ally[key_1][key_2] != "" && polylines_from_ally[key_1][key_2][0] != "" && polylines_from_ally[key_1][key_2][1] != undefined)
					{
						polylines_from_ally[key_1][key_2][0].setMap(map);
						polylines_from_ally[key_1][key_2][1].setMap(map);
						alert("ok show show polylines from ally");
					}
				}
			}
		}
	}
	alert("ok show end");
} 





//fonctions de transfert de noms d'alliés et d'unités

function Send_my_unite_name()
{
	socket.emit('send_my_unite_name', unite_name, login); //on envoit les coordonées de notre polyline
}


socket.on('get_my_unite_name', function(this_unite_name, this_login){
	if(this_unite_name == unite_name && !Check_if_have_ally(this_login))
	{
		Append_ally_to_allies_list(this_login);
		Send_my_position_and_my_enemies_positions();
		Send_my_unite_name();
		
	}
});


function Append_ally_to_allies_list(name){
	$("#allies_list").append("<div class='ally_name'>"+name+"</div>");
	
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
	Place_all_enemy_markers_indice_1_at_the_end_of_the_map_or_at_this_enemy_marker_0_position(false); //on retire tous les enemy_markers 1 (draggables) pour qu'ils ne soit plus utilisables quand on visualise le polyline d'un allié
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
{	
	if(e.keyCode == 78) //code pour "n"
	{
		Switch_polyline(login);
	}
});

var enemy_markers_polylines_mode = false;

$("body").on("keydown", function(e)
{	
	if(e.keyCode == 71) //code pour "g"
	{
		enemy_selection_mode = true;
	}
});

$("body").on("keyup", function(e)
{	
	if(e.keyCode == 71) //code pour "g"
	{
		enemy_selection_mode = false;
	}
});

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


var enemy_name_and_id_selected_by_click = [];


$("#enemy_name_input").on("keyup", function(e){
	if(e.keyCode == 13)
	{
		var my_enemy_new_name = $(this).val();
		//Change_enemy_name_of_selected_enemy_marker(my_enemy_new_name);
		//alert("enemy_name_and_id_selected_by_click : "+enemy_name_and_id_selected_by_click);
		alert("my_enemy_new_name "+ my_enemy_new_name);
		alert("enemy_name_and_id_selected_by_click[0] "+ enemy_name_and_id_selected_by_click[0]);
		alert("enemy_name_and_id_selected_by_click[1] "+ enemy_name_and_id_selected_by_click[1]);
		Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(enemy_name_and_id_selected_by_click[0], my_enemy_new_name);
		socket.emit('change_name_enemy', enemy_name_and_id_selected_by_click[0], my_enemy_new_name); //on envoit les coordonées de notre polyline
	}
});

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
function Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(id_enemy, new_name)
{
	
	var pin_image = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+new_name+"|ff0000|ff0000|");
	
	

	enemy_markers[id_enemy][0].setIcon(pin_image);
	enemy_markers[id_enemy][1].setIcon(pin_image);
	enemy_markers[id_enemy][2] = new_name;
	
	for (ally_name in polylines_from_ally)
	{
		if(polylines_from_ally[ally_name][id_enemy]!= undefined)
		{
			polylines_from_ally[ally_name][id_enemy][1].setIcon(pin_image);
			polylines_from_ally[ally_name][id_enemy][2] = new_name;
		}
	}
	
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


socket.on('get_change_name_enemy', function(id_enemy, new_name_enemy){
	alert("got it");
	Change_enemy_name_in_enemy_markers_and_polylines_and_polylines_from_ally(id_enemy, new_name_enemy);
	alert("done");
});







// le timer





//sur mobile:

$("body").on("click", function(){
	enemy_selection_mode = true;
});










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