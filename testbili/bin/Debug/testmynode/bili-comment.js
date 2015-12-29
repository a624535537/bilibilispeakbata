var express = require('express');
var CommentClient = require('./commentclient.js').Client;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var swig = require('swig');
var favicon = require('connect-favicons');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
app.use(favicon(__dirname + '/public/img/icons'));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/',function(req,res){
    res.render('lt');
});
var nowclient;
function connectCommentServer(cid,socket){
    var server= new CommentClient();

    server.on('server_error', function(error) {
        console.log(("服务器发生错误:" + error));
    });
    server.on('close', function() {
        console.log("连接已中断");
        if(config.reconnect) nowclient=nowclient.connect(cid);
    });
    server.on('error', function(error) {
        console.log(("发生错误:" + error));
    });
    server.on('login_success', function(num) {

    });
    server.on('newCommentString', function(data) {
        data = JSON.parse(data);
        if(!data) return console.log("[弹幕] " + "异常数据");
        if(!data.info) return console.log("[弹幕] " + "空弹幕");
        data = data.info;//ignore other arguments
        var date = data[0][4];
        var msg = data[1];
        var text='';
        text += replaceES(msg);
        socket.emit('newmsg',text);
        console.log("[弹幕] " + text);
    });
    server.on('newScrollMessage', function(data) {
        console.log("新滚动信息:" + eval("("+data+")").text);
    });
    server.on('unknown_bag', function(data) {
        console.log(("异常数据:" + data).toString());
    });
    server.connect(cid);
    return server;

}
function replaceES(text){
    return html_decode(text);
}
function html_decode(str)
{
    var s;
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}

server.listen(3001,function(){
    console.log('server begin...');
});

io.on('connection',function(socket) {
    socket.emit('open');  //通知客户端已连接

    //构造客户端对象
    var client = {
        socket: socket,
        roomid: false
    }
    socket.on('roomid',function(msg){
        nowclient = connectCommentServer(msg,socket);
    });
});