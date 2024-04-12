<template>
  <div class="common-wrap" ref="commonRef">
    <div class="common-loading" v-loading="loading" v-if="isShow" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
    </div>
    <slot v-else></slot>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: true,
        isShow: true
      }
    },
    props: {
    },
    mounted() {
      this.showComponentInCurrentViewport()
    },
    methods: {
      // 在视口内组件加载
      showComponentInCurrentViewport () {
        const viewportDom = document.querySelector('.right')
        const options = {
          root: viewportDom,
          rootMargin: '0px 0px 40px 0px',
          threshold: 0.5
        }
        const intersectionObserver = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setTimeout(() => {
              this.isShow = false
              intersectionObserver.disconnect()
            }, 2000)
          }
        }, options)
        intersectionObserver.observe(this.$refs.commonRef)
      }
    }
  }
</script>
<style lang="less" scoped>
  .common-loading {
    height: 500px;
  }
</style>