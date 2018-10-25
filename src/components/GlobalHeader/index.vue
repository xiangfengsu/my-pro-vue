<style lang="scss">
@import url("./index.scss");
</style>
<template>
  <div class="global-header">
    <div>
      <i :class="['iconfont', collapse?'icon-menu-unfold':'icon-menu-fold', 'trigger']" @click="toggle"></i>
      <div class="right">
        <el-dropdown @command="handleCommand">
          <span class="avatar">
            <img src="@/assets/avatar.png" alt="">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting">
              <i class="iconfont icon-user"></i> 个人中心</el-dropdown-item>
            <el-dropdown-item divided command="loginout">
              <i class="iconfont icon-loginout"></i> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
} from 'element-ui';

Vue.component(Header.name, Header);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);

export default {
  name: 'global-header',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    toggle() {
      this.$emit('handle-menu-collapse', !this.collapse);
    },
    handleCommand(command) {
      if (command === 'loginout') {
        this.$store.dispatch({
          type: 'user/loginOut',
        });
      }
    },
  },
};
</script>
