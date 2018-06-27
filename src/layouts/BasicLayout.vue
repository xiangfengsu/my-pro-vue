<template>
  <div id="container">
    <template v-if="isFetched">
      <div v-loading="true" :style="{height:'100vh'}"></div>
    </template>
    <el-container v-else>
      <sider-menu :collapse="collapse" :menuList="menuDataList"></sider-menu>
      <el-container>
        <el-header>
          <global-header :collapse="collapse" @handle-menu-collapse="handleMenuCollapse">
          </global-header>
        </el-header>
        <el-main :style="{backgroundColor:'#f0f2f5'}">
          <router-view></router-view>
        </el-main>
        <global-footer />
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Vue from "vue";
import { Container, Header, Main, Loading } from "element-ui";
import SiderMenu from "../components/SiderMenu/index.vue";
import GlobalHeader from "../components/GlobalHeader/index.vue";
import GlobalFooter from "../components/GlobalFooter/index.vue";
import menuData from "../common/menu";
import {
  formatter,
  menuDataPathToArray,
  authorityMenu,
  getRedirectData
} from "@/utils/utils";

Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Main.name, Main);
Vue.use(Loading.directive);
export default {
  name: "basic-layout",
  components: {
    SiderMenu,
    GlobalHeader,
    GlobalFooter
  },
  data() {
    return {
      collapse: false,
      menuDataList:formatter(menuData),
      menuList: menuData
    };
  },
  mounted(){
    this.$store.dispatch({
      type:'getUserInfo'
    });
  },
  computed:{
    currentUser(){
      return this.$store.state.user.currentUser;
    },
    isFetched(){
      return !this.currentUser.menuData || (this.currentUser.menuData && this.currentUser.menuData.length===0)
    }
  },
  methods: {
    handleMenuCollapse(collapsed) {
      this.collapse = collapsed;
    },
    nextOrPushHandel(context, next, pathObj) {
      if (next !== undefined) {
        next(pathObj);
      } else {
        context.$router.push(pathObj);
      }
    },
    gerBreadcrumbName(menuData, fullPath) {
      const pathObj = menuData.find(item => {
        return item.path === fullPath;
      });
      return pathObj ? pathObj.name : "";
    },
    authorityAndRedirect(to, context, next) {
      const { fullPath } = to;
      const redirectData = getRedirectData(context.menuList);
      const menuData = menuDataPathToArray(formatter(context.menuList));
      if (fullPath === "/") {
        context.nextOrPushHandel(context, next, { path: menuData[0].path });
      } else {
        if (!authorityMenu(fullPath, menuData)) {
          context.nextOrPushHandel(context, next, { path: "/exception/403" });
        } else {
          const toPathItem = redirectData.find(item => {
            return item.from === fullPath || `${item.from}/` === fullPath;
          });
          if (toPathItem !== undefined) {
            // console.log('toPathItem',toPathItem);

            context.nextOrPushHandel(context, next, { path: toPathItem.to });
          } else {
            next && next();
          }
        }
      }
      context.$store.commit({
        type: "updateBreadcrumbName",
        name: context.gerBreadcrumbName(menuData,to.fullPath)
      });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.authorityAndRedirect(to, vm, next);
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.authorityAndRedirect(to, this, next);
  },
  watch: {
    $route(to, from) {
      this.authorityAndRedirect(to, this);
    }
  }
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
