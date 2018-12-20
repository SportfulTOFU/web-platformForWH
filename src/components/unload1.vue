<template>
    <div class="main">
        <!-- MAIN CONTENT -->
        <div class="main-content">
            <div class="container-fluid">
                <div class="col-md-12">
                    <!-- RECENT PURCHASES -->
                    <div class="panel panel-scrolling">
                        <div class="panel-heading">
                            <h3 class="panel-title">项目具体说明 <i class="fa fa-arrow-circle-up" aria-hidden="true" type="button" style="cursor:pointer" title="上一个项目" @click="upPro"> </i><i class="fa fa-arrow-circle-down" aria-hidden="true" type="button" style="cursor:pointer" title="下一个项目" @click="downPro"> </i></h3>
                            <div class="right">
                                <button type="button" class="btn-toggle-collapse"><i class="lnr lnr-chevron-up"></i></button>
                            </div>
                        </div>
                        <div class="panel-body">
                            <p class="panel-subtitle">
                                项目名称：{{project[flag_pro].name}}
                            </p>
                            <p class="panel-subtitle">
                                委托单位：{{project[flag_pro].corp}}
                            </p>
                            <p class="panel-subtitle">
                                成果内容：{{project[flag_pro].product}}
                            </p>
                            <p class="panel-subtitle">
                                技术要求：{{project[flag_pro].details}}
                            </p>
                            <p class="panel-subtitle">
                                负责人：{{project[flag_pro].xiangmufuzeren}}
                            </p>
                            <p class="panel-subtitle">
                                项目组其他成员：{{project[flag_pro].member}}
                            </p>
                        </div>
                    </div>
                    <!-- END RECENT PURCHASES -->
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <h3 class="col-md-6 panel-title">基础数据</h3>
                                <div class="col-md-6 text-right">
                                    <a class="btn btn-primary" v-if='project[flag_pro].jichushujustate==1' @click='download("基础数据列表")'>点击下载</a>
                                    <a  class="btn btn-info" v-else  disabled>没有文件</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <div class="panel-heading">
                            <div class="row">
                                <h3 class="col-md-6 panel-title">资料数据</h3>
                                <div class="col-md-6 text-right">
                                    <a  class="btn btn-primary"  v-if='project[flag_pro].zilaioshujustate==1' @click='download("资料数据列表")'>点击下载</a>
                                    <a  class="btn btn-info" v-else  disabled>没有文件</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MAIN CONTENT -->
        </div>
        <!-- END MAIN -->
    </div>
</template>
<script>
import {
    delCookie,
    getCookie
} from '../assets/scripts/cookie.js'
import $ from 'jquery';
import axios from 'axios'
export default {
    name: 'Unload1',
    data() {
        return {
            username: localStorage.getItem('username'),
            projects: '',
            project: [{ name: "" }],
            flag_pro: 0
        }
    },
    created: function() {
        this.getprojects()
    },
    components: {},
    methods: {
        getprojects() {
            let cur = this
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://47.96.162.249:8081/getprojects", //请求url  
                    params: { username: "hi" }, //前端向后端传送的数据
                }).then(function(response) {
                    let data = response.data
                    if (data == null) {} else {
                        cur.projects = JSON.parse(data)
                    }
                    let proj = [];
                    for (let i = 0; i < cur.projects.length; i++) {
                        if (cur.username == cur.projects[cur.projects.length - 1 - i].xiangmufuzeren) {
                            proj.push(cur.projects[cur.projects.length - 1 - i]);
                        } else {
                        }
                    }
                    cur.project = proj;
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        upPro() {
            this.flag_pro < this.project.length - 1 ?
                this.flag_pro++
                :
                alert("到尽头了" + this.project.length);
        },
        downPro() {
            this.flag_pro > 0 ?
                this.flag_pro--
                :
                alert("到尽头了");
        },
        download(a) {
            let cur = this;
            /*接口请求*/
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://47.96.162.249:8081/downloadfile1", //请求url  
                    params: {
                        name: a,
                        projectname: cur.project[cur.flag_pro].name
                    } //前端向后端传送的数据 
                }).then(function(response) {
                    if (response.data == 0) {
                        alert("还未上传该类型文件")
                    } else {
                        var url = `http://47.96.162.249:8081/filepath?path=${response.data.path}&name=${response.data.name}`;
                         
                        let iframe = document.createElement('iframe')
                        iframe.style.display = 'none'
                        iframe.src = url
                        iframe.onload = function() {
                            document.body.removeChild(iframe)
                        }
                        document.body.appendChild(iframe);

                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }

}
</script>
<style>
</style>