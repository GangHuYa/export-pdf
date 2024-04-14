<template>
  <div class="chart-wrap">
    <!-- <div class="title">{{ title }}</div> -->
    <div :id="'wrap' + chartCode"></div>
    <el-button @click="changeData">点击</el-button>
  </div>
</template>
<script>
  import echarts from '@/assets/echarts.js'
  import data from './data'
  export default {
    props: {
      chartCode: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        title: '',
        unit: [],

      }
    },
    mounted () {
      this.parseData()
    },
    methods: {
      parseData () {
        const { graph1 } = data.data || {}
        const { unit, title, data: List } = graph1 || {}
        const { data: barChartList } = List[0] || []
        const { data: lineChartList } = List[1] || []
        this.title = title
        this.unit = unit
        const dateList = []
        for (let i = 0; i < 30; i++) {
          barChartList.push({
            date: i + '22222',
            value: i
          })
        }
        const barValueList = barChartList.map(item => {
          dateList.push(item.date)
          return item.value
        })
        const lineValueList = lineChartList.map(item => item.value || 0)
        // console.log('lineValueList', lineValueList)
        this.dateList = dateList || []
        this.drawChart(dateList, barValueList, lineValueList)
      },
      drawChart (dateList, barValueList, lineValueList) {
        const mychart = echarts.init(document.querySelector('#wrap' + this.chartCode))
        mychart.clear()
        this.options = {
          title: {
            text: this.title,
            left: 'center',
            top: 20,
            textStyle: {
              // fontFamily: ''
              // fontWeight: ''
              fontSize: 14,
              color: '#000'
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['资金流向', '持仓额'],
            left: 'center',
            // orient: 'vertical',
            bottom: 0
          },
          xAxis: {
            type: 'category',
            splitLine: { show: false },
            axisLabel: {
              rotate: 38
            },
            data: dateList
          },
          yAxis: [
            {
              type: 'value',
              position: 'left',
              axisLine: {
                show: true
              }
            },
            {
              type: 'value',
              position: 'right',
              show: true,
              axisLine: {
                show: true
              },
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              type: 'bar',
              name: '资金流向',
              stack: 'Total',
              barWidth: '30%',
              itemStyle: {
                // borderColor: 'transparent',
                color: 'yellow'
              },
              // emphasis: {
              //   itemStyle: {
              //     borderColor: 'transparent',
              //     color: 'transparent'
              //   }
              // },
              data: barValueList
            },
            {
              type: 'line',
              name: '持仓额',
              // stack: 'Total',
              symbol: 'none', // 默认显示折点
              showSymbol: false,
              yAxisIndex: 1,
              // icon: 'line',
              // itemWidth: 2,
              // itemHeight: 2,
              lineWidth: 10,
              label: { // 会显示折线图上的点的数据
                normal: {
                  show: true
                }
              },
              // smooth: true, // 折线会变得平滑
              itemStyle: {
                color: 'red',
                normal: {
                  lineStyle: { // 折线的宽度
                    width: 3
                  }
                }
              },
              // label: {
              //   show: true,
              //   position: 'inside'
              // },
              data: lineValueList
            }
          ]
        }
        mychart.setOption(this.options)
        this.mychart = mychart
        window.addEventListener('resize', function () {
          mychart.resize() // 会跟随外层container自适应
        })
      },
      changeData() {
        const data = []
        for (let i = 0; i < 9; i++) {
          const tempNum = (i % 2 === 0 ? '-' : '') + Math.floor(Math.random() * 100)
          data.push(tempNum)
        }
        this.drawChart(this.dateList, [], data)
        // this.options.series[0].data = data
        // this.mychart.clear()
        // this.mychart.setOption(this.options)
      }
    }
  }
</script>
<style lang="less" scoped>
  .chart-wrap {
    width: 100%;
    background: #fff;
    .title {
      text-align: center;
    }
    #wrap, #wrapchartCode {
      height: 550px;
    }

  }
</style>../../views/data