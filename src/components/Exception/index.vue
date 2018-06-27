<style lang="scss">
@import url("./index.scss");
</style>
<template>
    <div class="exception">
        <div class="imgBlock">
            <div class="imgEle" :style="{backgroundImage:backgroundImage}" />
        </div>
        <div class="content">
            <h1>{{exceptionTitle}}</h1>
            <div class="desc">{{exceptionDesc}}</div>
            <div class="actions" >
               <router-link to="/" :style="{display:'inline-blcok'}">
                 <el-button type="primary" >返回首页</el-button>
               </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button } from 'element-ui';
import config from './typeConfig';

Vue.component(Button.name, Button);

export default {
  name: 'exception',
  props: {
    type: Number,
    title: String,
    desc: String,
  },
  data() {
    return {
      pageType: this.type in config ? this.type : 404,
    };
  },
  computed: {
    backgroundImage() {
      return `url(${config[this.pageType].img})`;
    },
    exceptionTitle() {
      return this.title ? this.title : config[this.pageType].title;
    },
    exceptionDesc() {
      return this.desc ? this.desc : config[this.pageType].desc;
    },
  },
};
</script>

