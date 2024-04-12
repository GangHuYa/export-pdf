<template>
  <div>
    <div id="line-wrap"></div>
  </div>
</template>
<script>
  import echarts from '@/assets/echarts.js'
  export default {
    data () {
      return {}
    },
    mounted() {
      this.drawChart()
    },
    methods: {
      getShowPoints (aAxisList) {
        const len = aAxisList.length - 2
        let gap = 0
        const pointList = []
        gap = Math.floor(len / 4)
        let i = gap
        while (i < aAxisList.length - 1) {
          pointList.push(i)
          i += gap
          if (pointList.length >= 4) {
            break
          }
        }
        return [0, ...pointList, aAxisList.length - 1]
      },
      getMandomValue () {
        const sum = Math.floor(Math.random() * 100) + 7
        const xaxisList = []
        const seriesList = []
        for (let i = 0; i < sum; i++) {
          xaxisList.push(`${i}-`)
          seriesList.push(i)
        }
        console.log('xaxisList', xaxisList.length)
        return {
          xaxisList,
          seriesList
        }
      },
      drawChart () {
        const mychart = echarts.init(document.querySelector('#line-wrap'))
        mychart.clear()
        const { xaxisList, seriesList } = this.getMandomValue()
        const pointList = this.getShowPoints(xaxisList)
        console.log('pointList', pointList)
        this.options = {
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
          },
          grid: {
            // left: '40',
            right: '10',
            // bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xaxisList,
            axisLabel: {
              // interval: 0
              // interval: (index) => {
              //   const len = xaxisList.length
              //   if (len <= 6) {
              //     return true
              //   }
              //   if (pointList.includes(index)) {
              //     console.log('index', index)
              //   }
              //   return pointList.includes(index)
              // }
              // formatter(val, index) {
              //   const len = aAxisList.length
              //   if (len <= 6) {
              //     return val
              //   }
              //   console.log('----index', index)
              //   if (pointList.includes(index)) {
              //     console.log('index', index)
              //   }
              //   return pointList.includes(index) ? val : ''
              // }
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              data: seriesList
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
        mychart.setOption(this.options)
        this.mychart = mychart
        window.addEventListener('resize', function () {
          mychart.resize() // 会跟随外层container自适应
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  #line-wrap {
    width: 50%;
    height: 500px;
    background: #fff;
  }
</style>