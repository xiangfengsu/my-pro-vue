<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="user"></router-view>
  </div>
</template>

<style lang="scss">
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "Helvetica Neue";
  font-size: 14px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
  height: 100%;
}
html,body,#app {
  height: 100%;
  .clearfix{
    &::after{
      display: block;
      content: "";
      clear: both;
    }
  }
}
::-webkit-scrollbar-thumb {
  background-color: #e6e6e6;
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.iconfont {
  speak: none;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  vertical-align: baseline;
  display: inline-block;
  -webkit-font-smoothing: antialiased;
}
</style>
