<template>
  <div>
    <div class="native">
      11111
    </div>
    <div class="header">
      menus
    </div>
    <div class="main-content">
      <div class="item" v-for="(item, index) in 50" :key="index">{{ item }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
  .native {
    height: 60px;
    background: #000;
    position: sticky;
    top: 0px;
  }
  .header {
    height: 40px;
    background: red;
    position: sticky;
    top: 60px;
  }
  .main-content {
    margin-top: 30px;
    .item {
      height: 30px;
      color: #fff;
      background: #000;
      margin-bottom: 20px;
    }
  }
</style>