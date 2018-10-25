<style lang="scss">
@import url("./UserLayout.scss");
</style>
<template>
    <div class="userlayout">
        <div class="container">
          <div class="content">
            <div class="top">
              <div class="header">
                <span class="title">后台管理系统</span>
              </div>
            </div>
            <router-view></router-view>
           <!-- main -->
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'user-layout',
};
</script>

