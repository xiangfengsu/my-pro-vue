<template>
    <div class="lightbox">
        <el-carousel trigger="click"  :autoplay="false" height="400px" :initial-index="currentIndex">
            <el-carousel-item v-for="item in carouselList" :key="item.uid">
                <img :src="item.url" alt="" width="100%" ref="img" height="100%">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
import Vue from 'vue';
import { Carousel, CarouselItem } from 'element-ui';

Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
export default {
  name: 'light-box',
  props: {
    carouselList: Array,
    currentIndex: {
      type: Number,
      default: 0,
    },
  },
};
</script>
<style lang="scss" >
.el-carousel__arrow{
    background-color:#fff;
    color: #909399;
    &:hover{
        background-color:#fff;
        color: #909399;
    }
}
</style>

