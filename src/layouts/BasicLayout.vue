<template>
  <div id="container">
    <template v-if="false" >
      <div v-loading="true" :style="{height:'100vh'}"></div>
    </template>
    <el-container v-else>
      <sider-menu :collapse="collapse" :menuList="menuList"></sider-menu>
      <el-container>
        <el-header>
          <global-header :collapse="collapse" @handle-menu-collapse="handleMenuCollapse">
          </global-header>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from 'vue';
import { Container, Header, Main, Loading } from 'element-ui';
import SiderMenu from '../components/SiderMenu/index.vue';
import GlobalHeader from '../components/GlobalHeader/index.vue';
import { menuData } from '../common/menu';
import { formatter } from '@/utils/utils';

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.use(Loading.directive);
export default {
  name: 'basic-layout',
  components: {
    SiderMenu,
    GlobalHeader,
  },
  data() {
    return {
      collapse: false,
      menuList: menuData,
    };
  },
  methods: {
    handleMenuCollapse(collapsed) {
      this.collapse = collapsed;
    },
  },
  watch: {
    $route(to, from) {
      // console.log('to',to);
      // console.log('from',from);
      // 对路由变化作出响应...
    },
  },

};
</script>
<style lang="scss" scoped>
.el-header {
  padding-left: 0;
  padding-right: 20px;
  height: 64px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>
