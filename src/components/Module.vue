<template>
    <div class="main">
        <!-- MAIN CONTENT -->
        <div class="main-content">
            <div class="container-fluid">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">班组长项目上传 <i class="fa fa-edit" type="button"  data-toggle="modal" data-target=".bs-example-modal-lg" style="cursor:pointer" title="修改项目"> </i></h3>
                    </div>
                    <div class="panel-body">
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">项目名称</label></span>
                            <input type="text" class="form-control" placeholder="请输入项目名称" v-model="name">
                        </div>
                        <br>
                        <div class="input-group " style="width:100%">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">项目编号</label></span>
                            <input type="text" class="form-control" placeholder="请输入项目编号" v-model="number" v-on:input="update">
                            <span  v-show="showTishi"   class="input-group-addon" style="color: red; font-size: 14px; text-align: right; font-weight: normal;"> 项目编号重复，请重新选择项目编号</span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">委托单位</label></span>
                            <input type="text" class="form-control" placeholder="请输入委托单位" v-model="corp">
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">成果内容</label></span>
                            <input type="text" class="form-control" placeholder="请输入成果内容" v-model="product">
                        </div>
                        <br>
                        <textarea class="form-control" placeholder="技术要求：表示的主题、工期、基本的技术流程" rows="4" v-model="details"></textarea>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">基础数据上传</label></span>
                            <input type="file" class="form-control" placeholder="Username" id="inputGroupFile05" style="opacity: 0.5;" ref="inputer"> <span
                  class="input-group-addon"> <label
                  class="fa fa-folder-open" for="inputGroupFile05"
                  style="cursor: pointer"></label></span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">资料数据上传</label></span>
                            <input type="file" class="form-control" placeholder="Username" id="inputGroupFile05" style="opacity: 0.5;" ref="inputer1"> <span
                  class="input-group-addon"> <label
                  class="fa fa-folder-open" for="inputGroupFile05"
                  style="cursor: pointer"></label></span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请选择项目负责人</label></span>
                            <select class="form-control" v-model="xiangmufuzeren">
                                <option value="admin1">负责人一</option>
                                <option value="admin2">负责人二</option>
                                <option value="admin3">负责人三</option>
                                <option value="admin4">负责人四</option>
                                <option value="admin5">负责人五</option>
                                <option value="admin6">负责人六</option>
                            </select>
                            </span>
                        </div>
                        <br>
                        <div class="panel panel-scrolling ">
                            <div class="panel-heading">
                                <h6 class="panel-title" style="font-size:16px">作业员选择</h6>
                                <div class="right">
                                    <button type="button" class="btn-toggle-collapse"><i class="lnr lnr-chevron-up"></i></button>
                                </div>
                            </div>
                            <div class="panel-body " style="height:250px;overflow:auto">
                                <ul class="list-unstyled activity-list" v-for="item in users">
                                    <li style="height:10px">
                                        <label class="fancy-checkbox">
                                            <input type="checkbox" @click="adduser(item.username)"> <span>{{item.username}}</span>
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="text-center">
                            <a class="btn btn-primary" @click="allupdate">点击提交</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END MAIN CONTENT -->
        <!-- END MAIN -->
        <div class="clearfix"></div>
        <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">具体项目修改</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body no-padding">
                            <div class="input-group ">
                                <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请选择所修改项目的项目名或编号</label>

                                
                                </span>
                                <span class="input-group-btn" >
                                    <select class="form-control" style="width:auto" v-model="searchproperty">
                                    <option value="1" >项目名</option>
                                    <option value="2" >项目编号</option>
                                    <option value="3">其他（维护）</option>
                                    </select>
                                 </span>
                                <input type="text" value="" class="form-control" v-model="searchname" placeholder="请输入完整内容">
                            </div>
                            <br>
                            <div class="input-group ">
                                <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请选择所修改项目内容</label>

                                
                                </span>
                                <span class="input-group-btn" >
                                    <select class="form-control" style="width:auto" v-model="modifyproperty">
                                    <option value="1" >项目名</option>
                                    <option value="2" >项目编号</option>
                                    <option value="3">委托单位</option>
                                     <option value="4" >成果内容</option>
                                    <option value="5" >技术要求</option>
                                    <option value="6">其他（维护）</option>
                                    </select>
                                 </span>
                                <input type="text" value="" class="form-control" v-model="modifyname" placeholder="请输入完整内容">
                            </div>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="modify">点击修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade bs-example-modal-lg-login" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">添加成员信息</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body no-padding">
                            <div class="input-group ">
                                <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请输入用户名</label>
                                </span>
                                <input type="text" value="" class="form-control" v-model="login_name" placeholder="请不要使用空格" v-on:input="loginUserName">
                                <span  v-show="showTishi_login_name"   class="input-group-addon" style="color: red; font-size: 14px; text-align: right; font-weight: normal;"> 用户名重复，请重新选择</span>
                            </div>
                            <br>
                            <div class="input-group ">
                                <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请输入密码</label>
                                </span>
                                <input type="password" value="" class="form-control" v-model="login_password" placeholder="建议八位以上">
                            </div>
                            <br>
                            <div class="input-group ">
                                <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请确认密码</label>
                                </span>
                                <input type="password" value="" class="form-control" v-model="login_password_again" placeholder="再次输入相同密码">
                                <span  v-show="showTishi_login_password"   class="input-group-addon" style="color: red; font-size: 14px; text-align: right; font-weight: normal;"> 密码输入错误，请重新输入</span>
                            </div>
                            <br>
                            <div class="input-group ">
                                <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请选择用户权限</label>
                                </span>
                                <select class="form-control" v-model="login_right">
                                    <option value="admin">班组长用户</option>
                                    <option value="leader">项目负责人用户</option>
                                    <option value="user">作业员用户</option>
                                </select>
                            </div>
                            <br>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="addUserRight">点击添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    delCookie,
    getCookie
} from '../assets/scripts/cookie.js'
export default {
    name: 'Module',
    data() {
        return {
            name: '',
            number: '',
            corp: '',
            product: '',
            details: '',
            renwuxinzhi: '0',
            tuzhong: '0',
            chicun: '0',
            chenpingcaizhi: '0',
            yongtu: '0',
            zhitufanwei: '0',
            xiangmufuzeren: '',
            jichushujustate: '',
            zilaioshujustate: '',
            showTishi: false,
            member: '',
            members: [],
            users: '',
            searchproperty: '1',
            searchname: '',
            modifyproperty: '1',
            modifyname: '',
            login_name: '',
            login_password: '',
            login_password_again: '',
            login_right: '',
            showTishi_login_name: false,
            showTishi_login_password: false,
        }
    },
    created: function() {
        this.getusers()
    },
    methods: {
        getusers() {
            let cur = this
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://47.96.162.249:8081/getusers", //请求url  
                    params: { username: "hi" }, //前端向后端传送的数据
                }).then(function(response) {
                    let data = response.data
                    if (data == null) {} else {
                        cur.users = JSON.parse(data)
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        update: function() {
            let projects;
            let cur = this;
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://47.96.162.249:8081/getprojects", //请求url  
                    params: { username: "hi" }, //前端向后端传送的数据
                }).then(function(response) {
                    let data = response.data
                    if (data == null) {} else {
                        projects = JSON.parse(data)
                    }
                    let flag = 0;
                    for (let i = 0; i < projects.length; i++) {
                        if (cur.number.toString() == projects[i].number) {
                            cur.showTishi = true
                            flag = 1;
                        } else {

                        }
                        if (i > projects.length - 2 && flag == 0) {
                            cur.showTishi = false
                        }
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });

        },
        adduser(a) {
            var members = this.members
            if (members.indexOf(a) > -1) {
                var index = members.indexOf(a);
                if (index > -1) {
                    members.splice(index, 1);
                }
            } else {
                members.push(a)
            }

        },
        fileupdate(a, b) {
            let inputDOM = a;
            // 通过DOM取文件数据
            this.file = inputDOM.files[0];
            let cur = this;
            if (this.file != null) {
                var formdata = new FormData()
                formdata.append('fileSelect', inputDOM.files[0]);
                formdata.append('projectname', cur.name);
                formdata.append('leader', cur.xiangmufuzeren);
                formdata.append('state', 1);
                formdata.append('table', b);
                if (b == '基础数据列表') {
                    cur.jichushujustate = 1
                } else if (b == '资料数据列表') {
                    cur.zilaioshujustate = 1;
                } else {}
                cur.$axios({
                        method: 'post',
                        url: "http://47.96.162.249:8081/updatefile",
                        data: formdata,
                    }).then(function(response) {})
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                var formdata = new FormData()
                formdata.append('projectname', cur.name);
                formdata.append('leader', cur.xiangmufuzeren);
                formdata.append('state', 0);
                formdata.append('table', b);
                if (b == '基础数据列表') {
                    cur.jichushujustate = 0
                } else if (b == '资料数据列表') {
                    cur.zilaioshujustate = 0;
                } else {

                }
                cur.$axios({
                        method: 'post',
                        url: "http://47.96.162.249:8081/updatefile",
                        data: formdata,
                    }).then(function(response) { console.log(`未上传${b}文件`); })
                    .catch(function(error) {
                        console.log(error);
                    });

            }

        },
        modify() {
            let cur = this;
            this.$axios({
                    method: 'post',
                    url: 'http://47.96.162.249:8081/modify',
                    params: { name: cur.searchname, property: cur.searchproperty, modifyname: cur.modifyname, modifyproperty: cur.modifyproperty }
                })
                .then(function(response) {
                    if (JSON.parse(response.data).changedRows == 0) {
                        alert("修改不成功")
                    } else {
                        alert("修改成功")
                        $(".bs-example-modal-lg").modal('hide');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        allupdate() {
            let date = new Date();
            var seperator1 = "-";
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = year + seperator1 + month + seperator1 + strDate;
            this.fileupdate(this.$refs.inputer, '基础数据列表');
            this.fileupdate(this.$refs.inputer1, '资料数据列表');
            if (this.name == '') {
                alert("请输入项目名称");
            } else if (this.corp == '') {
                alert("请输入项目的委托单位");
            } else if (this.product == '') {
                alert("请输入项目的成果内容");
            } else if (this.details == '') {
                alert("请输入项目的技术要求");
            } else if (this.xiangmufuzeren == '') {
                alert("请选择项目负责人");
            } else if (this.members == '') {
                alert("请选择项目作业人员");
            } else {
                let cur = this;
                cur.$axios({
                        method: 'post',
                        url: 'http://47.96.162.249:8081/allupdate',
                        params: {
                            name: cur.name,
                            number: cur.number,
                            corp: cur.corp,
                            product: cur.product,
                            details: cur.details,
                            members: cur.members,
                            renwuxinzhi: cur.renwuxinzhi,
                            tuzhong: cur.tuzhong,
                            chicun: cur.chicun,
                            chenpingcaizhi: cur.chenpingcaizhi,
                            yongtu: cur.yongtu,
                            zhitufanwei: cur.zhitufanwei,
                            xiangmufuzeren: cur.xiangmufuzeren,
                            zilaioshujustate: cur.zilaioshujustate,
                            jichushujustate: cur.jichushujustate,
                            date: currentdate
                        }
                    })
                    .then(function(response) {
                        alert("项目上传成功")
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            }
        },
        loginUserName: function() {
            let cur = this
            let users = JSON.parse(JSON.parse(localStorage.getItem('allusers')))
            let flag = 0;
            for (let i = 0; i < users.length; i++) {
                if (cur.login_name == users[i].username) {
                    cur.showTishi_login_name = true
                    flag = 1;
                } else {

                }
                if (i > users.length - 2 && flag == 0) {
                    cur.showTishi_login_name = false
                }
            }
        },
        addUserRight() {
            let cur = this;
            if (cur.login_name == '') {
                alert("请输入注册用户名")
            } else if (cur.login_password == '' || cur.login_password_again == '') {
                alert("请输入密码")
            } else if (cur.login_right == '') {
                alert("请选择用户权限")
            } else if (cur.login_password != cur.login_password_again) {
                alert("密码输入错误，请重新输入密码")
            } else {
                cur.$axios({
                        method: 'post',
                        url: "http://47.96.162.249:8081/loginAddUser",
                        params: { name: cur.login_name, password: cur.login_password, right: cur.login_right },
                        dataType: "json", //数据格式json
                    }).then(function(response) {
                        alert("添加成功")
                        $(".bs-example-modal-lg-login").modal('hide');
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
}
</script>
<style scoped>
</style>