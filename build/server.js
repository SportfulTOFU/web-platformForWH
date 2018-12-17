var express = require('express');
var app = express();
var mysql = require('./db.js')
var url = require('url');
var Q = require('q')
let async = require('async');
var Step = require('step');
var multiparty = require('multiparty');
var fs = require("fs");
var querystring = require('querystring');
// let bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({
//    extended: false
// }))

//  主页输出 "Hello World"
app.get('/', function(req, res) {

   // console.log("主页 GET 请求");
   res.send('Hello GET');
})


//  POST 请求
app.post('/', function(req, res) {
   // console.log("主页 POST 请求");
   res.send('Hello POST');
})

//  /del_user 页面响应
app.get('/del_user', function(req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   // console.log("/del_user 响应 DELETE 请求");
   var result = {};
   result = mysql.query('SELECT * FROM 长江图', function(result) {
      // console.log(result);
      return res.json(result);
   })


})

//  /list_user 页面 GET 请求
app.get('/list_user', function(req, res) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   let name = req.query.name;
   // console.log("/list_user GET 请求" + req.query.name);

   mysql.query(name, function(result) {
      // console.log(result);
      // result1 = res.json(result);
      result1 = JSON.stringify(result);
      // console.log(result1);
      return res.json(result);

   }); //参数paraA通过invokeA获得

});

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/abcd', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   // console.log("/ab*cd GET 请求");
   var result = {};
   result = mysql.query('SELECT * FROM 区域概览', function(result) {
      // console.log(result);
      return res.json(result);
   })

})
//登录操作
app.post('/login', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/login" + name + req.query.password);


   // var password = req.query.password;
   // var name = req.query.username;

   // console.log(name, password);
   let i = false;
   var username = req.query.username;
   var password = req.query.password;
   var sql = 'select * from 用户信息';
   // console.log(sql)
   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      for (var i = 0; i < data.length; i++) {
         if (data[i].username == username) {
            if (data[i].password == password) {

               return res.json({
                  state: 1,
                  rights: data[i].rights
               }); //登录成功
               break;
            } else {
               return res.json({
                  state: -1
               }); //密码错误
               break;
            }
         } else {

         }
         if (i == data.length - 1) {
            return res.json({
               state: 0
            }); //用户不存在
         }

      }

   })



   // var result = {};
   // result = mysql.query('SELECT * FROM 用户信息', function(result) {
   //    for ()
   //       console.log(result);
   //    return res.json(result);
   // })

})
//下载用户任务操作
app.post('/usertask', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/usertask" + name);

   var sql = 'select * from ' + name + '任务列表';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      return res.json(result); //用户不存在
   })


})
//获取模板文件数量操作
app.post('/getfiles', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getfiles" + name);

   var sql = 'select max(id) as id from 模板列表';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      // console.log("/getfiles" + data);
      return res.json(result); //用户不存在
   })


})
//获取图幅文件数量操作
app.post('/getfiles1', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getfiles" + name);

   var sql = 'select max(id) as id from 图幅列表';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      // console.log("/getfiles" + data[0]);
      return res.json(result); //用户不存在
   })


})
//获取规范文件数量操作
app.post('/getfiles2', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getfiles" + name);

   var sql = 'select max(id) as id from 基础数据列表';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      // console.log("/getfiles" + data[0]);
      return res.json(result); //用户不存在
   })


})
//获取数据资料文件数量操作
app.post('/getfiles3', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getfiles" + name);

   var sql = 'select max(id) as id from 资料数据列表';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      // console.log("/getfiles" + data[0]);
      return res.json(result); //用户不存在
   })


})
//获取数据资料文件数量操作
app.post('/getusers', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getfiles" + name);

   var sql = 'select * from 用户信息 where rights = "user"';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      // console.log("/getfiles" + data);
      return res.json(result); //用户不存在
   })


})
app.post('/getallusers', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getfiles" + name);

   var sql = 'select * from 用户信息';


   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      // console.log("/getfiles" + data);
      return res.json(result); //用户不存在
   })


})
//上传参数列表操作
app.post('/updatefile', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   var name = 'req.query';
   var path = 'req.query';
   var filename = 'sda';
   var leader = 'asa';
   var state = 0;

   var form = new multiparty.Form();
   form.parse(req, function(err, fields, files) {
      // console.log(fields);
      leader = fields.leader;
      state = fields.state;
      filename = fields.projectname;
      let table = fields.table;
      // console.log(table[0])
      if (state == 1) {
         name = files.fileSelect[0].originalFilename;
         path = files.fileSelect[0].path;
         path = path.replace(/\\/g, '/');
         // console.log(name + path + filename);
         var sql = `insert into ${table[0]} (name,path,leader,projectname,state)values('${name}','${path}','${leader}','${filename}','${state}')`;
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      } else {
         name = 'null';
         path = 'null';
         // console.log(name + path + filename);
         var sql = `insert into ${table[0]} (name,path,leader,projectname,state)values('${name}','${path}','${leader}','${filename}','${state}')`;
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      }


   });
})

