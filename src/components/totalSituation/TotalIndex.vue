<template>
  <div class="total-wrap">
    <BaseInfo class="area-common"></BaseInfo>
    <NewValueTrend class="area-common" :chartCode="chartCode"></NewValueTrend>
    <PlayCall class="area-common" :chartCode="chartCode"></PlayCall>
    <TableGrade class="area-common" title="业绩指标"></TableGrade>
    <TableGrade class="area-common" title="各区间收益"></TableGrade>
    <PlayCall class="area-common" :chartCode="chartCode + '1'"></PlayCall>
    <BigVariety class="area-common" :chartCode="chartCode"></BigVariety>
  </div>
</template>
<script>
  import BaseInfo from './BaseInfo'
  import NewValueTrend from './NewValueTrend'
  import PlayCall from './PlayCall'
  import TableGrade from './TabelGrade'
  import BigVariety from './BigVariety'
  export default {
    props: {
      chartCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {}
    },
    components: {
      BaseInfo,
      NewValueTrend,
      PlayCall,
      TableGrade,
      BigVariety
    },
    methods: {}
  }
</script>
<style lang="less" scoped>
  .area-common {
    width: 80%;
    margin: 0 auto 20px auto;
  }
</style>