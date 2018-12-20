<template>
    <div id="app">
        <transition name="fade">
            <router-view>
            </router-view>
        </transition>
    </div>
</template>
<script>
import { setCookie, getCookie } from './assets/scripts/cookie.js'
import 'font-awesome/scss/font-awesome.scss'
import './assets/vendor/jquery/jquery.min.js'
import './assets/vendor/bootstrap/css/bootstrap.min.css'
import './assets/vendor/linearicons/style.css'
import './assets/vendor/chartist/css/chartist-custom.css'
import './assets/css/main.css'
import './assets/css/demo.css'
import './assets/vendor/bootstrap/js/bootstrap.min.js'
import './assets/vendor/jquery-slimscroll/jquery.slimscroll.min.js'
import './assets/scripts/klorofil-common.js'


//console.log(getCookie('username'))
export default {
    name: 'vueapp',
    data() {
        return {
            username: localStorage.getItem('username')
        }
    },
    watch: {
        "$route": 'checkLogin'
    },
    mounted() {
        /*页面挂载获取保存的cookie值，渲染到页面上*/
        let uname = localStorage.getItem('username')
        this.name = uname
        /*如果cookie不存在，则跳转到登录页*/
        if (uname == "") {
            this.$router.push('/')
        }
    },
    methods: {

        checkLogin() {
            //console.log(this.$route.params.username)
        }
    },
    components: {

    }
}
</script>
<style>
</style>