<template>
    <div id="r">
        <div class="login_box">
            <div id="blank">
            </div>
            <div class="login_l_img"><img src='../datas/images/login-img.png' /></div>
                <div class="login">
                    <div class="login_logo"><img src='../datas/images/login_logo.png' /></div>
                        <div class="login_name">
                            <p>武测院系统与管理平台</p>
                        </div>
                        <form method="post">
                            <input name="username" type="text" placeholder="用户名" v-model="username" />
                            <input name="password" type="password" placeholder="密码" v-model="password" />
                            <p v-show="showTishi">{{tishi}}</p>
                            <input value="登录" type="button" @click="login" />
                        </form>
                    </div>
                    <div class="copyright">
                        <h4 id="copyright">武汉市勘测设计研究院 版权所有©2018<router-link to="/app/unload" >用户管理样本界面</router-link></h4>
                    </div>
                </div>
            </div>
</template>
<script>
import { setCookie, getCookie } from '../assets/scripts/cookie.js'
import $ from 'jquery';
import bus from '../assets/scripts/eventBus.js'
export default {
    data() {
        return {
            isLoging: false,
            username: '',
            password: '',
            showTishi: false,
            tishi: '',

        }
    },
    mounted: function() {
        var orderHight = document.documentElement.clientHeight
        document.getElementById('r').style.height = orderHight + 'px';
        if (localStorage.getItem('username') != 'undefined') {
            this.$router.push({ name: 'user', params: { username: localStorage.getItem('username') } })
        }
    },
    methods: {
        login() {
            if (this.username == '') {
                this.tishi = "请输入用户名"
                this.showTishi = true
            } else if (this.password == '') {
                this.tishi = "请输入密码"
                this.showTishi = true
            } else if (this.username != '' && this.password != '') {
                let cur = this
                /*接口请求*/
                cur.$axios({
                        method: 'post', //请求的方式  
                        url: "http://localhost:8081/login", //请求url  
                        params: { username: cur.username, password: cur.password }, //前端向后端传送的数据
                    }).then(function(response) {
                        let data = response.data
                        if (JSON.stringify(data.state) == '1') {
                            cur.tishi = "登录成功"
                            cur.showTishi = true
                            localStorage.setItem('username', cur.username, 1000 * 60)
                            if (data.rights == 'admin') {
                                setTimeout(function() {
                                    cur.$router.push({ name: 'admin', params: { username: cur.username } })
                                }.bind(this), 1000)
                            } else if (data.rights == 'leader') {
                                setTimeout(function() {
                                    cur.$router.push({ name: 'leader', params: { username: cur.username } })
                                }.bind(this), 1000)
                            } else {
                                setTimeout(function() {
                                    cur.$router.push({ name: 'user', params: { username: cur.username } })
                                }.bind(this), 1000)
                            }
                        } else if (JSON.stringify(data) === '-1') {
                            cur.tishi = "密码错误"
                            cur.showTishi = true

                        } else if (JSON.stringify(data) === '0') {
                            cur.tishi = "用户不存在"
                            cur.showTishi = true

                        } else {
                            cur.tishi = "用户密码不匹配"
                            cur.showTishi = true
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });;
            }
        },
    }
}
</script>
<style scoped>
#r {
    font: 13px/1.5 '微软雅黑';
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -box-sizing: border-box;
    padding: 0;
    margin: 0;
    list-style: none;
    box-sizing: border-box;


    overflow: hidden;
    background: #93defe;
    background-size: cover;
    border: none;
}

p {
    color: red;
    text-align: center;
}

#blank {
    width: '100%';

    marginBottom: "5%"
}

#copyright {
    text-align: center;
}

.login_box {
    width: 1100px;
    margin: 120px auto 0;
}

.login_box .login_l_img {
    float: left;
    width: 432px;
    height: 440px;
    margin-left: 50px;
}

.login_box .login_l_img img {
    width: 500px;
    height: 440px;
}

.login {
    height: 360px;
    width: 400px;
    padding: 50px;
    background-color: #ffffff;
    border-radius: 6px;
    box-sizing: border-box;
    float: right;
    margin-right: 50px;
    position: relative;
    margin-top: 50px;
}

.login_logo {
    width: 120px;
    height: 120px;
    border: 5px solid #93defe;
    border-radius: 100px;
    background: #fff;
    text-align: center;
    line-height: 110px;
    position: absolute;
    top: -60px;
    right: 140px;
}

.login_name {
    width: 100%;
    float: left;
    text-align: center;
    margin-top: 20px;
}

.login_name p {
    width: 100%;
    text-align: center;
    font-size: 18px;
    color: #444;
    padding: 10px 0 20px;
}

.login_logo img {
    width: 60px;
    height: 60px;
    display: inline-block;
    vertical-align: middle;
}

input[type=text],
input[type=file],
input[type=password],
input[type=email],
select {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #555555;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
    line-height: 50px;
    color: #888;
}

input[type=text]:focus,
input[type=file]:focus,
input[type=password]:focus,
input[type=email]:focus,
select:focus {
    border: 1px solid #27A9E3;
}

input[type=submit],
input[type=button] {
    display: inline-block;
    vertical-align: middle;
    padding: 12px 24px;
    margin: 0px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    color: #ffffff;
    background-color: #27A9E3;
    border-radius: 3px;
    border: none;
    -webkit-appearance: none;
    outline: none;
    width: 100%;
}

.copyright {
    font-size: 14px;
    color: #fff;
    display: block;
    width: 100%;
    float: left;
    margin-top: 60px;
}

#password_text {
    border: 1px solid #DCDEE0;
    vertical-align: middle;
    border-radius: 3px;
    height: 50px;
    padding: 0px 16px;
    font-size: 14px;
    color: #888;
    outline: none;
    width: 100%;
    margin-bottom: 15px;
    display: block;
    line-height: 50px;
}
</style>