var http = require('http');//調用http函式庫
var mysql = require("mysql");//資料庫插件
var io = require('socket.io'); //加入 Socket.IO

//建立一個伺服器連結
var server = http.createServer(function(request, response){
    console.log('Connection');//印出連接字樣
  });
  
server.listen(8081);//伺服器port點指定
  
var serv_io = io.listen(server);// 開啟 Socket.IO 的 listener

//資料庫連結物件
var connection = mysql.createConnection({
  host: "http://192.168.30.118/",
  user: "root",
  password: "passwords",
  database: "git"
});

//連接資料庫
connection.connect(function(error){
  if(error) throw error;
  console.log("DB connectied!");
});

//與瀏覽器端建立連結
serv_io.sockets.on('connection', function(socket) {
  //發送訊息給瀏覽器，確認連結
  socket.emit('message', {'connection': 'Condition Good'});
  
  //接瀏覽器訊息，確認連結
  socket.on('condition',function(msg){
    console.log(msg.condition);
  })
  
  //var playerData = {};//玩家資料

  //註冊
  socket.on('regs',function(menberData) {
    console.log("task : "+menberData.task);
    /*
    sql = "INSERT INTO "+
          "pokergame ( name, psw)"+
          " VALUES ( '" + menberData.name + "', '"+
                         menberData.psw + "' ) ;"
    connection.query(sql, function (err, result) {
      if (err) throw err;
      socket.emit('regsResult',{name : menberData.name});
    });
    */
  });

  //登入
  socket.on('login',function(menberData) {
    console.log("task : "+menberData.task);
    /*
    sql = "SELECT * FROM pokergame " + 
          "WHERE name='" + menberData.name + "' AND" + 
          " psw='" + menberData.psw + "'";
    connection.query(sql,function(error, result, fields){
      if(result != ""){
        let today = new Date();//取當下Date
        sql = "UPDATE pokergame SET "+
              "loginTime = '" + today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate() + 
              " " + today.getHours()+":"+today.getMinutes()+":"+today.getSeconds() + "'" +
              " WHERE " + 
              "id = " + result[0].id + ";";
        connection.query(sql,function(error) {
          if (error) throw error;
          playerData = result[0];//存放玩家於資料庫之ID
          socket.emit('logResult',result[0]);
        });
      } else {
        socket.emit('logResult',{id:-1});
      }
    });
    */
  });
});