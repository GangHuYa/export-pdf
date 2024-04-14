<template>
  <el-card class="round-chart-card">
    <div slot="header" class="clearfix">
      <span>个股收益贡献</span>
    </div>
    <div class="round-chart-wrap">
      <div :id="'round-chart' + chartCode" class="round-chart-graph"></div>
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
      this.drawLineChart()
    },
    methods: {
      drawLineChart() {
        const lineDom = document.querySelector('#round-chart' + this.chartCode)
        const myChart = echarts.init(lineDom)
        myChart && myChart.clear()
        const option = {
          legend: {
            top: 'bottom'
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: 'Nightingale Chart',
              type: 'pie',
              radius: [50, 250],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 8
              },
              data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
              ]
            }
          ]
        };
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="less" scoped>
  .round-chart-card {
    // width: 80%;
    // margin: 0 auto;
    .round-chart-graph {
      height: 500px;
    }
  }
</style>