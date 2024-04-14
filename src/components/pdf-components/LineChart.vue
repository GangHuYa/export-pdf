<template>
  <el-card class="line-chart-card">
    <div slot="header" class="clearfix">
      <span>个股收益贡献</span>
    </div>
    <div class="line-chart-wrap">
      <div :id="'line-chart' + chartCode" class="line-chart-graph"></div>
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
        const lineDom = document.querySelector('#line-chart' + this.chartCode)
        const myChart = echarts.init(lineDom)
        myChart && myChart.clear()
        const option = {
          title: {
            text: 'Temperature Change in the Coming Week'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {},
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: { readOnly: false },
              magicType: { type: ['line', 'bar'] },
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          series: [
            {
              name: 'Highest',
              type: 'line',
              data: [10, 11, 13, 11, 12, 12, 9],
              markPoint: {
                data: [
                  { type: 'max', name: 'Max' },
                  { type: 'min', name: 'Min' }
                ]
              },
              markLine: {
                data: [{ type: 'average', name: 'Avg' }]
              }
            },
            {
              name: 'Lowest',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
              },
              markLine: {
                data: [
                  { type: 'average', name: 'Avg' },
                  [
                    {
                      symbol: 'none',
                      x: '90%',
                      yAxis: 'max'
                    },
                    {
                      symbol: 'circle',
                      label: {
                        position: 'start',
                        formatter: 'Max'
                      },
                      type: 'max',
                      name: '最高点'
                    }
                  ]
                ]
              }
            }
          ]
        };
        myChart.setOption(option)
      }
    }
  }
</script>
<style lang="less" scoped>
  .line-chart-card {
    // width: 80%;
    // margin: 0 auto;
    .line-chart-graph {
      height: 280px;
    }
  }
</style>