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
//var socket0 = io.connect('http://192.168.1.2:8080');
//var socket = io('http://192.168.1.5:8080/member-space');
var socket0 = io.connect('http://sectstore.mybluemix.net/');
var socket = io('http://sectstore.mybluemix.net/member-space');
var member_data = 0;



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
 if(isMobile()) // si c'est un mobile, on enleve badnote dans la page d'index
//{
	$("#badnote").remove();
//}
	

if(isMobile())
{
	$("#post_these a").remove();
	$("#post_these").append('<img src="public/images/post_these_for_mobile.svg" alt=""/>');
	
}
$("#post_these").css("display","block");

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
	 
	
if(isMobile())
{	
  $("#index").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) { 
	  if(direction=="left" && distance>200 && duration <500)
	  {
		Close_section();  
	  }
    }
  });
}

	
	 
// PARTIE INSCRIPTION AUTHENTIFICATION
/*
$("#subscribe_button").on("click", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
	$('.info_message').remove();
	$("#login_form, #subscribe_form").css("display","none");
	$("#subscribe_form").css("display","block");

});*/
/*
$("#login_button").on("click", function(e){
    e.preventDefault();
    e.stopImmediatePropagation();
	$('.info_message').remove();
	$("#subscribe_form, #forgot_pass").css("display","none");

	$("#login_form").css("display","block");

});*/

$("#login_and_nav_div, #connection_disconnection").on("click", function(e){// FONCTION NECESSAIRE POUR MOBILE
    e.stopImmediatePropagation();
});


