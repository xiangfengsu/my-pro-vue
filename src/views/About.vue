<template>
  <div class="about">
    <page-header>
      <el-card shadow="never">
        about
      </el-card>
    </page-header>
  </div>
</template>

<script>
import Vue from 'vue';
import { Card } from 'element-ui';
import PageHeader from '@/components/PageHeader/index';

Vue.component(Card.name, Card);

export default {
  name: 'about',
  components: {
    PageHeader,
  },
};
</script>
<style lang="scss">
.home {
  .t {
    &::after {
      content: "111";
    }
    color: red;
  }
}
</style>
