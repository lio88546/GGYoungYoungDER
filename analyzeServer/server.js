var http = require("http");
var url = require('url');
var io = require('socket.io'); // 加入 Socket.IO
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "192.168.30.118",
    user: "root",
    password: "passwords",
    database: "git"
});

con.connect(function(err){
	if(err)console.log(err);
});

var server = http.createServer();

server.listen();

var serv_io = io.listen(server);
serv_io.sockets.on('connection', function(socket) {

})