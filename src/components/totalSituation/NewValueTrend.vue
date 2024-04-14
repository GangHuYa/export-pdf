<template>
  <el-card class="netValue-card">
    <div slot="header" class="clearfix">
      <span>净值走势</span>
    </div>
    <div class="netValue-line" :id="'newValue-line' + chartCode">
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
        const dom = document.querySelector('#newValue-line' + this.chartCode)
        const mychart = echarts.init(dom)
        mychart && mychart.clear()
        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          legend: {
            data: ['单位净值', '累计净值']
          },
          yAxis: [
            {
              type: 'value',
              position: 'left',
              alignTicks: true,
            },
            {
              type: 'value',
              position: 'right',
              alignTicks: true,
            }
          ],
          series: [
            {
              name: '单位净值',
              data: [150, 230, 224, 218, 135, 147, 260],
              type: 'line'
            },
            {
              name: '累计净值',
              data: [15, 20, 22, 28, 35, 47, 26],
              yAxisIndex: 1,
              type: 'line'
            }
          ]
        }
        mychart.setOption(option)
      }
    }
  }
</script>
<style lang="less" scoped>
  .netValue-line {
    height: 413px;
  }
</style>