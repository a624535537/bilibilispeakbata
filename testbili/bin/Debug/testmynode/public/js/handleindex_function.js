var window_width_before = $(window).width();

var menu_out = function (){
	$("div.mubu").css({"left":$("div.menubox").width(),"width":$(window).width()-$("div.menubox").width(),"z-index":99});
	$("div.menubox").animate({left:"0"},1000,function(){$("div.mubu").animate({opacity:0.8},500);});
	$(document.body).css("overflow","hidden");
};
var menu_exit =function (){
	$(document.body).css("overflow","visible");
	$("div.menubox").animate({left:$("div.menubox").width()*-1},1000);
	$("div.mubu").animate({opacity:0},1000,function(){$("div.mubu").css({"left":$("div.mubu").css("left")*-1,"z-index":0});})
};
var initi =function (){
	$("div.head").css({"width":$(window).width(),"height":$(window).height()*0.125});
	$("div.menubox,.mubu").css({"width":$(window).width()*0.2,"height":$(window).height(),"left":$("body").width()*0.2*-1});
	
	$("div.mubu").css({"width":$(window).width()-$("div.menubox").css("width"),"height":$(window).height(),"left":$(window).width()*0.2*-1});   $("textarea#comment").css({"width":$("div.comment").width()*0.5*0.5});
	$("div.main").css({"width":$(window).width()-100,"height":$(document).height(),"position":"relative","top":0});
	$("div.comment").css({"width":$(window).width()});
	$("div.comment").hide();
	$("img.logo").css({"margin-left":$(window).width()-300});
	$.getJSON('/title-nu',function(json){titleShow(json);});
		$.ajax({
				type:'POST',
				data:{imghref:'././public/说点什么.txt'},
				url:'/read-docs',
				success:function(json){showdocs(json,'说点什么');				
				}});
	};
var mb_scroll = function (){
	
	$(".menubox,.mubu,.menu").css({"top":$(document).scrollTop()});	
	};
var tc = function (element){
	var size = $(element).children(".tanchu").children("span").css("font-size");
	$(element).children(".tanchu").animate({height:size},500);
	$(element).children(".tanchu").css("width",$(element).children(".tanchu").children("span").width()*2);
	$(element).children(".tanchu").children("span").animate({opacity:"1"},200);		 
	};
var re_size= function (){  
	top=0;
	$("img.logo").css({"margin-left":$(window).width()-300});
	$("div.head").css({"width":$(window).width(),"height":$(window).height()*0.125});
	$("div.menubox,.mubu").each(function() {
	var tag = $(this);
	var this_left = parseInt($(tag).css("left"));
	var this_window_width = $(window).width();
    $(tag).css({"width":$(tag).width()/window_width_before*$(window).width()
		 ,"height":$(tag).parent(window).height()
		 ,"top":top,"left":this_left/window_width_before*this_window_width});});
		 $("div.main").css({"width":$(window).width()-100});
if($("div.showTitle").length>0){
	$("div.comment").css({"width":$(window).width(),"margin-left":"0px"});
	$("div.show").children("*").each(function() {
	var tag = $(this);
	var this_left = parseInt($(tag).css("left"));
	var this_window_width = $(window).width();
	$(tag).css({"width":$(tag).width()/window_width_before*$(window).width()
		,"left":this_left/window_width_before*this_window_width});});}
	$("div.head").css({"width":$(window).width(),"height":$(window).height()*0.125});
	window_width_before = $(window).width();

	$('html,body').animate({scrollTop: '0px'}, 1000);	
	$("body").scrollTop = $(document).width();

};
var titleShow = function(json){
	var title = [];
	title = json.title;
	$("div.comment").css("opacity",1);
	$.each(title,function(i,value){
		var nr = document.createElement("div");
		nr.className = "boxitem";
		$("div.menubox").append(nr);
		var span = document.createElement("span");
		span.className = "span";
		span.title = value;
		$("div.boxitem:last").append(span);	
		$("div.boxitem:last").children("span.span").html(value);	
	});
/*$("img.im").load(function(){
	var tag = $(this);
var img_w = $(tag).width(); 
var img_h = $(tag).height(); 
if(img_h>200){	   
var width = (200*img_w)/img_h;
$(tag).css({"width":width,"height":"200px","cursor":"pointer"});
$(tag).closest("div.nr").css({"width":width});
}

});*/

};
var titleClick = function(){
	var title = $(this).html();
	$(document).off("click","span.span",titleClick);
	$(this).closest("div.boxitem").css({"background-color":"#E3E1E1","opacity":0.7});
	$.ajax({
		type:'post',
		url:'/read-title',
		data:{title:title},
		success:function(data){
			for(var i = 0;i<data.titlename.length;i++){
				    var div = document.createElement("div");
					$("[title = "+title+"]").parent().append(div);
					var a = document.createElement("a");
		            a.className = "title_href";
		            $("[title = "+title+"]").parent().children('div:last').append(a);
					$("[title = "+title+"]").parent().children('div:last').css({"width":$(this).closest("div.boxitem").width(),"top":$("span.exit").height(),"border-top-style":"dashed","border-top-width":"1px","font-size":"large","text-align":"right"});
					$("a.title_href:last").html(data.titlename[i]);
					$("a.title_href:last").attr("title",data.titlepath[i]);
					$("a.title_href:last").attr("href","#");
					console.log(data.titlename[i]);
				}
				var div = document.createElement("div");
					$("[title = "+title+"]").parent().append(div);
					var img = document.createElement("img");
		            img.className = "sq";
		            $("[title = "+title+"]").parent().children('div:last').append(img);
					$("[title = "+title+"]").parent().children('div:last').css({"width":$(this).closest("div.boxitem").width(),"background-color":"#E3E1E1","opacity":0.7,"cursor":"pointer"});
					$("img.sq:last").attr('src',"/img/sq.png");
				
			}
		});
	}
