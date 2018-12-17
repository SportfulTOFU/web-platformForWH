<template>
    <div class="main">
        <!-- MAIN CONTENT -->
        <div class="main-content">
            <div class="container-fluid">
                <!-- OVERVIEW -->
                <div class="panel panel-headline">
                    <div class="panel-heading">
                        <h3 class="panel-title">项目进度总览</h3>
                        <p class="panel-subtitle"></p>
                    </div>
                    <div class="panel-body">
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                                style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请输入所要查找的项目</label>

                                
                                </span>
                            <span class="input-group-btn" >
                                    <select class="form-control" style="width:auto" v-model="searchproperty">
                                    <option value="1" >项目名</option>
                                    <option value="2">项目负责人</option>
                                    <option value="3">项目发布时间</option>
                                    <option value="4">项目编号</option>
                                    <option value="5">其他（维护）</option>
                                    </select>
                                 </span>
                            <input type="text" value="" v-if="searchproperty == '1'" class="form-control" v-model="searchname" placeholder="请输入项目名称，例：项目一">
                            <input type="text" value="" v-else-if="searchproperty == '2'" class="form-control" v-model="searchname" placeholder="请输入项目负责人账号名，例：admin1">
                            <input type="text" value="" v-else-if="searchproperty == '3'" class="form-control" v-model="searchname" placeholder="请输入日期，例：2018-XX-XX">
                            <input type="text" value="" v-else-if="searchproperty == '4'" class="form-control" v-model="searchname" placeholder="请输入项目编号，例：1">
                            <input type="text" value="" v-else class="form-control" v-model="searchname" placeholder="暂未开放，请选择其他搜索条件">
                            <span class="input-group-btn">


                                 <button class="btn btn-primary" type="button"  data-toggle="modal" data-target=".bs-example-modal-lg-search" @click="searchfile" >点击查询</button>
                                </span>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div id="headline-chart" class="ct-chart">
                                    <div class="col-md-6">
                                        <!-- TASKS -->
                                        <div class="panel-heading">
                                            <h3 class="panel-title">{{projects[flag_pro_member].name}}的项目进度<i class="fa fa-arrow-circle-up" aria-hidden="true" type="button" style="cursor:pointer" title="上一个项目" @click="downProTotal"> </i><i class="fa fa-arrow-circle-down" aria-hidden="true" type="button" style="cursor:pointer" title="下一个项目" @click="upProTotal"> </i></h3>
                                        </div>
                                        <div class="panel-body" style="height:500px;overflow:auto">
                                            <ul class="list-unstyled task-list" v-for="item in memberjindu">
                                                <li>
                                                    <p>
                                                        {{item.name}}进度情况： <span class="label-percent">{{item.state}}</span>
                                                    </p>
                                                    <hr />
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- END TASKS -->
                                    </div>
                                    <div class="col-md-6">
                                        <div v-show="rights!==1">
                                            <div class="panel-heading">
                                                <h3 class="panel-title">项目:{{projects[projects.length-flag_pro].name}}的进度控制 <i class="fa fa-arrow-circle-up" aria-hidden="true" type="button" style="cursor:pointer" title="上一个项目" @click="upPro"> </i><i class="fa fa-arrow-circle-down" aria-hidden="true" type="button" style="cursor:pointer" title="下一个项目" @click="downPro"> </i></h3>
                                            </div>
                                            <div class="panel-body">
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <select class="form-control" v-model="name">
                                                            <option value="1">甲方资料交接</option>
                                                            <option value="2">签订合同</option>
                                                            <option value="3">任务下发</option>
                                                            <option value="4">作业任务下发</option>
                                                            <option value="5">班组检查</option>
                                                            <option value="6">部门检查</option>
                                                            <option value="7">院内检查</option>
                                                            <option value="8">局里检查</option>
                                                            <option value="9">甲方确认</option>
                                                            <option value="10">甲方付款</option>
                                                            <option value="11">印刷出品</option>
                                                            <option value="12">成品交付</option>
                                                            <option value="13">项目归档</option>
                                                        </select>
                                                    </div>
                                                    <div class="col-md-3 text-right"><button class="btn btn-primary" @click="update" v-if='rights==1' disabled>点击提交</button><button class="btn btn-primary" @click="update" v-else>点击提交</button></div>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                        <div class="panel-heading">
                                            <h3 class="panel-title">项目总览</h3>
                                            <div class="right">
                                                <span class="label-percent">项目个数：{{projects.length}}</span>
                                            </div>
                                        </div>
                                        <div class="panel-body" style="height:200px;overflow:auto">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>项目编号</th>
                                                        <th>项目名称</th>
                                                        <th>项目完成状态</th>
                                                        <th>项目进度查询</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    <tr v-for="item in unfinishpros">
                                                        <td><a >{{item.number}}</a></td>
                                                        <td>{{item.name}}</td>
                                                        <td><span class="label label-danger" v-if="item.state == '0'">未完成</span><span class="label label-success" v-else>已完成</span></td>
                                                        <td> <a  class="btn-sm
                                                           btn-primary" data-toggle="modal" data-target="#myModal" @click='searchstate(item.name)'  >查询</a></td>
                                                    </tr>
                                                    <tr v-for="item in finishpros">
                                                        <td><a >{{item.number}}</a></td>
                                                        <td>{{item.name}}</td>
                                                        <td><span class="label label-danger" v-if="item.state == '0'">未完成</span><span class="label label-success" v-else>已完成</span></td>
                                                        <td>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MAIN CONTENT -->
        </div>
        <!-- END MAIN -->
        <div class="clearfix"></div>
        <div class="modal fade bs-example-modal-lg-search" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">具体项目查询</h4>
                    </div>
                    <div class="modal-body">
                        <div class="panel-body no-padding">
                            <table class="table table-striped" id="excel">
                                <thead>
                                    <tr>
                                        <th>项目编号</th>
                                        <th>项目名称</th>
                                        <th>委托单位</th>
                                        <th>成果内容</th>
                                        <th>技术要求</th>
                                        <th>负责人</th>
                                        <th>项目组其他成员</th>
                                        <th>项目发布时间</th>
                                        <th>项目进度</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in searchedfile">
                                        <td><a >{{item.number}}</a></td>
                                        <td><a >{{item.name}}</a></td>
                                        <td>{{item.corp}}</td>
                                        <td>{{item.product}}</td>
                                        <td>{{item.details}}</td>
                                        <td>{{item.xiangmufuzeren}}</td>
                                        <td>{{item.member}}</td>
                                        <td>{{item.date}}</td>
                                        <td>{{item.xiangmujindu}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="download">下载保存</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">项目名称：{{mtname}}</h4>
                    </div>
                    <div class="modal-body">
                        <p class="demo-button">
                            <p v-for="(item,index) in mt[0]" style="display:inline-block;padding:1%;">
                                <button type="button" class="btn btn-success" v-if="item==1&&index!='id'&&index!='projectname'"><i class="fa fa-check-circle"></i> {{change(index)}}</button>
                                <button type="button" class="btn btn-default disabled" v-else-if="item==0&&index!='id'&&index!='projectname'"><i class="fa fa-warning"></i> {{change(index)}}</button>
                            </p>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>
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
    name: 'Overview',
    data() {
        return {
            projects: [{name:'',memberjindu:''}],
            users: '',
            name: '1',
            state: '',
            mt: '',
            mtname: '',
            searchname: '',
            searchproperty: '1',
            searchedfile: {},
            username: localStorage.getItem('username'),
            flag_pro: 1,
            flag_pro_member: 0,
        }
    },
    computed: {
        unfinishpros: function() {
            let cur = this;
            return this.projects.filter(function(item) {
                if (item.state == 0) {
                    return item
                }
            })
        },
        finishpros: function() {
            let cur = this;
            return this.projects.filter(function(item) {
                if (item.state == 1) {
                    return item
                }

            })
        },
        rights: function() {
            let cur = this;
            let proj = 0;
            for (let i = cur.users.length - 1; i > -1; i--) {
                if (cur.users[i].username == cur.username) {
                    proj = 1;
                    return proj;
                } else {
                }
            }
        },
        memberjindu: function() {
            let cur = this;
            let project = (cur.projects[cur.flag_pro_member].memberjindu).split(',');
            let result = []

            for (let item in project) {
                let object = {}
                let arr = project[item].split('-')

                object.name = arr[0]
                object.state = arr[1]
                result.push(object)
            }
            return result
        }
    },
    created:function(){
       this.getusers()
        this.getprojects()
    },
    methods: {
      getprojects() {
            let cur = this
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://localhost:8081/getprojects", //请求url  
                    params: { username: "hi" }, //前端向后端传送的数据
                }).then(function(response) {
                    let data = response.data
                    if (data == null) {
                    } else {
                        cur.projects = JSON.parse(data)
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        },
     getusers() {
            let cur = this
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://localhost:8081/getusers", //请求url  
                    params: { username: "hi" }, //前端向后端传送的数据
                }).then(function(response) {
                    let data = response.data
                    if (data == null) {
                    } else {
                        cur.users = JSON.parse(data)
                    }

                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        searchstate(a) {
            let cur = this;
            cur.$axios({
                    method: 'post',
                    url: "http://localhost:8081/getstate1",
                    params: { username: a },
                }).then(function(response) {
                    cur.mt = JSON.parse(response.data)
                    cur.mtname = cur.mt[0].projectname
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        searchfile() {
            let name = this.searchname;
            let property = this.searchproperty;
            let cur = this;
            if (1) {}
            cur.$axios({
                    method: 'post',
                    url: "http://localhost:8081/searchfile",
                    params: { name: name, property: property },
                }).then(function(response) {
                    var object = JSON.parse(response.data)
                    if (object[0] == null) {
                        let n = {};
                        cur.searchedfile = n;
                    } else {
                        cur.searchedfile = object;
                        cur.searchedfile["xiangmujindu"] = 'sd'
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        update() {
            let cur = this;
            cur.$axios({
            method: 'post',
                url: "http://localhost:8081/stateupdate",
                params: { name: cur.name, proname: cur.projects[cur.projects.length - cur.flag_pro].name },
            }).then(function(response) {
                     alert("项目进度修改成功")
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        change(a) {
            if (a == 'jf') {
                return '甲方数据交接';
            } else if (a == 'qd') {
                return '签订合同';
            } else if (a == 'rw') {
                return '任务下发';
            } else if (a == 'zy') {
                return '作业任务下发';
            } else if (a == 'bz') {
                return '班组检查';
            } else if (a == 'bm') {
                return '部门检查';
            } else if (a == 'yn') {
                return '院内检查';
            } else if (a == 'jl') {
                return '局里检查';
            } else if (a == 'jfq') {
                return '甲方确认';
            } else if (a == 'jff') {
                return '甲方付款';
            } else if (a == 'ys') {
                return '印刷出品';
            } else if (a == 'cp') {
                return '成品交付';
            } else if (a == 'xm') {
                return '项目归档';
            }
        },
        download() {
            var tableHtml = $('#excel');
            //不能显示class的样式，所以自己重新添加样式 主要为设置边框 格子大小
            $(tableHtml).css({
                'border': '1px solid #d5d5d2',
                'text-align': 'center',
                'border-collapse': 'collapse',
            });
            $(tableHtml).find('tr td').css({
                'text-align': 'center',
                'border': '1px solid #d5d5d2',
                'line-height': '30px',
                'padding': '0px 10px',
                'min-width': '100px'
            });
            var html = "<html><head><meta charset='utf-8' /></head><body>" + tableHtml[0].outerHTML + "</body></html>";
            // 实例化一个Blob对象，其构造函数的第一个参数是包含文件内容的数组，第二个参数是包含文件类型属性的对象
            var blob = new Blob([html], { type: "application/vnd.ms-excel" });
            var urlA = document.createElement('a');
            // 利用URL.createObjectURL()方法为a元素生成blob URL
            $('.table-btn-group').append(urlA);
            urlA.href = URL.createObjectURL(blob);
            // 设置文件名，目前只有Chrome和FireFox支持此属性
            urlA.download = "项目查询结果.xls";
            urlA.click();

        },
        upPro() {
            this.flag_pro < this.projects.length ?
                this.flag_pro++
                :
                alert("到尽头了");
        },
        downPro() {
            this.flag_pro > 1 ?
                this.flag_pro--
                :
                alert("到尽头了");
        },
        upProTotal() {
            this.flag_pro_member < this.projects.length - 1 ?
                this.flag_pro_member++
                :
                alert("到尽头了" + this.projects.length);
        },
        downProTotal() {
            this.flag_pro_member > 0 ?
                this.flag_pro_member--
                :
                alert("到尽头了");
        },
    }
}
</script>
<style>
</style>[
]