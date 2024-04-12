<template>
  <div class="component-wrap">
    <div class="component-header">
      title9
    </div>
    <div class="component-body">
      main content9
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
  .component-wrap {
    background: #eee;
    border-radius: 4px;
    overflow: hidden;
    .component-header {
      height: 30px;
      line-height: 30px;
      background: #fff;
      padding-left: 10px;
    }
    .component-body {
      margin-top: 10px;
      background: #fff;
      padding-left: 10px;
      height: 500px;
    }
  }
</style>