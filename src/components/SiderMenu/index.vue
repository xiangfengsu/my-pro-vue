<style lang="scss">
@import url("./index.scss");
</style>

<template>
  <el-aside :width="asideWidth">
    <div class="logo">
      <router-link to="/" :style="{display:'block'}">
        <img src="@/assets/logo.svg" alt="">
        <h1>后台管理系统</h1>
      </router-link>

    </div>
    <el-menu :collapse="collapse" :default-active="$route.path" :router="false" @open="handleOpen" @close="handleClose" background-color="#001529" text-color="#fff" active-text-color="#ffd04b" @select="selectMenu">
      <template v-for="item in menuList">
        <el-menu-item v-if="!item.children||item.children&&item.children.length===0" :index="`/${item.path}`" :key="'menuitem' + item.name"  >
          <i :class="[item.icon]"></i>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
        <el-submenu v-if="item.children&&item.children.length>0" :index="item.path" :key="item.name">
          <template slot="title">
            <i :class="[item.icon]"></i>
            <span>{{item.name}}</span>
          </template>
          <custom-tree-menu :menuData="item.children"></custom-tree-menu>
        </el-submenu>
      </template>
    </el-menu>
  </el-aside>
</template>
<script>
import Vue from 'vue';
import {
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Tooltip,
} from 'element-ui';
import CustomTreeMenu from './treeMenu';

Vue.component(Aside.name, Aside);
Vue.component(Menu.name, Menu);
Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Tooltip.name, Tooltip);

export default {
  name: 'sider-menu',
  components: {
    CustomTreeMenu,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
    menuList: Array,
  },
  computed: {
    asideWidth() {
      return this.collapse ? '64px' : '256px';
    },
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    selectMenu(index, indexPath) {
      this.$router.push({ path: `${index}` });
    },
  },
};
</script>
