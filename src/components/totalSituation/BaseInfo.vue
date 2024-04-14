<template>
  <el-card class="base-info-card">
    <div slot="header" class="clearfix">
      <span>基本信息</span>
    </div>
    <div class="baseinfo-wrap">
      <div class="baseinfo-wrap-item">
        <div class="wrap-item-column-name">产品名称</div>
        <div class="wrap-item-column-value">产品名称</div>
        <div class="wrap-item-column-name">基金策略</div>
        <div class="wrap-item-column-value">产品名称</div>
      </div>
      <div class="baseinfo-wrap-item">
        <div class="wrap-item-column-name">资产管理人</div>
        <div class="wrap-item-column-value">产品名称</div>
        <div class="wrap-item-column-name">业绩基准</div>
        <div class="wrap-item-column-value">产品名称</div>
      </div>
      <div class="baseinfo-wrap-item">
        <div class="wrap-item-column-name">托管人</div>
        <div class="wrap-item-column-value">产品名称</div>
        <div class="wrap-item-column-name">报告区间</div>
        <div class="wrap-item-column-value">产品名称</div>
      </div>
      <div class="baseinfo-wrap-item">
        <div class="wrap-item-column-name">成立日期</div>
        <div class="wrap-item-column-value">产品名称</div>
        <div class="wrap-item-column-name">初期单位净值/累计净值</div>
        <div class="wrap-item-column-value">产品名称</div>
      </div>
      <div class="baseinfo-wrap-item">
        <div class="wrap-item-column-name">正式运作日期</div>
        <div class="wrap-item-column-value">产品名称</div>
        <div class="wrap-item-column-name">初期单位净值/累计净值</div>
        <div class="wrap-item-column-value">产品名称</div>
      </div>
    </div>
  </el-card>
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
  .baseinfo-wrap {
    border: 1px solid #eaeaea;
    font-size: 12px;
    .baseinfo-wrap-item {
      display: flex;
      border-bottom: 1px solid #eaeaea;
      padding: 4px 0;
      .wrap-item-column-name {
        border-right: 1px solid #eaeaea;
        width: 25%;
        padding-left: 10px;
      }
      .wrap-item-column-value {
        border-right: 1px solid #eaeaea;
        width: 25%;
        padding-left: 10px;
        &:last-child {
          border-right: none;
        }
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
</style>