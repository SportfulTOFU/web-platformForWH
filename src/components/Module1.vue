<template>
    <div class="main">
        <!-- MAIN CONTENT -->
        <div class="main-content">
            <div class="container-fluid">
                <div class="panel">
                    <div class="panel-heading">
                        <h3 class="panel-title">项目负责人项目上传 <i class="fa fa-arrow-circle-up" aria-hidden="true" type="button" style="cursor:pointer" title="上一个项目" @click="upPro"> </i><i class="fa fa-arrow-circle-down" aria-hidden="true" type="button" style="cursor:pointer" title="下一个项目" @click="downPro"> </i></h3>
                    </div>
                    <div class="panel-body">
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">项目名称</label></span>
                            <input type="text" style="backgroundColor:white" class="form-control" placeholder="项目名称" disabled="disabled" v-bind:value=project[flag_pro].name>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">委托单位</label></span>
                            <input type="text" style="backgroundColor:white" class="form-control" placeholder="委托单位" disabled="disabled" v-bind:value=project[flag_pro].corp>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">成果内容</label></span>
                            <input type="text" style="backgroundColor:white" class="form-control" placeholder="成果内容" disabled="disabled" v-bind:value=project[flag_pro].product>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">任务名称</label></span>
                            <input type="text" class="form-control" placeholder="请输入任务名" v-model="task">
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon" ><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">成果参数</label></span>
                            <span class="input-group-btn">
                    <select class="form-control" v-model="renwuxinzhi">
                    <option value="0" hidden>任务性质</option>
                    <option value="指令任务">指令任务</option>
                    <option value="市场任务">市场任务</option>
                    <option value="公共地图">公共地图</option>
                    <option value="其他">其他</option>
                    </select>
                 </span>
                            <span class="input-group-btn">
                     <select class="form-control" v-model="tuzhong">
                     <option value="0" hidden>图种</option>
                     <option value="挂图">挂图</option>
                     <option value="桌面图">桌面图</option>
                     <option value="图册">图册</option>
                     <option value="图集">图集</option>
                     <option value="其他">其他</option>
                     </select>
                 </span>
                            <span class="input-group-btn">
                     <select class="form-control"  v-model="chicun">
                     <option value="0" hidden>尺寸</option>
                     <option value="双全开">双全开</option>
                     <option value="全开">全开</option>
                     <option value="对开">对开</option>
                     <option value="四开">四开</option>
                     <option value="16开">16开</option>
                     <option value="32开">32开</option>
                     <option value="其他">其他</option>
                     </select>
                  </span>
                            <span class="input-group-btn">
                     <select class="form-control" v-model="chenpingcaizhi">
                     <option value="0" hidden>成品材质</option>
                     <option value="挂图">挂图</option>
                     <option value="纸图">纸图</option>
                     <option value="布图">布图</option>
                     <option value="其他">其他</option>
                     </select>
                  </span>
                            <span class="input-group-btn">
                     <select class="form-control" v-model="yongtu">
                     <option value="0" hidden>用途</option>
                     <option value="出版">出版</option>
                     <option value="赠阅">赠阅</option>
                     <option value="内部用途">内部用途</option>
                     <option value="其他">其他</option>
                     </select>
                   </span>
                            <span class="input-group-btn">
                     <select class="form-control" v-model="zhitufanwei">
                     <option value="0" hidden>制图范围</option>
                     <option value="城市圈">城市圈</option>
                     <option value="全市域">全市域</option>
                     <option value="都市发展区">都市发展区</option>
                      <option value="中心城区">中心城区</option>
                     <option value="分区">分区</option>
                     <option value="其他">其他</option>
                     </select>
                   </span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请选择上传的参数模板</label></span>
                            <input type="file" class="form-control" placeholder="Username" id="inputGroupFile05" style="opacity: 0.5;" ref="inputer"> <span
                  class="input-group-addon"> <label
                  class="fa fa-folder-open" for="inputGroupFile05"
                  style="cursor: pointer"></label></span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">请选择上传的图幅模板</label></span>
                            <input type="file" class="form-control" placeholder="Username" id="inputGroupFile05" style="opacity: 0.5;" ref="inputer1"> <span
                  class="input-group-addon"> <label
                  class="fa fa-folder-open" for="inputGroupFile05"
                  style="cursor: pointer"></label></span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">基础数据上传</label></span>
                            <input type="file" class="form-control" placeholder="Username" id="inputGroupFile05" style="opacity: 0.5;" ref="inputer2"> <span
                  class="input-group-addon"> <label
                  class="fa fa-folder-open" for="inputGroupFile05"
                  style="cursor: pointer"></label></span>
                        </div>
                        <br>
                        <div class="input-group ">
                            <span class=" input-group-addon"><label
                  style="color: #aab2bd; font-size: 14px; text-align: right; font-weight: normal;">资料数据上传</label></span>
                            <input type="file" class="form-control" placeholder="Username" id="inputGroupFile05" style="opacity: 0.5;" ref="inputer3"> <span
                  class="input-group-addon"> <label
                  class="fa fa-folder-open" for="inputGroupFile05"
                  style="cursor: pointer"></label></span>
                        </div>
                        <br>
                        <textarea class="form-control" placeholder="作业要求" rows="4" v-model="details"></textarea>
                        <br>
                        <div class="panel panel-scrolling ">
                            <div class="panel-heading">
                                <h6 class="panel-title" style="font-size:16px">作业员选择</h6>
                                <div class="right">
                                    <button type="button" class="btn-toggle-collapse"><i class="lnr lnr-chevron-up"></i></button>
                                </div>
                            </div>
                            <div class="panel-body "style="height:250px;overflow:auto">
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
    </div>
