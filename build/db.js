var mysql = require('mysql');
var db = {};
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'layoutforhb',
});
connection.connect();

var cnt = 0;
var conn = function() {
  connection.query('select * from 用户信息'); //查询MySQL中数据库
  cnt++;
  console.log("Mysql重连接成功! 次数:" + cnt);
}
setInterval(conn, 60 * 7000); //循环执行

connection.on('error', function(err) {
  console.log('db error', err);
  // 如果是连接断开，自动重新连接
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    handleError();
  } else {
    throw err;
  }
});
db.query = function sqlback(sqllan, fn) {


  // var sql = 'SELECT * FROM 电子地图';
  var sql = sqllan;
  //查
  if (!sql) return;
  connection.query(sql, function(err, result) {
    if (err) {
      console.log('[SELECT ERROR] - ', err.message);
      return;
    }
    var data = {};
    data = JSON.stringify(result);
    // console.log('--------------------------SELECT----------------------------');
    // console.log(data);
    // console.log('------------------------------------------------------------\n\n');
    fn(data);
  });

  // connection.end();
}
module.exports = db;