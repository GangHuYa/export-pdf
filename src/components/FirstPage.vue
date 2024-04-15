<!-- -->
<template>
  <div class="first-page">
    <div>
      <div class="first-logo">
        <img src="../assets/first.png" alt="">
      </div>
      <div class="first-text-wrap-container">
        <div class="first-text-wrap">
          <div class="text-title">Xxxx 产品业绩分析</div>
          <div class="text-subtitle">2020-01-01</div>
          <div class="text-thirdtitle">——东证期货资产管理业务总部</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {

  },
  methods: {

  }
}
</script>
<style lang='less' scoped>
  .first-page {
    position: fixed;
    top: 0;
    left: -1000px;
    width: 1210px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    z-index: 10;
    .first-logo {
      width: 80%;
      height: auto;
      margin: 10% auto 0;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .first-text-wrap-container {
      display: flex;
      justify-content: flex-end;
      padding-right: 70px;
      margin: 120px auto 0;
      .first-text-wrap {
        // width: 80%;
        // text-align: right;
        color: #AF2318;
        font-size: 36px;
        font-weight: 600;
        .text-title {
          font-size: 44px;
        }
        .text-subtitle {
          text-indent: 40px;
          color: #AF2318;
          margin: 40px auto;
        }
        .text-thirdtitle {
          font-size: 34px;
          font-weight: 400;
        }
      }
    }
  }
</style>