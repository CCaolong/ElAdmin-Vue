<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">
        EL-ADMIN 后台管理系统
      </h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
<!--          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />-->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
<!--          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />-->
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="loginForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleLogin">
<!--          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" />-->
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode">
        </div>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <el-button @click="setRank">改变rank</el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
<!--    <div v-if="$store.state.settings.showFooter" id="el-login-footer">-->
<!--      <span v-html="$store.state.settings.footerTxt" />-->
<!--      <span> ⋅ </span>-->
<!--      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>-->
<!--    </div>-->
  </div>
</template>

<script>
import Background from '@/assets/images/background.jpg'
import {encrypt} from "../utils/rsaEncrypt";

export default {
  name: "Login",
  created() {
    this.getCode()
  },
  data(){
    return{
      Background: Background,
      loginForm:{
        username:'admin',
        password:'123456',
        code:'',
        rememberMe:false,
        uuid:''
      },
      loginRules:{
        username: [{required: true, trigger: 'blur', message:'用户名不能为空'}],
        password: [{required: true, trigger: 'blur', message:'请输入密码'}],
        code: [{required: true, trigger: 'blur', message:'请输入验证码'}]
      },
      codeUrl:'',
      loading:false

    }
  },
  methods:{
    setRank(){
      this.$store.dispatch('setRank_A','p8')
      console.log(this.$store.getters.simpleHandle_A);
    },
    getCode(){
      //发送请求给后端，需要用到axios
      this.$axios.get('http://localhost:8010/auth/code').then(res=>{
        this.codeUrl = res.data.img
        this.loginForm.uuid = res.data.uuid
      })
    },
    handleLogin(){
      this.$refs.loginForm.validate(valid =>{
        if(valid){//如果通过校验发送登录请求
          this.loginForm.password = encrypt(this.loginForm.password)
          this.$axios.post('http://localhost:8010/auth/login',this.loginForm).then(res=>{
            this.$router.push('/dashboard')
          })
        }else alert('请合法登录')
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  img{
    cursor: pointer;
    vertical-align:middle
  }
}
</style>
