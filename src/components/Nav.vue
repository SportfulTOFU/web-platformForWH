<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="brand">
            <a ><img src='../datas/images/logo.png'
          alt="Klorofil Logo" class="img-responsive logo"></a>
        </div>
        <div class="container-fluid">
            <div class="navbar-btn">
                <button type="button" class="btn-toggle-fullwidth">
                    <i class="lnr lnr-arrow-left-circle"></i>
                </button>
            </div>
            <form class="navbar-form navbar-left">
                <div class="input-group">
                    <input type="text" value="" class="form-control" placeholder="搜索..."> <span class="input-group-btn"><button
                type="button" class="btn btn-primary">Go</button></span>
                </div>
            </form>
            <div class="navbar-btn navbar-btn-right" @click="out">
                <router-link to="/" class="btn btn-success update-pro" title="Upgrade to Pro"><i class="fa fa-rocket" ></i>
                    <span >退出登录</span></router-link>
            </div>
            <div id="navbar-menu">
                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown"><a
              class="dropdown-toggle icon-menu" data-toggle="dropdown"> <i
                class="lnr lnr-alarm"></i> <span class="badge bg-danger">5</span>
            </a>
                        <ul class="dropdown-menu notifications">
                            <li><a  class="notification-item"><span
                    class="dot bg-warning"></span>消息一</a></li>
                            <li><a  class="notification-item"><span
                    class="dot bg-danger"></span>消息二</a></li>
                            <li><a  class="notification-item"><span
                    class="dot bg-success"></span>消息三</a></li>
                            <li><a  class="notification-item"><span
                    class="dot bg-warning"></span>消息四</a></li>
                            <li><a class="notification-item"><span
                    class="dot bg-success"></span>消息五</a></li>
                            <li><a  class="more">消息记录</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a  class="dropdown-toggle"
              data-toggle="dropdown"><i class="lnr lnr-question-circle"></i>
                <span>帮助</span> <i class="icon-submenu lnr lnr-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a >基本用法</a></li>
                            <li><a >安全</a></li>
                            <li><a >问题反馈</a></li>
                        </ul>
                    </li>
                    <li class="dropdown"><a  class="dropdown-toggle"
              data-toggle="dropdown"><img
                src='../datas/images/login_logo.png' class="img-circle"
                alt="Avatar"> <span>{{username}}</span> <i
                class="icon-submenu lnr lnr-chevron-down"></i></a>
                        <ul class="dropdown-menu">
                            <li><a type="button"  data-toggle="modal" data-target=".bs-example-modal-lg-login"><i class="lnr lnr-user"></i> <span>添加成员信息</span></a></li>
                            <li><a ><i class="lnr lnr-envelope"></i> <span>消息</span></a></li>
                            <li><a ><i class="lnr lnr-cog"></i> <span>设置</span></a></li>
                        </ul>
                    </li>
                    <!-- <li>
              <a class="update-pro" href="#downloads/klorofil-pro-bootstrap-admin-dashboard-template/?utm_source=klorofil&utm_medium=template&utm_campaign=KlorofilPro" title="Upgrade to Pro" target="_blank"><i class="fa fa-rocket"></i> <span>UPGRADE TO PRO</span></a>
            </li> -->
                </ul>
            </div>
        </div>
    </nav>
</template>
<script>
import {
    delCookie,
    getCookie
} from '../assets/scripts/cookie.js'



export default {
    name: 'Nav',
    data() {
        return {
            username: localStorage.getItem('username'),
        }
    },
    created() {
        this.in();
    },
    watch: {
        "$route": 'in'
    },
    mounted() {


    },
    methods: { in () {
            this.username = localStorage.getItem('username');
        },
        out() {
            localStorage.clear();
        }
    }

}
</script>
<style scoped>
</style>