<template>
    <div class="page-header">
        <div class="breadcrumbBox">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{breadcrumbName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="page-header-container">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Breadcrumb, BreadcrumbItem } from 'element-ui';

Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);

export default {
  name: 'page-header',
  data() {
    return {

    };
  },
  computed: {
    breadcrumbName() {
      return this.$store.state.app.breadcrumbName;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-header {

  margin: -20px -20px 0px;
  .breadcrumbBox {
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    border-top: 1px solid #e8e8e8;
    padding: 16px 0 16px 24px;
    overflow: hidden;
  }
  .page-header-container{
      margin: 20px 20px 0;
  }
}
</style>

