<template>
  <el-card class="area-style-chart-card">
    <div slot="header" class="clearfix">
      <span>个股收益贡献</span>
    </div>
    <div class="area-style-chart-wrap">
      <div :id="'area-style-chart' + chartCode" class="area-style-chart-graph"></div>
    </div>
  </el-card>
</template>
<script>
  import * as echarts from 'echarts'
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
    mounted() {
      this.drawChart()
    },
    methods: {
      drawChart() {
        const lineDom = document.querySelector('#area-style-chart' + this.chartCode)
        const myChart = echarts.init(lineDom)
        myChart && myChart.clear()
        const option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: 'line',
              areaStyle: {}
            }
          ]
        };
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="less" scoped>
  .area-style-chart-card {
    width: 80%;
    margin: 0 auto;
    .clearfix {
      background: red;
    }
    .area-style-chart-graph {
      height: 430px;
    }
  }
</style>