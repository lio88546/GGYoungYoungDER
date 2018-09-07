var http = require('http');//調用http函式庫
var mysql = require("mysql");//資料庫插件
var io = require('socket.io'); //加入 Socket.IO

//建立一個伺服器連結
var server = http.createServer(function(request, response){
    console.log('Connection');//印出連接字樣
  });
  
server.listen(8542);//伺服器port點指定
  
var serv_io = io.listen(server);// 開啟 Socket.IO 的 listener

//資料庫連結物件
var connection = mysql.createConnection({
  host: "192.168.30.118",
  user: "root",
  password: "passwords",
  database: "git",
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
  socket.on('regs',function(regData) {
    console.log("task : "+regData.task);

    let today = new Date();
    //查詢是否重複
    checkSql = "SELECT * FROM member " + 
               "WHERE id='" + regData.name + "' || name='" + regData.realName + "'";
    connection.query(checkSql, function(err, result){
      if (err) throw err;
      if(result.length > 0) {
        socket.emit('regsResult',{response : 'faile'});
        return;
      }     
      //註冊SQL
      registerSql = "INSERT INTO "+
            "member ( id, passwords, name, sex, age, country, address, phone, regdate, regtime, record, money)"+
            " VALUES ( '" + regData.name + "', '"+
                            regData.psw + "', '"+
                            regData.realName + "', '"+
                            regData.sex + "', '"+
                            regData.age + "', '"+
                            regData.country + "', '"+
                            regData.address + "', '"+
                            regData.phone + "', '"+
                            today.toLocaleDateString() + "', '"+
                            today.toLocaleTimeString() + "', '"+
                            "Register" + "', '"+
                            10000 + "' ) ;";
      connection.query(registerSql, function (err, result) {
        if (err) throw err;
        socket.emit('regsResult',{response : 'success'});
        //寫入LOG檔SQL
        logfileSql = "INSERT INTO "+
        "log ( date, time, ip, type, note)"+
        " VALUES ( '" + today.toLocaleDateString() + "', '"+
                        today.toLocaleTimeString() + "', '"+
                        socket.request.connection.remoteAddress + "', '"+
                        "Register" + "', '"+
                        regData.name + " Register " + "' ) ;";
        connection.query(logfileSql, function (err, result) {
          if (err) throw err;
        });
      });
      
    });
  });

  //登入
  socket.on('login',function(loginData) {
    console.log("task : "+loginData.task);
    
    sql = "SELECT * FROM member " + 
          "WHERE id='" + loginData.name + "' && passwords='" + loginData.psw + "'";
    connection.query(sql,function(error, result, fields){
      if(result != ""){
        let today = new Date();//取當下Date
        //寫入LOG檔SQL
        logfileSql = "INSERT INTO "+
        "log ( date, time, ip, type, note)"+
        " VALUES ( '" + today.toLocaleDateString() + "', '"+
                        today.toLocaleTimeString() + "', '"+
                        socket.request.connection.remoteAddress + "', '"+
                        "Login" + "', '"+
                        loginData.name + " Register " + "' ) ;";
        connection.query(logfileSql, function (err, result) {
          if (err) throw err;
          socket.emit('logResult',{response : 'success'});
        });
      } else {
        socket.emit('logResult',{response : 'faile'});
      }
    });
    
  });
});