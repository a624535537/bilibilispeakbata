$(document).ready(function (){
	
	initi(); 
	$(window).resize(re_size);
	$("img.exit").click(menu_exit);
    $("img.menu").click(menu_out);
	$("img.menu").mouseover(function(){
		$(this).attr("src","/img/menu2.png");
		});
		$("img.menu").mouseout(function(){
		$(this).attr("src","/img/menu.png");
		});
	$(window).scroll(mb_scroll);
	$("img.im").click(function(){alert("1");});
	$(document).on("click","span.span",titleClick);
	$(document).on("click","img.sq",sq);
	$(document).on("click","a.title_href",openshow);
	$(document).on("click","img.im",function(){
		window.location.href = $(this).attr("src");
		});
	$("input[type='button']").click(postcomment);
});