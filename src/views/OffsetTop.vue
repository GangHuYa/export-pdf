<template>
  <div class="offset-top-wrap">
    <div class="first-top">
      22222
    </div>
    <div class="offset-item" ref="offsetItemRef" @click="calculateOffsetTop">
      <div class="item" v-for="(item, index) in 20" :key="index">{{ item }}</div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    methods: {
      calculateOffsetTop() {
        const currentDom = document.querySelector('.offset-item') // this.$refs.offsetItemRef
        let actualTop = currentDom.offsetTop
        let parentDom = currentDom.offsetParent
        console.log('parentDom', parentDom, currentDom.offsetHeight)
        while (parentDom && !parentDom.classList.contains('offset-top-wrap')) {
          actualTop += parentDom.offsetTop
          parentDom = parentDom.offsetParent
          console.log('parentDom', parentDom)
        }
        console.log('actualTop', actualTop)
      }
    }
  }
</script>
<style lang="less" scoped>
  .offset-top-wrap {
    position: relative;
    background: red;
    // height: 600px;
    // overflow: hidden;
    .first-top {
      height: 200px;
      margin-bottom: 20px;
      background: blue;
    }
    .offset-item {
      // padding: 30px 0;
      // margin-top: 30px;
      // height: 300px;
      // background: #fff;
      .item {
        background: #000;
        color: #fff;
      }
    }
  }
</style>