// //上传图幅模板操作
// app.post('/updatefile1', function(req, res) {

//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

//    var name = 'req.query';
//    var path = 'req.query';
//    var filename = 'sda';
//    var leader = 'asa';
//    var state = 0;

//    var form = new multiparty.Form();
//    form.parse(req, function(err, fields, files) {
//       // console.log(fields);
//       leader = fields.leader;
//       state = fields.state;
//       filename = fields.projectname;
//       if (state == 1) {
//          name = files.fileSelect[0].originalFilename;
//          path = files.fileSelect[0].path;
//          path = path.replace(/\\/g, '/');
//          // console.log(name + path + filename);
//          var sql = "insert into 资料数据列表 (`name`,`path`,`leader`,`projectname`,`state`)values('" + name + "','" + path + "','" + leader + "','" + filename + "','" + state + "')";
//          // console.log(sql);
//          mysql.query(sql, function(result) {

//             return res.json(1); //用户不存在
//          })
//       } else {
//          name = 'null';
//          path = 'null';
//          // console.log(name + path + filename);
//          var sql = "insert into 资料数据列表 (`name`,`path`,`leader`,`projectname`,`state`)values('" + name + "','" + path + "','" + leader + "','" + filename + "','" + state + "')";
//          // console.log(sql);
//          mysql.query(sql, function(result) {

//             return res.json(1); //用户不存在
//          })
//       }


