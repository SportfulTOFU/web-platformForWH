const express = require('express')
var mysql = require('./db.js')
var multiparty = require('multiparty')
var fs = require('fs')

const router = express.Router()

router.post('/login', function(req, res) {
  var username = req.query.username
  var password = req.query.password
  var sql = `select * from 用户信息`
  // console.log(sql)
  mysql.query(sql, function(result) {
    var data = JSON.parse(result)
    for (var i = 0; i < data.length; i++) {
      if (data[i].username === username) {
        if (data[i].password === password) {
          return res.json({
            state: 1,
            rights: data[i].rights
          })
        } else {
          return res.json({
            state: -1
          })
        }
      }
      if (i === data.length - 1) {
        return res.json({
          state: 0
        })
      }
    }
  })
})
// 获取数据资料文件数量操作
router.post('/getusers', function(req, res) {
  var sql = 'select * from 用户信息 where rights = "user"'
  mysql.query(sql, function(result) {
    return res.json(result)
  })
})
// 上传参数列表操作
router.post('/updatefile', function(req, res) {
  var name = 'req.query'
  var path = 'req.query'
  var filename = 'sda'
  var leader = 'asa'
  var state = 0
  var form = new multiparty.Form()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err.stack)
    }
    leader = fields.leader
    state = fields.state.toString()
    filename = fields.projectname

    const table = fields.table
    if (state === '1') {
      name = files.fileSelect[0].originalFilename
      path = files.fileSelect[0].path
      path = path.replace(/\\/g, '/')
      var sql = `insert into ${table[0]} 
      (name, path, leader, projectname, state) values('${name}',
      '${path}','${leader}','${filename}','${state}')`
      mysql.query(sql, function(result) {
        return res.json(1)
      })
    } else {
      name = 'null'
      path = 'null'
      var sql1 = `insert into ${table[0]} (name,path,leader,
      projectname,state)values('${name}','${path}',
      '${leader}','${filename}','${state}')`
      mysql.query(sql1, function(result) {
        return res.json(1)
      })
    }
  })
})

