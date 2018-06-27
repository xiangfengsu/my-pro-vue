<template>
    <div>
        <template v-for="item in menuData" >
            <el-menu-item v-if="!item.children||item.children&&item.children.length===0" :index="`/${item.path}`" :key="'menuitem' + item.name">
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
    </div>
</template>
<script>
import Vue from 'vue';
import { Submenu, MenuItem } from 'element-ui';

Vue.component(Submenu.name, Submenu);
Vue.component(MenuItem.name, MenuItem);
export default {
  name: 'custom-tree-menu',
  props: {
    menuData: Array,
  },
};
</script>
