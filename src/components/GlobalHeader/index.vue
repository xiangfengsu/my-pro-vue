<template>
    <div>
        <i :class="['iconfont', collapse?'icon-menu-unfold':'icon-menu-fold', 'trigger']" @click="toggle"></i>
        <div class="right">
            <el-dropdown>
                <span class="avatar">
                    <img src="@/assets/avatar.png" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><i class="iconfont icon-user"></i> 个人中心</el-dropdown-item>
                    <el-dropdown-item divided><i class="iconfont icon-loginout"></i> 退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Header, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';

Vue.component(Header.name, Header);
Vue.component(Dropdown.name, Dropdown);
Vue.component(DropdownMenu.name, DropdownMenu);
Vue.component(DropdownItem.name, DropdownItem);

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
  },
};
</script>
<style lang="scss" scoped>
i.trigger {
  display: inline-block;
  font-style: normal;
  vertical-align: baseline;
  text-align: center;
  text-transform: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-size: 20px;
  line-height: 60px;
  cursor: pointer;
  padding: 0 20px;
  transition: all 0.3s, padding 0s;
  &:hover {
    background: #e6f7ff;
  }
}
.right {
  float: right;
  .avatar {
    width: 32px;
    height: 32px;
    display: inline-block;
    padding: 14px 16px;
    cursor: pointer;
    &:hover {
      background: #e6f7ff;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