var sq = function(){
	$(this).closest("div.boxitem").css({"background-color":"inherit"});
	$(this).closest("div.boxitem").children("div").remove();
	$(document).on("click","span.span",titleClick);
	}
	var sq = function(){
	$(this).closest("div.boxitem").css({"background-color":"inherit"});
	$(this).closest("div.boxitem").children("div").remove();
	$(document).on("click","span.span",titleClick);
	}
var openshow = function(){
		event.preventDefault();
		menu_exit();
		$("div.comment").hide();
		$("div.comments").remove();
		$("div.show").children("*").remove();
		var imghref = $(this).attr("title");
		var dir = $(this).html();
		if($(this).closest("div.boxitem").children("span.span").attr("title")=="pictures")
		{
			$.ajax({
				type:'POST',
				data:{imghref:imghref},
				url:'/read-img',
				success:function(json){showimg(json,dir);				
				}});
			}
			else{
				$.ajax({
				type:'POST',
				data:{imghref:imghref},
				url:'/read-docs',
				success:function(json){showdocs(json,dir);				
				}});
				}
		};
var showimg = function(json,dir){
	var title = [];
	imghref = json.imghref;
		$.each(imghref,function(i,value){
		var nr = document.createElement("div");
		nr.className = "nr";
		$("div.show").append(nr);
		var img = document.createElement("img");
		img.className = "im";
		$("div.nr:last").append(img);
		$("div.nr:last").children("img.im:last").attr("src","/main/pictures/"+dir+"/"+value);
			
	});
$("img.im").load(function(){
	var tag = $(this);
var img_w = $(tag).width(); 
var img_h = $(tag).height(); 
if(img_h>200){	   
var width = (200*img_w)/img_h;
$(tag).css({"width":width,"height":"200px","cursor":"pointer"});
$(tag).closest("div.nr").css({"width":width});
}

});


	};
var showdocs = function(json,dir){
	imghref = json.imghref;
	$("div.comment").show();
	var div = document.createElement("div");
		div.className = "showTitle";
		$("div.show").append(div);
	var span = document.createElement("span");
	span.className = "title";
	$("div.showTitle").append(span);
	$("div.showTitle").css({"width":$(window).width()-200});
	$("span.title").html(dir);
	var div = document.createElement("div");
		div.className = "text";
		$("div.show").append(div);
	var h = document.createElement("h");
	h.className = "text-span";
	$("div.text").append(h);
	$("h.text-span").html(imghref);
	$("div.text").css({"width":$("div.text").parent("div").width()*0.5*0.6,"left":$("div.text").parent("div").width()*0.5*0.7});
	getcomment();
	};
	var postcomment = function(){
		var nickname = $("#nickname").val();
		var comment = $("#comment").val();
		var title = $("span.title").html();
		console.log(nickname+"==========="+comment+"=========="+title);
		$.ajax({
			url:"/comment",
			type:"POST",
			data:{nickname:nickname,comment:comment,title:title},
			success: function(json){
				if(json.success)
				{
					 $("#nickname").val("");
					$("#comment").val("");
					alert("success");
					getcomment();
					}
				}
		})
		
		}
var getcomment = function(){
	var title = $("span.title").html();
	$.ajax({
		type:"POST",
		url:'/readcomment',
	data:{title:title},
	success:function(data){
		setcomment(data);
		}});
	
	}
var setcomment =function(data){
	
	for(var i = 0;i<data.length;i++)
	{
		var obj = data[i];
		var div = document.createElement('div');
		div.className = "comments";
		$("div.comment").append(div);
		$("div.comments").css({"width":$("div.comment").width()*0.3})
		var nicknames = document.createElement('span');
		nicknames.id = "nicknames";
		var comments = document.createElement('pre');
		comments.id = "comments";
		$("div.comments:last").append(nicknames);
		$("div.comments:last").append(document.createElement('br'));
		$("div.comments:last").append(comments);
		$("span#nicknames:last").html(data[i].nickname+"：");
		$("pre#comments:last").html(data[i].comment);
		}
	$("pre#comments").css({"width":$("div.comments").width()});
	
	
	}