<template lang="pug">
v-app
  v-app-bar(
      fixed
      color="primary"
      dark
      style="z-index: 10000;"
    )
    v-toolbar-title.pl-2(to="/" nuxt) Feeecker

  v-main
    v-container.main-container
      nuxt

</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 18%);
  min-width: 300px;
  max-width: 355px;
}
.main-container {
  margin-top: 64px;
  margin-bottom: 200px;
}
</style>