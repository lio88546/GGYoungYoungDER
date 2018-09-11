var http = require("http");
var url = require('url');
var io = require('socket.io'); // 加入 Socket.IO
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "passwords",
    database: "mydb"
});
//  time    date	type    ip	 note
con.connect(function(err){
    if(err)console.log(err);
});


var data;
con.query('SELECT * FROM vchart',(err,result,fields)=>{
    // console.log(result);
    data = result;
})

/* var age = ['<19','20~24','25~29','30~34','35~39','>40'];
var sex = ['male','female','mid'];
var country = ['taiwan','china','japan','USA','korea','rome'];
console.log(new Date());
var dateTime = ['2018-09-07T00:00:00.000Z','2018-09-08T00:00:00.000Z','2018-09-09T00:00:00.000Z','2018-09-10T00:00:00.000Z','2018-09-11T00:00:00.000Z','2018-09-12T00:00:00.000Z']
var insert = [];
for(var i=0 ; i<100 ; i++){
    insert.push([age[ran(6)],sex[ran(3)],country[ran(6)],dateTime[ran(6)]]);
}
// console.log(insert);
// ('<19', 'male', 'taiwan', '2018-09-07T00:00:00.000Z')
var sql = "INSERT INTO vchart (age, sex, country, regtime) VALUES ?";
con.query(sql,[insert],(err,result)=>{
    if(err) throw err;
})
function ran(number){
    return Math.floor(Math.random()*number);
} */
var server = http.createServer();

server.listen(8888);
var serv_io = io.listen(server);
serv_io.on('connection', function(socket) {
    console.log('connect');
    socket.emit('getData',data);
})