$("body").children().not("#login_and_nav_div, #connection_disconnection").on("click", function(e){

	$("#login_form, #subscribe_form, #forgot_pass").css("display","none");
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




 socket.on('subscribe_data_to_confirm', function(message) {
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


socket.on('get_login_data', function(docs) { // A VERIIIIIIIIIIIIIIIIIIIIIIIIIIFIE CAR JE LAI AJOUTE SANS LE TESTER
 
member_data = docs;
Close_section(); 
Display_none(".connection, .connection_button, #txt_integral_button");	
Display_none("#post_these");
Display_block(".disconnection");	 	

var message ="Bienvenue " +member_data[0].login+ " !";
Appear_info_message('body', message, 0, 50, true);
connect_disconnect_trigger = true;	

});

socket.on('fail_to_login', function (reason) {

if(reason == "login_already_used"){
	$('.info_message').remove();
	Appear_info_message('#login', "Ce compte est déjà en cours d'utilisation !", 0, 15, false);
}else if (reason == "unknown_login"){
	$('.info_message').remove();
	Appear_info_message('#login', "Ce compte n'existe pas.", 0, 15, false);
}
connect_disconnect_trigger = true;	
});


	 
	 


	 
//FONCTIONS DE L'INDEX

function Switch_badnote_index(to_badnote_or_index)//true pour badnote false pour index
{
	if(to_badnote_or_index)
	{
		$("#index").css("display","none");
		$("#badnote, #post_these").css("display","block");
	}
	else
	{
		$("#badnote").css("display","none");
		$("#index").css("display","block");
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

function Appear_index_menu_only_for_mobile()
{
	$("#index").css("display","block");
	$("#post_these").css("display","none");
}

function Close_section(){

		$(".menu_text_block").css("display","none");
		$(".title_index").css("text-decoration","none"); //on enleve les underline éventuels des titres
		 if(isMobile())
		{
			$("#container_nav_titles").removeClass("container_nav_titles_onfocus");
			$("#container_nav_titles").addClass("container_nav_titles_unfocus");
			$("#container_nav_titles").css("text-align", "left");
			$("#container_nav_titles h3").css("display","block");
			$("#post_these").css("display","block");
			$("#index").css("display","none");
		}
		else
		{
		Switch_badnote_index(true); //on fait disparaitre l'index et on fait apparaitre badnote
		}
	
}

$(".title_index").on("click", function(){
	if(isMobile())
	{
		$("#container_nav_titles").removeClass("container_nav_titles_unfocus");
		$("#container_nav_titles").addClass("container_nav_titles_onfocus");
	}
});

$("#whoweare_title").on("click", function(){
	$("#why_title, #join_title, #democracy_title, #deal_title").css("text-decoration","none");
	if(isMobile())
	{
		$("#why_title, #join_title, #democracy_title, #deal_title").css("display","none");
		$("#container_nav_titles").css("text-align", "center");
	}
	$("#whoweare_title").css("text-decoration","underline");
	$("#why, #join_sect, #democracy, #deal").css("display","none");
	$("#whoweare").css("display","block");
	if(!isMobile())
	{
		Switch_badnote_index(false);
	}
	else
	{
		Appear_index_menu_only_for_mobile();
	}
	
});


$("#why_title").on("click", function(){
	$("#whoweare_title, #join_title, #democracy_title, #deal_title").css("text-decoration","none");
	if(isMobile())
	{
		$("#whoweare_title, #join_title, #democracy_title, #deal_title").css("display","none");
		$("#container_nav_titles").css("text-align", "center");
	}
	$("#why_title").css("text-decoration","underline");
	$("#whoweare, #join_sect, #democracy, #deal").css("display","none");
	$("#why").css("display","block");
	if(!isMobile())
	{
		Switch_badnote_index(false);
	}
	else
	{
		Appear_index_menu_only_for_mobile();
	}
});


$("#join_title").on("click", function(){
	$("#why_title, #whoweare_title, #democracy_title, #deal_title").css("text-decoration","none");
	 if(isMobile())
	{
		$("#why_title, #whoweare_title, #democracy_title, #deal_title").css("display","none");
		$("#container_nav_titles").css("text-align", "center");
	}
	$("#join_title").css("text-decoration","underline");
	$("#whoweare, #why, #democracy, #deal").css("display","none");
	$("#join_sect").css("display","block");
	if(!isMobile())
	{
		Switch_badnote_index(false);
	}
	else
	{
		Appear_index_menu_only_for_mobile();
	}
});

$("#democracy_title").on("click", function(){
	$("#why_title, #whoweare_title, #join_title, #deal_title").css("text-decoration","none");
	if(isMobile())
	{
		$("#why_title, #whoweare_title, #join_title, #deal_title").css("display","none");
		$("#container_nav_titles").css("text-align", "center");
	}
	$("#democracy_title").css("text-decoration","underline");
	$("#whoweare, #why, #join_sect, #deal").css("display","none");
	$("#democracy").css("display","block");
	if(!isMobile())
	{
		Switch_badnote_index(false);
	}
	else
	{
		Appear_index_menu_only_for_mobile();
	}
});

$("#deal_title").on("click", function(){
	$("#why_title, #whoweare_title, #join_title, #democracy_title").css("text-decoration","none");
	if(isMobile())
	{
		$("#why_title, #whoweare_title, #join_title, #democracy_title").css("display","none");
		$("#container_nav_titles").css("text-align", "center");
	}
	$("#deal_title").css("text-decoration","underline");
	$("#whoweare, #why, #join_sect, #democracy").css("display","none");
	$("#deal").css("display","block");
	if(!isMobile())
	{
		Switch_badnote_index(false);
	}
	else
	{
		Appear_index_menu_only_for_mobile();
	}
});




if(!isMobile())
{
	
$(".badnote_off, #index, #arrow_left_window").on("mousemove", function(){
	if($("#badnote").css("display")=="block")
	{
		$("#badnote").fadeOut(250);
		Disapear_badnote_form();
	}
	else
	{
		$("#badnote").css("display","none");
	}
});

$("#badnote").on("mousemove", function(){$(".badnote_form").css("display","block");

	
	$("#badnote").css("display","block");
});



$("html").on("mousemove", function(e){
	
   if(e.target === this && $("#index").css("display")=="none") { //pour ne selectionner que la balise html et seulement si l'index n'est pas visible (si aucun article n'est visible)
		$("#badnote").css("display","none");
   }
});

$("body").on("mousemove", function(e){
	
   if(e.target === this && $("#index").css("display")=="none") { //pour ne selectionner que la balise body et seulement si l'index n'est pas visible (si aucun article n'est visible)
	$("#badnote").css("display","block");
   }
});

	$("#arrow_left_window").on("mousemove", function(e){
		if ($("#index").css("display")=="block")
		{
			$("#arrow_left_window").css("opacity",1);
			$("#arrow_left_window").css("cursor","pointer");
			
		}
		else 
		{
			$("#arrow_left_window").css("opacity",0);
			$("#arrow_left_window").css("cursor","auto");
		}
	});

	$("#arrow_left_window").on("mouseout", function(e){
			$("#arrow_left_window").css("opacity",0);
			$("#arrow_left_window").css("cursor","auto");
	});	
	
	$("#arrow_left_window").on("click", function(e){
			Close_section();
		
	});
}

/*
function Check_if_article_visible()
{
	var $this = $(".menu_text_block");
	var result = false;
	
		$this.each(function(){
			if ($(this).css("display")=="block")
			{				
				result = true;
			} 	
		});
	return result;		
}

*/




//------------------------------------------------------ PARTIE HELPBOX ---------------------------------------------------------

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

function Refresh_css()
{
$("#help_box").css("width",""+($("body").width()-16)+"px");

if (!window.screenLeft && !window.screenX && !window.screenTop && !window.screenY)
{ //si fenetre ouverte a son maximum
	if($("#badnote_garbage").length)
	{
		$("#badnote_garbage").children().appendTo("#badnote");
		$("#badnote_garbage").empty();		
	}

}
else //sinon
{
	if($("#badnote").length)
	{
		$("#badnote").children().appendTo("#badnote_garbage");
		$("#badnote").empty();
	}
}

}
socket.emit("alertclick");

socket.on("alertclick", function(){
		alert("yes");
});

window.onresize = function(event) {
    Refresh_css();
};

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
		$("#help_box").css("display","block");
		
	/*}*/
}


$("body").on("click", function(e){
		if($("#help_box").css("display")=="block")
		{
			$("#help_box").css("display","none");;
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



//------------------------------------------------------ PARTIE ENVOI DE THESE ---------------------------------------------------------

$("#post_these").on("mousemove", function(){
	$(this).css("opacity",1);
	$(this).find("p").css("opacity",1);
});
$("#post_these").on("mouseleave", function(){
	$(this).find("p").css("opacity",0);
	$(this).css("opacity",0.6);
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
			$(".badnote_form").css("display","none");
		}else if(posleft_event<badnote_width){
			$(".badnote_form").css("display","block");
		}

});







}



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
var val = $(".badnote_form .badnote_form_male .forename").val();
var val_without_space = val.replace(" ", "");
$(".badnote_form .badnote_form_male .forename").val(val_without_space);
$(".badnote_form .badnote_form_male .name").focus();
}

}); 						

$(".badnote_form .badnote_form_male .name").on("keyup", function(e){

Capitalize(".badnote_form .badnote_form_male .name");

input_val = $(".badnote_form .badnote_form_male .name").val();

if(Str_contain_char(input_val , " ")){
var val = $(".badnote_form .badnote_form_male .name").val();
var val_without_space = val.replace(" ", "");
$(".badnote_form .badnote_form_male .name").val(val_without_space);
$(".badnote_form .badnote_form_fem .t_forename").focus(); 
}

}); 						



$(".badnote_form .badnote_form_fem .t_forename").on("keyup", function(e){

Capitalize(".badnote_form .badnote_form_fem .t_forename");
Capitalize(".badnote_form .badnote_form_fem .t_name");
input_val = $(".badnote_form .badnote_form_fem .t_forename").val();

if(Str_contain_char(input_val , " ")){
var val = $(".badnote_form .badnote_form_fem .t_forename").val();
var val_without_space = val.replace(" ", "");
$(".badnote_form .badnote_form_fem .t_forename").val(val_without_space);
$(".badnote_form .badnote_form_fem .t_name").focus(); 
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
                alert(message);
            })

			

//FONCTIONS QUI GERENT LES CITATIONS EN ITALIQUE
/*
function Animation_citations(){
	var array_citations = ["Rien de plus vrai que le tri s\351lectif","Notre cible ? Le fort : le m\342le alpha","Ici, les faibles assument et s'unissent", "Secte = Union = Force"];
	$(".citations").text(array_citations[Math.random()*array_citations.length<<0]);
	 
	$( ".citations" ).animate({

  duration: "slow",
  easing: "easein",
		left: "+=100",
		complete: function() {
			// Animation complete.
			
			/*
			
				$( ".citations" ).animate({

					duration: 5000,
					specialEasing: {
					  width: "linear",
					},
					left: "+=300",
					complete: function() {
						// Animation complete.
						
						
						
					}

					
				});
			
		}

	
});
}

Animation_citations();
*/
$("body").fadeTo("fast",1);




/* A REMPLACER POUR AVOIR LES ACCENTS
é : \351
è : \350
ê : \352
à : \340
ô : \364
â : \342
*/