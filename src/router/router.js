import VueRouter from 'vue-router'
import App from '../app.vue'
import Vueapp from '../apps.vue'
import Leaderapp from '../Leaderapp.vue'
import Login from '../components/Login.vue'
import Module from '../components/Module.vue'
import Unload from '../components/Unload.vue'
import Check from '../components/Check.vue'
import Overview from '../components/Overview.vue'
import Module1 from '../components/Module1.vue'
import Unload1 from '../components/Unload1.vue'

export default () => {
  return new VueRouter({
    routes: [{
      path: '/',
      redirect: '/login'
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/app',
      name: 'app',
      // props: true,
      component: App,
      meta: {
        title: '主窗体'
      },
      children: [{
        path: 'unload',
        name: 'user',
        component: Unload
      }, {
        path: 'check',
        component: Check
      }, {
        path: 'overview',
        component: Overview
      }]
    }, {
      path: '/vueapp',
      name: 'vueapp',
      // props: true,
      component: Vueapp,
      meta: {
        title: '主窗体'
      },

      children: [{
        path: 'module',
        name: 'admin',
        component: Module
      }, {
        path: 'overview',
        component: Overview
      }]
    }, {
      path: '/leadapp',
      name: 'leaderapp',
      // props: true,
      component: Leaderapp,
      meta: {
        title: '主窗体'
      },

      children: [{
        path: 'unload1',
        name: 'leader',

        component: Unload1
      }, {
        path: 'task',
        component: Module1
      }, {
        path: 'overview',
        component: Overview
      }]
    }]
  })
}