//    });
// })
//上传规范列表操作
app.post('/updatefile2', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   var name = 'req.query';
   var path = 'req.query';
   var filename = 'sda';
   var username = 'asa';
   var state = 0;
   var form = new multiparty.Form();
   form.parse(req, function(err, fields, files) {

      username = fields.username;
      state = fields.state;
      filename = fields.projectname;
      let table = fields.table;
      // console.log(filename);
      if (state == 1) {
         name = files.fileSelect[0].originalFilename;
         path = files.fileSelect[0].path;
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = `insert into ${table[0]} (name,path,username,projectname,state)values('${name}','${path}','${username}','${filename}','${state}')`;
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      } else {
         name = 'null';
         path = 'null';
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = `insert into  ${table[0]} (name,path,username,projectname,state)values('${name}' ,'${path}','${username}','${filename}','${state}')`;
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      }



   });
})
//上传数据资料列表操作
app.post('/updatefile3', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   var name = 'req.query';
   var path = 'req.query';
   var filename = 'sda';
   var username = 'asa';
   var state = 0;
   var form = new multiparty.Form();
   form.parse(req, function(err, fields, files) {

      username = fields.username;
      state = fields.state;
      filename = fields.projectname;
      // console.log(filename);
      if (state == 1) {
         name = files.fileSelect[0].originalFilename;
         path = files.fileSelect[0].path;
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = "insert into 图幅列表 (`name`,`path`,`username`,`projectname`,`state`)values('" + name + "','" + path + "','" + username + "','" + filename + "','" + state + "')";
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      } else {
         name = 'null';
         path = 'null';
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = "insert into 图幅列表 (`name`,`path`,`username`,`projectname`,`state`)values('" + name + "','" + path + "','" + username + "','" + filename + "','" + state + "')";
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      }



   });
})
//上传数据资料列表操作
app.post('/updatefile4', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   var name = 'req.query';
   var path = 'req.query';
   var filename = 'sda';
   var username = 'asa';
   var state = 0;
   var form = new multiparty.Form();
   form.parse(req, function(err, fields, files) {

      username = fields.username;
      state = fields.state;
      filename = fields.projectname;
      // console.log(filename);
      if (state == 1) {
         name = files.fileSelect[0].originalFilename;
         path = files.fileSelect[0].path;
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = "insert into 负责人的基础数据列表 (`name`,`path`,`username`,`projectname`,`state`)values('" + name + "','" + path + "','" + username + "','" + filename + "','" + state + "')";
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      } else {
         name = 'null';
         path = 'null';
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = "insert into 负责人的基础数据列表 (`name`,`path`,`username`,`projectname`,`state`)values('" + name + "','" + path + "','" + username + "','" + filename + "','" + state + "')";
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      }



   });
})
//上传数据资料列表操作
app.post('/updatefile5', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   var name = 'req.query';
   var path = 'req.query';
   var filename = 'sda';
   var username = 'asa';
   var state = 0;
   var form = new multiparty.Form();
   form.parse(req, function(err, fields, files) {

      username = fields.username;
      state = fields.state;
      filename = fields.projectname;
      // console.log(filename);
      if (state == 1) {
         name = files.fileSelect[0].originalFilename;
         path = files.fileSelect[0].path;
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = "insert into 负责人的资料数据列表 (`name`,`path`,`username`,`projectname`,`state`)values('" + name + "','" + path + "','" + username + "','" + filename + "','" + state + "')";
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      } else {
         name = 'null';
         path = 'null';
         path = path.replace(/\\/g, '/');
         // console.log(name + path);
         var sql = "insert into 负责人的资料数据列表 (`name`,`path`,`username`,`projectname`,`state`)values('" + name + "','" + path + "','" + username + "','" + filename + "','" + state + "')";
         // console.log(sql);
         mysql.query(sql, function(result) {

            return res.json(1); //用户不存在
         })
      }



   });
})
//下载选定参数列表操作
app.get('/downloadfile', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.name;

   // console.log("/downloadfile GET 请求" + name + req.query.password);

   let i = false;

   var sql = 'select * from 模板列表';

   mysql.query(sql, function(result) {
      var data = JSON.parse(result);
      for (var i = 0; i < data.length; i++) {
         if (data[i].name == name) {

            var path = data[i].path;
            return res.json(path);
            // var f = fs.createReadStream(path);

            // f.pipe(res);
            // console.log(res);

         } else {

         }
      }


   })
})

//下载通用文件列表操作
app.post('/downloadfile1', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.name;
   let projectname = req.query.projectname;
   console.log(projectname)
   let i = false;
   var sql = `select name,path from  ${name}  where projectname ='${projectname}'`;
   mysql.query(sql, function(result) {
      var data = JSON.parse(result);

      console.log(data);
      if (data[0] == undefined) {
         return res.json(0);
      } else {
         var path = data[0].path;
         var name = data[0].name;
         return res.json({
            path: path,
            name: name
         });
      }



   })
})
//下载文件通用操作
app.get('/filepath', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let path = req.query.path;
   let name = req.query.name;
   let filename = encodeURI(name, "UTF-8");
   // console.log("/downloadfile GET 请求" + path + req.query.name);


   var f = fs.createReadStream(path);
   res.writeHead(200, {
      'Content-Type': 'application/force-download',
      'Content-Disposition': `attachment; filename=${filename}`
      // res.attachment(name)
   });

   f.pipe(res);

})

