/**
 * Created by Administrator on 2015/12/19.
 */
$(document).ready(
function(){
    //createCell();
    //createRiver();
    //createCell();
    $('iframe.main').css({'width':$(window).width(),'height':$(window).height()});
    Inital();

}
);
function Inital(){
    var test = document.getElementById("test");
    var svg = test.getSVGDocument();
    if (svg == null) {
        time = setTimeout("Inital()", 300);
    } else {
        clearTimeout(time);
        var svgDoc = svg.documentElement;
        $(svgDoc).children("image#black").click(function(){whenEleClick($(this),svgDoc);});

    }

}
var whenEleClick = function(tag,svgdoc){
    var href = $(tag).attr("inkscape:label").toString();
$(tag).attr("xlink:href","/img/icons/IMAGES_S/DELICATE/"+href+"S.gif");
    var nowY =$(tag).attr("x");
    var nowX =$(tag).attr("y");
    $(svgdoc).children("path").click(function(){
           if (chackMove($(this),nowX,nowY))
           {

           }
    });
};
var chackMove = function(tag,nowX,nowY){
var y = parseInt($(tag).attr("id").replace(/(\w)\w/,"$1"));
    var x = parseInt($(tag).attr("id").replace(/\w(\w)/,"$1"));
    console.log("x:  "+x);
    console.log("y:  "+y);

};
//
//}
//function Inital(){
//    var test = document.getElementById("test");
//    var svg = test.getSVGDocument();
//    if (svg == null) {
//        time = setTimeout("Inital()", 300);
//    } else {
//        clearTimeout(time);
//        var svgDoc = svg.documentElement;
//        $(svgDoc).children("path").mouseover(function(){whenEleMouseOver($(this),svgDoc);});
//        $(svgDoc).children("path").mouseout(function(){whenEleMouseOut($(this),svgDoc)})
//    }
//
//}
//var whenEleMouseOver = function(tag,svgDoc){
//    var x = $(tag).attr("sodipodi:cx");
//    var y = $(tag).attr("sodipodi:cy");
//    before = $(tag).css("fill");
//    $(tag).css({"fill":"red"});
//    var xmlns = "http://www.w3.org/2000/svg";
//    var svg_img = document.createElementNS(xmlns, "image");
//    svg_img.href.baseVal = "/img/menu.png";
//    svg_img.id = "tp";
//    svg_img.setAttributeNS(null, "x", x);
//    svg_img.setAttributeNS(null, "y", y);
//    svg_img.setAttributeNS(null, "height", "200px");
//    svg_img.setAttributeNS(null, "width", "200px");
//    svgDoc.appendChild(svg_img);
//};
var whenEleMouseOut = function(tag,svgDoc){
    $(tag).css({"fill":before});
    $(svgDoc).children("image#tp").remove();
}
//function Inital(){
//    var test = document.getElementById("test");
//    var svg = test.getSVGDocument();
//    if (svg == null) {
//        time = setTimeout("Inital()", 300);
//    } else {
//        clearTimeout(time);
//        var svgDoc = svg.documentElement;
//
//        var test2 = $(svgDoc).children("text");
//        var test1 = $(test2).prev();
//        var before = $(test1).css("fill");
//        $(test2).mouseover(function(){
//            var x =$(this).attr("x");
//            var  y =$(this).attr("y");
//            var xmlns = "http://www.w3.org/2000/svg";
//            var svg_img = document.createElementNS(xmlns, "image");
//            svg_img.href.baseVal = "/img/menu.png";
//            svg_img.className = "tp";
//            svg_img.setAttributeNS(null, "x", x);
//            svg_img.setAttributeNS(null, "y", y);
//            svg_img.setAttributeNS(null, "height", "50px");
//            svg_img.setAttributeNS(null, "width", "50px");
//            svgDoc.appendChild(svg_img);
//            console.log($(this).attr("x")+"========"+$(this).attr("y"));$(this).prev().css({"fill":"red"});})
//        $(test2).mouseout(function(){$(this).prev().css({"fill":before});$(svgDoc).children(".tp")})
//
//    }
//
//}