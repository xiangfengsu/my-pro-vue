<template>
  <div class="loginBox">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
      <el-alert v-if="showErrorAlert" :title="errorMessage" type="error" show-icon :closable="false" :style="{marginBottom:'28px'}" />
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="el-icon-search" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-row type="flex" align="middle" justify="space-between">
          <el-col :span="12">
            <el-input v-model="loginForm.code" prefix-icon="el-icon-search" placeholder="请输入验证码" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-col>
          <el-col :span="10">
            <img :src="codeUrl" class="codeImg" alt="" @click="refreshCodeHandel">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm('loginForm')" :style="{width:'100%'}">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import Vue from 'vue';
import { Row, Col, Form, FormItem, Input, Button, Alert } from 'element-ui';

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Alert.name, Alert);

const codeUrl = 'http://vms.51auto.com/sys/vcode';
export default {
  name: 'login',
  data() {
    return {
      codeUrl,
      loginForm: {
        username: '',
        password: '',
        code: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
    };
  },
  computed: {
    loading() {
      return this.$store.state.user.loginLoading;
    },
    status() {
      return this.$store.state.user.status;
    },
    errorMessage() {
      return this.$store.state.user.errorMessage;
    },
    showErrorAlert() {
      return this.status === 'error' && !this.loading;
    },
  },
  methods: {
    refreshCodeHandel() {
      this.codeUrl = `${codeUrl}?v=${Date.now()}`;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch({
            type: 'user/login',
            payload: this.loginForm,
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.loginBox {
  width: 348px;
  margin: 0 auto;
  background: #fff;
  padding: 24px 24px 8px;
  border-radius: 8px;
  @media screen and (max-width:768px) {
    width: 85%;
  }
  .el-form-item {
    margin-bottom: 28px;
  }
  .codeImg {
    cursor: pointer;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
    float: right;
  }
}
</style>