// 上传规范列表操作
router.post('/updatefile2', function(req, res) {
  var name = 'req.query'
  var path = 'req.query'
  var filename = 'sda'
  var username = 'asa'
  var state = 0
  var form = new multiparty.Form()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err.stack)
    }
    username = fields.username
    state = fields.state.toString()
    filename = fields.projectname
    const table = fields.table
    // console.log(filename)
    if (state === '1') {
      name = files.fileSelect[0].originalFilename
      path = files.fileSelect[0].path
      path = path.replace(/\\/g, '/')
      // console.log(name + path)
      var sql = `insert into ${table[0]} 
      (name,path,username,projectname,state)values('${name}',
      '${path}','${username}','${filename}','${state}')`
      mysql.query(sql, function(result) {
        return res.json(1)
      })
    } else {
      name = 'null'
      path = 'null'
      path = path.replace(/\\/g, '/')
      var sql1 = `insert into  ${table[0]} 
      (name,path,username,projectname,state)values(
      '${name}' ,'${path}','${username}',
      '${filename}','${state}')`
      mysql.query(sql1, function(result) {
        return res.json(1)
      })
    }
  })
})
// 下载通用文件列表操作
router.post('/downloadfile1', function(req, res) {
  const name = req.query.name
  const projectname = req.query.projectname
  console.log(projectname)
  var sql = `select name,path from  ${name} 
   where projectname ='${projectname}'`
  mysql.query(sql, function(result) {
    var data = JSON.parse(result)

    console.log(data)
    if (data[0] === undefined) {
      return res.json(0)
    } else {
      var path = data[0].path
      var name = data[0].name
      return res.json({
        path: path,
        name: name
      })
    }
  })
})
// 下载文件通用操作
router.get('/filepath', function(req, res) {
  const path = req.query.path
  const name = req.query.name.toString()
  const filename = encodeURI(name, 'UTF-8')
  console.log("/downloadfile GET 请求" + name + req.query.name)
  var f = fs.createReadStream(path)
  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': `'attachment; filename=${filename}'`
    // res.attachment(name)
  })
  f.pipe(res)
})
// 添加项目任务操作
router.post('/allupdate', function(req, res) {
  const name = req.query.name
  const number = req.query.number
  const corp = req.query.corp
  const product = req.query.product
  const renwuxinzhi = req.query.renwuxinzhi
  const tuzhong = req.query.tuzhong
  const chicun = req.query.chicun
  const chenpingcaizhi = req.query.chenpingcaizhi
  const xiangmufuzeren = req.query.xiangmufuzeren
  const yongtu = req.query.yongtu
  const zhitufanwei = req.query.zhitufanwei
  const details = req.query.details
  const members = req.query.members
  const zilaioshujustate = req.query.zilaioshujustate
  const jichushujustate = req.query.jichushujustate
  const date = req.query.date
  const memberjindu = []
  for (const item in members) {
    memberjindu.push(members[item] + '-' + '状态')
  }
  console.log('/allupdate GET 请求' + memberjindu)
  var sql = `insert into 项目列表 (name,corp,product,
  renwuxinzhi,tuzhong,chicun,chenpingcaizhi,
  xiangmufuzeren,yongtu,zhitufanwei,details,member
  ,zilaioshujustate,jichushujustate,date,number
  ,memberjindu)values('${name}','${corp}','${product}','${renwuxinzhi}'
  ,'${tuzhong}','${chicun}','${chenpingcaizhi}','${xiangmufuzeren}',
  '${yongtu}','${zhitufanwei}','${details}','${members}','${zilaioshujustate}'
  ,'${jichushujustate}','${date}','${number}','${memberjindu}')`
  mysql.query(sql, function(result) {})
  var sql1 = `insert into 项目进度控制表 (projectname)values('${name}')`
  mysql.query(sql1, function(result) {})
  return res.json(1)
})
// 添加项目任务操作
router.post('/allupdate1', function(req, res) {
  const name = req.query.name
  const corp = req.query.corp
  const product = req.query.product

  const details = req.query.details
  const members = req.query.members
  const mobancanshustate = req.query.mobancanshustate
  const tufuguifanstate = req.query.tufuguifanstate
  const fzrjinchushujustate = req.query.fzrjinchushujustate
  const fzrziliaoshujustate = req.query.fzrziliaoshujustate
  const renwuxinzhi = req.query.renwuxinzhi
  const tuzhong = req.query.tuzhong
  const chicun = req.query.chicun
  const chenpingcaizhi = req.query.chenpingcaizhi
  const task = req.query.task
  const yongtu = req.query.yongtu
  const zhitufanwei = req.query.zhitufanwei
  var sql = `insert into 负责人的项目列表 
  (name,corp,product,details,member,
  mobancanshustate,tufuguifanstate,
  fzrjinchushujustate,fzrziliaoshujustate
  ,renwuxinzhi,tuzhong,chicun,chenpingcaizhi
  ,yongtu,zhitufanwei,task)values('${name}','${corp}',
  '${product}','${details}','${members}','${mobancanshustate}',
  '${tufuguifanstate}','${fzrjinchushujustate}',
  '${fzrziliaoshujustate}','${renwuxinzhi}','${tuzhong}',
 '${chicun}','${chenpingcaizhi}','${yongtu}','${zhitufanwei}','${task}')`
  mysql.query(sql, function(result) {
    return res.json(1) // 用户不存在
  })
})
// 获取所有项目任务操作
router.post('/getprojects', function(req, res) {
  var sql = `select * from 项目列表`
  mysql.query(sql, function(result) {
    return res.json(result)
  })
})
// 添加用户操作
router.post('/loginAddUser', function(req, res) {
  const username = req.query.name
  const password = req.query.password
  const right = req.query.right
  var sql = `INSERT INTO 用户信息(username, 
  password, rights) VALUES('${username}', 
  '${password}', '${right}')`
  mysql.query(sql, function(result) {
    return res.json(1)
  })
})
// 获取所有项目任务操作
router.post('/getfzrprojects', function(req, res) {
  var sql = `select * from 负责人的项目列表`
  mysql.query(sql, function(result) {
    return res.json(result)
  })
})
// 获取进度控制操作
router.post('/getstate', function(req, res) {
  var sql = `select * from 项目进度控制表`
  mysql.query(sql, function(result) {
    return res.json(result)
  })
})
// 获取进度控制操作
router.post('/getstate1', function(req, res) {
  const name = req.query.username
  var sql = `select * from 项目进度控制表 where projectname = '${name}' `
  mysql.query(sql, function(result) {
    return res.json(result)
  })
})
// 获取文件查询操作
router.post('/searchfile', function(req, res) {
  const name = req.query.name
  const property = req.query.property
  if (name !== '') {
    if (property === '1') {
      var sql = `select * from 项目列表 where name like '${name}%'`
      mysql.query(sql, function(result) {
        return res.json(result)
      })
    } else if (property === '2') {
      var sql1 = `select * from 项目列表 where xiangmufuzeren like '${name}%'`
      mysql.query(sql1, function(result) {
        return res.json(result)
      })
    } else if (property === '3') {
      var sql2 = `select * from 项目列表 where date like '${name}%'`
      mysql.query(sql2, function(result) {
        return res.json(result)
      })
    } else if (property === '4') {
      var sql4 = `select * from 项目列表 where number = '${name}'`
      mysql.query(sql4, function(result) {
        return res.json(result)
      })
    } else {
      var data = 'JSON.parse(result)'
      return res.json(data)
    }
  } else {
    return res.json(data)
  }
})
// 修改项目操作
router.post('/modify', function(req, res) {
  // console.log(req.query)
  const name = req.query.name
  let property = req.query.property
  const modifyname = req.query.modifyname
  let modifyproperty = req.query.modifyproperty
  if (property === 1) {
    property = 'name'
  } else if (property === 2) {
    property = 'number'
  } else {
    property = false
  }
  if (modifyproperty === 1) {
    modifyproperty = 'name'
  } else if (modifyproperty === 2) {
    modifyproperty = 'number'
  } else if (modifyproperty === 3) {
    modifyproperty = 'corp'
  } else if (modifyproperty === 4) {
    modifyproperty = 'product'
  } else if (modifyproperty === 5) {
    modifyproperty = 'details'
  } else {
    modifyproperty = false
  }
  var sql = `
          update 项目列表 set $ {
            modifyproperty
          } = '${modifyname}'
          where $ {
            property
          } = '${name}'
          `
  // console.log(sql)
  mysql.query(sql, function(result) {
    return res.json(result)
  })
})

