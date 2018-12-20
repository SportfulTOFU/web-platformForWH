var express = require('express')
var app = express()
var router = require('./router')
// let bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({
//    extended: false
// }))
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})
app.use(router)
var server = app.listen(8081, function() {
  var host = server.address().address
  var port = server.address().port
  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})