//添加项目任务操作
app.post('/allupdate', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.name;
   let number = req.query.number;
   let corp = req.query.corp;
   let product = req.query.product;
   let renwuxinzhi = req.query.renwuxinzhi;
   let tuzhong = req.query.tuzhong;
   let chicun = req.query.chicun;
   let chenpingcaizhi = req.query.chenpingcaizhi;
   let xiangmufuzeren = req.query.xiangmufuzeren;
   let yongtu = req.query.yongtu;
   let zhitufanwei = req.query.zhitufanwei;
   let details = req.query.details;
   let members = req.query.members;
   let zilaioshujustate = req.query.zilaioshujustate;
   let jichushujustate = req.query.jichushujustate;
   let date = req.query.date;

   // let str = JSON.stringify(members)
   // console.log("/allupdate GET 请求" + str.length);
   let memberjindu = []
   for (let item in members) {

      memberjindu.push(members[item] + "-" + "状态")
   }
   console.log("/allupdate GET 请求" + memberjindu);

   var sql = "insert into 项目列表 (`name`,`corp`,`product`,`renwuxinzhi`,`tuzhong`,`chicun`,`chenpingcaizhi`,`xiangmufuzeren`,`yongtu`,`zhitufanwei`,`details`,`member`,`zilaioshujustate`,`jichushujustate`,`date`,`number`,`memberjindu`)values('" + name + "','" + corp + "','" + product + "','" + renwuxinzhi + "','" + tuzhong + "','" + chicun + "','" + chenpingcaizhi + "','" + xiangmufuzeren + "','" + yongtu + "','" + zhitufanwei + "','" + details + "','" + members + "','" + zilaioshujustate + "','" + jichushujustate + "','" + date + "','" + number + "','" + memberjindu + "')";

   mysql.query(sql, function(result) {


   })

   var sql1 = "insert into 项目进度控制表 (`projectname`)values('" + name + "')";

   mysql.query(sql1, function(result) {


   })
   return res.json(1); //用户不存在

})
//添加项目任务操作
app.post('/allupdate1', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.name;
   let corp = req.query.corp;
   let product = req.query.product;

   let details = req.query.details;
   let members = req.query.members;
   let mobancanshustate = req.query.mobancanshustate;
   let tufuguifanstate = req.query.tufuguifanstate;
   let fzrjinchushujustate = req.query.fzrjinchushujustate;
   let fzrziliaoshujustate = req.query.fzrziliaoshujustate;
   let renwuxinzhi = req.query.renwuxinzhi;
   let tuzhong = req.query.tuzhong;
   let chicun = req.query.chicun;
   let chenpingcaizhi = req.query.chenpingcaizhi;
   let task = req.query.task;
   let yongtu = req.query.yongtu;
   let zhitufanwei = req.query.zhitufanwei;
   // console.log("/allupdate GET 请求" + yongtu);

   var sql = "insert into 负责人的项目列表 (`name`,`corp`,`product`,`details`,`member`,`mobancanshustate`,`tufuguifanstate`,`fzrjinchushujustate`,`fzrziliaoshujustate`,`renwuxinzhi`,`tuzhong`,`chicun`,`chenpingcaizhi`,`yongtu`,`zhitufanwei`,`task`)values('" + name + "','" + corp + "','" + product + "','" + details + "','" + members + "','" + mobancanshustate + "','" + tufuguifanstate + "','" + fzrjinchushujustate + "','" + fzrziliaoshujustate + "','" + renwuxinzhi + "','" + tuzhong + "','" + chicun + "','" + chenpingcaizhi + "','" + yongtu + "','" + zhitufanwei + "','" + task + "')";

   mysql.query(sql, function(result) {

      return res.json(1); //用户不存在
   })


})
//获取所有项目任务操作
app.post('/getprojects', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");


   // console.log("/getprojects GET 请求");

   var sql = 'select * from 项目列表';

   mysql.query(sql, function(result) {
      var data = JSON.parse(result);

      return res.json(result);
   })



})
//添加用户操作
app.post('/loginAddUser', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");


   // console.log("/getprojects GET 请求");
   let username = req.query.name;
   let password = req.query.password;

   let right = req.query.right;
   var sql = `INSERT INTO 用户信息(username, password, rights) VALUES('${username}', '${password}', '${right}')`;

   mysql.query(sql, function(result) {
      return res.json(1); //用户不存在
   })



})
//获取所有项目任务操作
app.post('/getfzrprojects', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");


   // console.log("/getfzrprojects GET 请求");

   var sql = 'select * from 负责人的项目列表';

   mysql.query(sql, function(result) {
      var data = JSON.parse(result);

      return res.json(result);
   })



})
//获取进度控制操作
app.post('/getstate', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getstate GET 请求" + name);

   var sql = "select * from 项目进度控制表";
   // var sql = "select * from 项目进度控制表 where projectname = '" + name + "'";
   mysql.query(sql, function(result) {
      var data = JSON.parse(result);

      return res.json(result);
   })



})
//获取进度控制操作
app.post('/getstate1', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.username;
   // console.log("/getstate GET 请求" + name);

   // var sql = "select * from 项目进度控制表";
   var sql = "select * from 项目进度控制表 where projectname = '" + name + "'";
   mysql.query(sql, function(result) {
      var data = JSON.parse(result);

      return res.json(result);
   })



})
//获取文件查询操作
app.post('/searchfile', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

   let name = req.query.name;
   let property = req.query.property;

   if (name != '') {
      if (property == 1) {
         var sql = "select * from 项目列表 where name like '" + name + "%'";
         console.log("/searchfile GET 请求" + sql);
         mysql.query(sql, function(result) {
            var data = JSON.parse(result);

            return res.json(result);
         })
      } else if (property == 2) {
         var sql = "select * from 项目列表 where xiangmufuzeren like '" + name + "%'";
         console.log("/searchfile GET 请求" + sql);
         mysql.query(sql, function(result) {
            var data = JSON.parse(result);

            return res.json(result);
         })
      } else if (property == 3) {
         var sql = "select * from 项目列表 where date like '" + name + "%'";
         console.log("/searchfile GET 请求" + sql);
         mysql.query(sql, function(result) {
            var data = JSON.parse(result);

            return res.json(result);
         })
      } else if (property == 4) {
         var sql = "select * from 项目列表 where number = '" + name + "'";
         console.log("/searchfile GET 请求" + sql);
         mysql.query(sql, function(result) {
            var data = JSON.parse(result);

            return res.json(result);
         })
      } else {
         var data = 'JSON.parse(result)';

         return res.json(data);


      }
   } else {
      var data = 'JSON.parse(result)';

      return res.json(data);
   }



})
//修改项目操作
app.post('/modify', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
   // console.log(req.query)
   let name = req.query.name;
   let property = req.query.property;
   let modifyname = req.query.modifyname;
   let modifyproperty = req.query.modifyproperty;
   console.log(property)

   if (property == 1) {
      property = "name"
   } else if (property == 2) {
      property = "number";
   } else {
      property = false
   }


   if (modifyproperty == 1) {
      modifyproperty = "name"
   } else if (modifyproperty == 2) {
      modifyproperty = "number"
   } else if (modifyproperty == 3) {
      modifyproperty = "corp"
   } else if (modifyproperty == 4) {
      modifyproperty = "product"
   } else if (modifyproperty == 5) {
      modifyproperty = "details"
   } else {
      modifyproperty = false
   }


   var sql = `update 项目列表 set ${modifyproperty}= "${modifyname}" where ${property} = "${name}"`
   // console.log(sql)
   mysql.query(sql, function(result) {
      var data = JSON.parse(result);

      return res.json(result);
   });



});
// //改变进度控制操作
// app.get('/stateupdate', function(req, res) {