// 改变进度控制操作
router.post('/stateupdate', function(req, res) {
  const name = req.query.name
  const proname = req.query.proname

  let a
  let b
  if (name === 13) {
    var sql3 = `update 项目列表 set state= 1 where name = '${proname}' `
    mysql.query(sql3, function(result) {})
  }
  if (name === '1') {
    a = `jf =1`
    b = `xiangmujindu= '甲方资料交接'`
  } else if (name === '2') {
    a = `qd =1`
    b = `xiangmujindu= '签订合同'`
  } else if (name === '3') {
    a = `rw =1`
    b = `xiangmujindu= '任务下发'`
  } else if (name === '4') {
    a = `zy =1`
    b = `xiangmujindu= '作业任务下发'`
  } else if (name === '5') {
    a = ` bz = 1 `
    b = `   xiangmujindu = '班组检查'`
  } else if (name === '6') {
    a = ` bm = 1 `
    b = ` xiangmujindu = '部门检查'`
  } else if (name === '7') {
    a = ` yn = 1 `
    b = ` xiangmujindu = '院内检查'        `
  } else if (name === '8') {
    a = ` jl = 1 `
    b = ` xiangmujindu = '局里检查'        `
  } else if (name === '9') {
    a = `jfq = 1 `
    b = ` xiangmujindu = '甲方确认'        `
  } else if (name === '10') {
    a = ` jff = 1 `
    b = `xiangmujindu = '甲方付款'        `
  } else if (name === '11') {
    a = ` ys = 1 `
    b = ` xiangmujindu = '印刷出品' `
  } else if (name === '12') {
    a = ` cp = 1 `
    b = ` xiangmujindu = '成品交付'  `
  } else if (name === '13') {
    a = ` xm = 1 `
    b = ` xiangmujindu = '项目归档' `
  }
  const sql = `update 项目进度控制表 set ${a}
        where projectname = "${proname}"
        `
  const sql1 = `
        update 项目列表 set ${b}
        where name = '${proname}'
        `
  mysql.query(sql, function(result) {

  })
  mysql.query(sql1, function(result) {

  })

  return res.json({
    'Hello GET': 0
  })
})
// 改变个人任务进度控制操作
router.post('/statusupdate', function(req, res) {
  const name = req.query.name
  const status = req.query.status
  const projectName = req.query.projectName
  // console.log("/statusupdate GET 请求" + name)
  var sql = `
        select memberjindu from 项目列表 where name = '${projectName}'
        `
  mysql.query(sql, function(result) {
    const object = JSON.parse(result)
    const str = (object[0].memberjindu).split(',')
    const result_next = []
    for (const item of str) {
      let res_str = ''
      const user = item.split('-')
      if (user[0] === name) {
        res_str = user[0] + '-' + status
      } else {
        res_str = user[0] + '-' + user[1]
      }
      result_next.push(res_str)
    }
    const sql1 = `
        update 项目列表 set memberjindu =
          '${result_next}'
        where name = '${projectName}'
        `
    mysql.query(sql1, function(result) {

    })
  })
  return res.json({
    'Hello GET': 0
  })
})

module.exports = router