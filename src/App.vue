<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    // overflow: hidden;
  }
  #app {
    background: #eaeaea;
    // height: 100%;
  }
</style>
