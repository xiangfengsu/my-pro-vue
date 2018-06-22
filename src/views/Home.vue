<template>
  <div class="home">
    <div class="t">
      dddd
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  components: {}
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
