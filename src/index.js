import Vue from 'vue'
import Vuex from 'vuex'
import vueapp from './vueapp.vue'
import VueRouter from 'vue-router'
import creatRouter from './router/router'
import creatStore from './store/store'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(VueRouter)
Vue.use(Vuex)
const router = creatRouter()
const store = creatStore()
new Vue({
  data() {
    return {
      username: '',
      load: 0
    }
  },
  router,
  store,
  mode: 'history',
  linkActiveClass: 'active-link',
  linkExactActiveClass: 'exact-active-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  fallback: true,
  render: (h) => h(vueapp),
  watch: {
    '$route': 'checkLogin'
  },
  created() {
    this.checkLogin()
  },
  methods: {
    checkLogin() {
      // 检查是否存在session、cookie操作方法在源码里有或者参考网上的即可
      if (!localStorage.getItem('username')) {
        // 如果没有登录状态则跳转到登录页
        this.$router.push('/login')
      } else if (this.load == 0) {
        this.load = 1
        let s = JSON.parse(JSON.parse(localStorage.getItem('allusers')));
        let right = '';
        for (let i = 0; i < s.length; i++) {
          if (localStorage.getItem('username') == s[i].username) {
            right = s[i].rights
          }
        }
        // alert(s)
        if (right == 'admin') {
          this.$router.push('/vueapp/module');
        } else if (right == 'leader') {
          console.log(localStorage.getItem('username') + 'dfsda')
          this.$router.push('/leadapp/unload1');
          localStorage.removeItem('load');
        } else {
          this.$router.push('/app/unload');
        }
        //否则跳转到登录后的页面
        // this.$router.push('/app/unload');
      }
    }
  }
}).$mount(root)