//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");


//    let name = req.query.name;
//    let proname = req.query.proname;
//    if (name == 13) {
// console.log("start" + proname);
//       var sql3 = "update 项目列表 set state= 1 where name = '" + proname + "'";

//       mysql.query(sql3, function(result) {

//       });
//    }
//    console.log("/getstate GET 请求");

//    var sql = "update 进度控制表 set state=1 where state = -1 ";

//    mysql.query(sql, function(result) {

//    });
//    var sql1 = "update 进度控制表 set state=-1 where id=" + name;
//    mysql.query(sql1, function(result) {

//    });

//    var sql2 = "update 进度控制表 set state=0 where state = 0";

//    mysql.query(sql2, function(result) {

//    });
//    return res.json({
//       'Hello GET': 0
//    });


// })

//改变进度控制操作
app.post('/stateupdate', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");


   let name = req.query.name;
   let proname = req.query.proname;
   if (name == 13) {
      // console.log("start" + proname);
      var sql3 = "update 项目列表 set state= 1 where name = '" + proname + "'";

      mysql.query(sql3, function(result) {

      });
   }
   // console.log("/getstate GET 请求" + name);
   if (name == 1) {
      var sql = "update 项目进度控制表 set jf =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '甲方资料交接' where name = '" + proname + "'";
   } else if (name == 2) {
      var sql = "update 项目进度控制表 set qd =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '签订合同' where name = '" + proname + "'";
   } else if (name == 3) {
      var sql = "update 项目进度控制表 set rw =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '任务下发' where name = '" + proname + "'";
   } else if (name == 4) {
      var sql = "update 项目进度控制表 set zy =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '作业任务下发' where name = '" + proname + "'";
   } else if (name == 5) {
      var sql = "update 项目进度控制表 set bz =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '班组检查' where name = '" + proname + "'";
   } else if (name == 6) {
      var sql = "update 项目进度控制表 set bm =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '部门检查' where name = '" + proname + "'";
   } else if (name == 7) {
      var sql = "update 项目进度控制表 set yn =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '院内检查' where name = '" + proname + "'";
   } else if (name == 8) {
      var sql = "update 项目进度控制表 set jl =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '局里检查' where name = '" + proname + "'";
   } else if (name == 9) {
      var sql = "update 项目进度控制表 set jfq =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '甲方确认' where name = '" + proname + "'";
   } else if (name == 10) {
      var sql = "update 项目进度控制表 set jff =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '甲方付款' where name = '" + proname + "'";
   } else if (name == 11) {
      var sql = "update 项目进度控制表 set ys =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '印刷出品' where name = '" + proname + "'";
   } else if (name == 12) {
      var sql = "update 项目进度控制表 set cp =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '成品交付' where name = '" + proname + "'";
   } else if (name == 13) {
      var sql = "update 项目进度控制表 set xm =1 where projectname = '" + proname + "'";
      var sql1 = "update 项目列表 set xiangmujindu= '项目归档' where name = '" + proname + "'";
   }
   mysql.query(sql, function(result) {

   });
   mysql.query(sql1, function(result) {

   });

   return res.json({
      'Hello GET': 0
   });


})


//改变个人任务进度控制操作
app.post('/statusupdate', function(req, res) {

   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");


   let name = req.query.name;
   let status = req.query.status;
   let projectName = req.query.projectName;
   // console.log("/statusupdate GET 请求" + name);
   var sql = `select memberjindu from 项目列表 where name = '${projectName}'`;

   mysql.query(sql, function(result) {
      let object = JSON.parse(result)
      let str = (object[0].memberjindu).split(',')
      let result_next = []
      for (let item of str) {
         let res_str = ''
         let user = item.split('-')
         if (user[0] == name) {
            res_str = user[0] + '-' + status
         } else {
            res_str = user[0] + '-' + user[1]
         }
         result_next.push(res_str)
      }

      let sql1 = `update 项目列表 set memberjindu = '${result_next}' where name = '${projectName}'`
      mysql.query(sql1, function(result) {

      });
   })



   // var sql1 = "update 用户信息 set status= '" + status + "' where username= '" + name + "'";
   // mysql.query(sql1, function(result) {

   // });
   return res.json({
      'Hello GET': 0
   });


})

var server = app.listen(8081, function() {

   var host = server.address().address
   var port = server.address().port

   console.log("应用实例，访问地址为 http://%s:%s", host, port)

})