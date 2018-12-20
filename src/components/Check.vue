<template>
    <div class="main">
        <!-- MAIN CONTENT -->
        <div class="main-content">
            <div class="container-fluid">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">项目任务进度评价:{{project[flag_pro].name}} <i class="fa fa-arrow-circle-up" aria-hidden="true" type="button" style="cursor:pointer" title="上一个项目" @click="upPro"> </i><i class="fa fa-arrow-circle-down" aria-hidden="true" type="button" style="cursor:pointer" title="下一个项目" @click="downPro"> </i></h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-9">
                                <select class="form-control" v-model="name">
                                    <option value="0" hidden>请下拉选择进度</option>
                                    <option value="地理地图整理">地理底图整理</option>
                                    <option value="专题数据录入">专题数据录入</option>
                                    <option value="图面整饰">图面整饰</option>
                                    <option value="样图输出">样图输出</option>
                                </select>
                            </div>
                            <div class="col-md-3 text-right"><a class="btn btn-primary" @click="statusupdate">点击提交</a></div>
                        </div>
                    </div>
                </div>
                <!-- TASKS -->
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">项目总体进度环节<i class="fa fa-arrow-circle-up" aria-hidden="true" type="button" style="cursor:pointer" title="上一个项目" @click="upProTotal"> </i><i class="fa fa-arrow-circle-down" aria-hidden="true" type="button" style="cursor:pointer" title="下一个项目" @click="downProTotal"> </i></h3>
                    </div>
                    <div class="panel-body">
                        <span class="panel-note"></i> 项目名称：{{solvedState[flag_pro_total].projectname}}</span>
                        <p class="demo-button">
                            <p v-for="(item,index) in solvedState[flag_pro_total]" style="display:inline-block;padding:1%;">
                                <button type="button" class="btn btn-success" v-if="item==1&&index!='id'&&index!='projectname'"><i class="fa fa-check-circle"></i> {{change(index)}}</button>
                                <button type="button" class="btn btn-default disabled" v-else-if="item==0&&index!='id'&&index!='projectname'"><i class="fa fa-warning"></i> {{change(index)}}</button>
                            </p>
                        </p>
                    </div>
                    <!-- END TASKS -->
                </div>
            </div>
        </div>
        <!-- END MAIN CONTENT -->
    </div>
</template>
<script>
import {
    change
} from '../assets/scripts/func.js'

export default {
    name: 'Check',
    data() {
        return {
            name: '0',
            projects: '',
            project: [{ name: '', projectname: '' }],
            state: [{ projectname: '' }],
            username: localStorage.getItem('username'),
            status: '50%',
            flag_pro: 0,
            flag_pro_total: 0,
            solvedState: [{ projectname: '' }],
        }
    },


    created() {
        this.getfzrprojects()
        this.getstate()
    },
    methods: {
        getstate() {
            let cur = this;
            let projects
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://47.96.162.249:8081/getprojects", //请求url  
                    params: { username: "hi" }, //前端向后端传送的数据
                })
                .then(function(response) {
                    let data = response.data
                    if (data == null) {} else {
                        projects = JSON.parse(data)
                    }
                    let proj = '';
                    for (let i = projects.length - 1; i > -1; i--) {
                        if (projects[i].member.search(cur.username) != -1) {
                            proj = projects[i].name;
                            break;
                        } else {}
                    }
                    return proj

                })
                .then((proj) => {
                    let result = cur.$axios({
                            method: 'post', //请求的方式  
                            url: "http://47.96.162.249:8081/getstate", //请求url  
                            params: { username: proj }, //前端向后端传送的数据
                        }).then(function(response) {
                            return response
                        })
                        .catch(function(error) {
                            console.log(error);
                        });
                    return result
                })
                .then((response) => {
                    let data = response.data
                    if (data == null) {} else {
                        cur.state = JSON.parse(data)
                    }
                    let proj = [];
                    for (let i = cur.state.length - 1; i > -1; i--) {
                        for (let j = 0; j < cur.project.length; j++) {
                            if (cur.state[i].projectname == cur.project[j].name) {
                                proj.push(cur.state[i]);
                            }
                        }
                    }
                    cur.solvedState = proj;
                })
                .catch(function(error) {
                    console.log(error);
                });


        },
         getfzrprojects:async function() {
            let cur = this
            let result = await cur.$axios({
                method: 'post', //请求的方式  
                url: "http://47.96.162.249:8081/getfzrprojects", //请求url  
                params: { username: "hi" }, //前端向后端传送的数据
            })
            let data = result.data
            if (data == null) {} else {
                cur.projects = JSON.parse(data)
            }
            let proj = [];
            for (let i = cur.projects.length - 1; i > -1; i--) {
                if (cur.projects[i].member.search(cur.username) != -1) {
                    proj.push(cur.projects[i]);
                } else {}
            }
            cur.project = proj;

        },
        upProTotal() {
            this.flag_pro_total < this.solvedState.length - 1 ?
                this.flag_pro_total++
                :
                alert("到尽头了" + this.solvedState.length);
        },
        downProTotal() {
            this.flag_pro_total > 0 ?
                this.flag_pro_total--
                :
                alert("到尽头了");
        },
        upPro() {
            this.flag_pro < this.solvedState.length - 1 ?
                this.flag_pro++
                :
                alert("到尽头了" + this.solvedState.length);
        },
        downPro() {
            this.flag_pro > 0 ?
                this.flag_pro--
                :
                alert("到尽头了");
        },
        statusupdate() {
            let cur = this;
            cur.$axios({
                    method: 'post',
                    url: "http://47.96.162.249:8081/statusupdate",
                    params: { name: cur.username, status: cur.name, projectName: cur.project[cur.flag_pro].name }
                }).then(function(response) {
                    alert("项目任务进度评价修改成功")
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
        }

    },

    components: {

    }
}
</script>
<style>
</style>