<template>
  <div class="component-wrap">
    <div class="component-header">
      title
    </div>
    <div class="component-body">
      main content
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
    margin-bottom: 30px;
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