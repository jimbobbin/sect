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

function Change_button_hover_for_mobile_and_no_mobile()
{
	if(isMobile())
	{
		$(".button").removeClass("button").addClass("button_mobile");
		$(".button_2").removeClass("button_2").addClass("button_mobile");
		$(".button_chapter").removeClass("button_chapter").addClass("button_mobile");
		$(".button_schema").removeClass("button_schema").addClass("button_mobile");

		$(".button_mobile").on("touchstart", function(){
			$(this).css("color","orange");
		});
		$(".button_mobile").on("touchmove touchend", function(){
			$(".button_mobile").css("color","black");
			$(this).css("font-width","normal");
		});
		$(".button_mobile").on("mouseleave mouse", function(){
			$(".button_mobile").css("color","black");
			$(this).css("font-width","normal");
		});
		class_number_for_button_schema = 1;
	}
	else
	{
		class_number_for_button_schema = 2;
		$("th, td").addClass("button_th_td_no_mobile");
	}

}
Change_button_hover_for_mobile_and_no_mobile();
var body_width = $("body").width();
var body_height = $("body").height();






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


  
  $("#integral_txt_cache").swipe( {allowPageScroll:"horizontal", allowPageScroll:"vertical",
    //Generic swipe handler for all directions
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) { 
	  if(direction=="left" && distance>200 && duration <500)
	  {
		window.location.replace("index.html");
	  }
    }
  });




if(!isMobile())
{
	$("#arrow_left_window").on("mousemove", function(e){
		if (Check_if_article_visible_and_txt_integral_invisible())
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
		window.location.replace("index.html");
	});
}


function Check_if_article_visible_and_txt_integral_invisible()
{
	var $this = $("#ideo");
	var result = false;
	
		$this.each(function(){
			if ($(this).css("display")=="block")
			{				
				result = true;
			} 	
		});
	return result;		
}

//------------------------------------------------------ INSERTION DU TEXTE ---------------------------------------------------------


var ch_max = 22;
var i
for(i=1; i<ch_max; i++){
	$('#ch_'+i+'').load("public/ch_"+i+"/ch_"+i+".html");
} 









//------------------------------------------------------ INSERTION DES IMAGES ---------------------------------------------------------

 $("#integral_txt").on("click", ".sch", function(e){

		 if(!isMobile())
		 {
			if($("#menu_chapters").css("opacity") == 0 && $("#menu_schemas").css("opacity") == 0)
			{	 
				 $("#menu_chapters").css("display","none");
				 $("#menu_schemas").css("display","none");
				 var sch_id = $(this).attr("id");
				 $("#integral_txt").css("display","none");
				 $("#sch").css("display","block");
				 $("#"+sch_id+"_pic").css("display","block");
			}			  
		 }
		 else if(e.pageY > 50 && e.pageY < $("body").height()-50)
		 {
			if($("#menu_chapters").css("display") == "none" && $("#menu_schemas").css("display") == "none")
			{	 
				 var sch_id = $(this).attr("id");
				 $("#integral_txt").css("display","none");
				 $("#sch").css("display","block");
				 $("#"+sch_id+"_pic").css("display","block");
			}			  
		 }	
 
}); 


//------------------------------------------------------ FONCTION DIVERSES ---------------------------------------------------------
// Fonction de retrait de l'image affichée
$("#sch").on("click", function(){
	$(this).css("display","none");
	$(".img").css("display","none");
	$("#integral_txt").css("display","block");
	if(isMobile())
	{
		$("#menu_chapters, #menu_schemas").css("display","none");
	}
	else
	{
		$("#menu_chapters, #menu_schemas").css("display","block");
	}
	$("#menu_chapters, #menu_schemas").css("opacity",0);
});




var class_number_for_button_schema
// Fonction d'affichage d'image quand on clique sur un title_schema de menu_schemas
$(".title_schema").on("click", function(e){

		var class_name = $(this).attr('class').split(' ')[class_number_for_button_schema];
		$("#menu_chapters, #menu_schemas").css("display","none");
		$("#integral_txt").css("display","none");
		$(".img").css("display","none");
		$("#sch").css("display","block");
		$("#sch ."+class_name+"").css("display","block");
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
{
	$("#integral_txt_cache").on("click", function(e){
		if(e.pageY < 50)
		{
			$("#menu_schemas").css("display","none");
			$("#menu_schemas").css("opacity",0);
			$("#menu_chapters").css("display","block");
			$("#menu_chapters").css("opacity",1);
		}
		else if(e.pageY > $("body").height()-50)
		{	
			$("#menu_chapters").css("display","none");
			$("#menu_chapters").css("opacity",0);
			$("#menu_schemas").css("display","block");
			$("#menu_schemas").css("opacity",1);
		}
		else 
		{
			$("#menu_chapters, #menu_schemas").css("display","none");
			$("#menu_chapters, #menu_schemas").css("opacity",0);
		}

	});
}

/*
if(isMobile())
{
	$("#menu_chapters").on("click", function(e){
		$(this).css("opacity", 1);
		$("#menu_schemas").css("opacity", 0);
		
	});
	$("#menu_schemas").on("click", function(e){
		$(this).css("opacity", 1);
		$("#menu_chapters").css("opacity", 0);
		
	});
	$("#integral_txt_cache").on("click", function(e){
		$("#menu_chapters, #menu_schemas").css("opacity", 0);
	});
}
*/



if (!isMobile())
{
	$("#menu_chapters, #menu_schemas").on("mousemove", function(){
		$(this).css("opacity", "1");
	});

	$("#menu_chapters, #menu_schemas").on("mouseleave", function(){

	$(this).css("opacity", "0");
	});

	$("#integral_txt").on("mousemove", function(){
	$("#menu_chapters, #menu_schemas").css("opacity", "0");
	});


}
if(isMobile())
{
	$("#integral_txt").on("scroll", function(){
		$("#menu_chapters, #menu_schemas").css("display","none");
	});	
}


$("#menu_chapters, #menu_schemas").on("mousewheel DOMMouseScroll", function(e){ // le DOMMouseScroll c'est l'équivalent de mousewheel sur firefox
	e.preventDefault();
     if(e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {
         document.getElementById($(this).attr("id")).scrollLeft -= 100;
     }else {

         document.getElementById($(this).attr("id")).scrollLeft += 100;
     }
});

$(".title_chapter").on("click", function(){
	if($("#menu_chapters").css("opacity") == 1 && $("#menu_chapters").css("display") == "block")
	{
		var title = "ch_"+$(this).attr("id");
		Go_to_word("#"+title+"","#ch_1","#integral_txt");
	}
});




//partie pour le img_cursor
if(!isMobile())
{


	$("#integral_txt").on("mousemove", ".sch", function(e){

			var sch_id = $(this).attr("id");
			var src =  $("#"+sch_id+"_pic img").attr("src"); 
			$("#img_cursor").attr("src",src);
			$("#img_cursor").css("display","block");
			$("#img_cursor").css("left",""+e.pageX+"px");
			$("#img_cursor").css("top",""+e.pageY+"px");		 
		
	}); 

	 $("#integral_txt").on("mouseout mouseleave", ".sch", function(e){
			$("#img_cursor").css("display","none");
			$("#img_cursor").attr("src","");
		 
		
	}); 
	$("#integral_txt_cache").on("mouseout", function(e){
		$("#img_cursor").css("display","none");
	});
}
$("body").fadeTo("fast",1);