</template>
<script>
import {
    delCookie,
    getCookie
} from '../assets/scripts/cookie.js'
export default {
    name: 'Module1',
    data() {
        return {
            name: '',
            details: '',
            task: '',
            renwuxinzhi: '0',
            tuzhong: '0',
            chicun: '0',
            chenpingcaizhi: '0',
            yongtu: '0',
            zhitufanwei: '0',
            xiangmufuzeren: '',
            jichushujustate: '',
            zilaioshujustate: '',
            member: '',
            members: [],
            mobancanshustate: '',
            tufuguifanstate: '',
            fzrjinchushujustate: '',
            fzrziliaoshujustate: '',
            users: '',
            username: localStorage.getItem('username'),
            projects: '',
            project: [{ name: "" }],
            flag_pro: 0

        }
    },

    created: function() {
        this.getusers()
        this.getprojects()
    },
    methods: {
        getusers() {
            let cur = this
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://localhost:8081/getusers", //请求url  
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
        getprojects() {
            let cur = this
            cur.$axios({
                    method: 'post', //请求的方式  
                    url: "http://localhost:8081/getprojects", //请求url  
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
                formdata.append('projectname', cur.project[cur.flag_pro].name);
                formdata.append('username', cur.members);
                formdata.append('state', 1);
                formdata.append('table', b);
                if (b == '模板列表') {
                    cur.mobancanshustate = 1;
                } else if (b == '图幅列表') {
                    cur.tufuguifanstate = 1;
                } else if (b == '负责人的基础数据列表') {
                    cur.fzrjinchushujustate = 1;
                } else if (b == '负责人的资料数据列表') {
                    cur.fzrziliaoshujustate = 1;
                } else {}
                cur.$axios({
                        method: 'post',
                        url: "http://localhost:8081/updatefile2",
                        data: formdata,
                    }).then(function(response) {})
                    .catch(function(error) {
                        console.log(error);
                    });
            } else {
                var formdata = new FormData()
                formdata.append('projectname', cur.project[cur.flag_pro].name);
                formdata.append('username', cur.members);
                formdata.append('state', 0);
                formdata.append('table', b);
                if (b == '模板列表') {
                    cur.mobancanshustate = 0;
                } else if (b == '图幅列表') {
                    cur.tufuguifanstate = 0;
                } else if (b == '负责人的基础数据列表') {
                    cur.fzrjinchushujustate = 0;
                } else if (b == '负责人的资料数据列表') {
                    cur.fzrziliaoshujustate = 0;
                } else {}
                cur.$axios({
                        method: 'post',
                        url: "http://localhost:8081/updatefile2",
                        data: formdata,
                    }).then(function(response) { console.log(`未上传${b}文件`); })
                    .catch(function(error) {
                        console.log(error);
                    });

            }

        },
        allupdate() {
            this.fileupdate(this.$refs.inputer, '模板列表');
            this.fileupdate(this.$refs.inputer1, '图幅列表');
            this.fileupdate(this.$refs.inputer2, '负责人的基础数据列表');
            this.fileupdate(this.$refs.inputer3, '负责人的资料数据列表');
            if (this.details == '') {
                alert("请输入项目的作业要求");
            } else if (this.members == '') {
                alert("请选择项目作业人员");
            } else {
                let cur = this;
                let name = cur.project[cur.flag_pro].name;
                let corp = cur.project[cur.flag_pro].corp;
                let product = cur.project[cur.flag_pro].product;
                cur.$axios({
                        method: 'post',
                        url: "http://localhost:8081/allupdate1",
                        params: {
                            name: name,
                            corp: corp,
                            product: product,
                            task: cur.task,
                            details: cur.details,
                            members: cur.members,
                            mobancanshustate: cur.mobancanshustate,
                            renwuxinzhi: cur.renwuxinzhi,
                            tuzhong: cur.tuzhong,
                            chicun: cur.chicun,
                            chenpingcaizhi: cur.chenpingcaizhi,
                            yongtu: cur.yongtu,
                            zhitufanwei: cur.zhitufanwei,
                            xiangmufuzeren: cur.xiangmufuzeren,
                            zilaioshujustate: cur.zilaioshujustate,
                            jichushujustate: cur.jichushujustate,
                            tufuguifanstate: cur.tufuguifanstate,
                            fzrjinchushujustate: cur.fzrjinchushujustate,
                            fzrziliaoshujustate: cur.fzrziliaoshujustate,
                        }
                    }).then(function(response) {
                        alert("项目上传成功")
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        },
    }
}
</script>
<style scoped>
</style>