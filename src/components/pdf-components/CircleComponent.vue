<!-- -->
<template>
  <div class="circle-wrap">
    <div class="circle-wrap-left" :id="'circle-left-chart' + chartCode">
    </div>
    <div class="circle-wrap-right" :id="'circle-right-chart' + chartCode">
    </div>
  </div>
</template>

<script>
  import echarts from '@/assets/echarts.js'
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
    mounted () {
      this.drawChart('#circle-left-chart' + this.chartCode)
      this.drawChart('#circle-right-chart' + this.chartCode)
    },
    methods: {
      drawChart(idName) {
        const dom = document.querySelector(idName)
        const chart = echarts.init(dom)
        const rawData = [
          [100, 302, 301, 334, 390, 330, 320],
          [320, 132, 101, 134, 90, 230, 210],
          [220, 182, 191, 234, 290, 330, 310],
          [150, 212, 201, 154, 190, 330, 410],
          [820, 832, 901, 934, 1290, 1330, 1320]
        ];
        const totalData = [];
        for (let i = 0; i < rawData[0].length; ++i) {
          let sum = 0;
          for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
          }
          totalData.push(sum);
        }
        const grid = {
          left: 100,
          right: 100,
          top: 50,
          bottom: 50
        };
        const series = [
          'Direct',
          'Mail Ad',
          'Affiliate Ad',
          'Video Ad',
          'Search Engine'
        ].map((name, sid) => {
          return {
            name,
            type: 'bar',
            stack: 'total',
            barWidth: '60%',
            label: {
              show: true,
              formatter: (params) => Math.round(params.value * 1000) / 10 + '%'
            },
            data: rawData[sid].map((d, did) =>
              totalData[did] <= 0 ? 0 : d / totalData[did]
            )
          };
        });
        const option = {
          legend: {
            selectedMode: false
          },
          grid,
          yAxis: {
            type: 'value'
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          series
        };
        chart.setOption(option)
      }
    }
  }
</script>
<style lang='less' scoped>
  .circle-wrap {
    // width: 1302px;
    display: flex;
    justify-content: space-between;
    background: #fff;
    .circle-wrap-left {
      width: 651px;
      height: 535px;
    }
    .circle-wrap-right {
      width: 651px;
      height: 535px;
    }
  }
</style>