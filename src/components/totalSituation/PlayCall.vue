<template>
  <el-card class="recall-card">
    <div slot="header" class="clearfix">
      <span>动态回撤</span>
    </div>
    <div class="graph-wrap">
      <div class="graph-wrap-left" :id="'graph-wrap-chart' + chartCode">
      </div>
      <div class="grap-wrap-right">
        <div class="grap-wrap-wrap">
          <div class="grap-wrap-wrap-item">
            <div class="wrap-item-column-name">产品名称</div>
            <div class="wrap-item-column-value">产品名称</div>
          </div>
          <div class="grap-wrap-wrap-item">
            <div class="wrap-item-column-name">产品名称</div>
            <div class="wrap-item-column-value">产品名称</div>
          </div>
          <div class="grap-wrap-wrap-item">
            <div class="wrap-item-column-name">产品名称</div>
            <div class="wrap-item-column-value">产品名称</div>
          </div>
          <div class="grap-wrap-wrap-item">
            <div class="wrap-item-column-name">产品名称</div>
            <div class="wrap-item-column-value">产品名称</div>
          </div>
        </div>
      </div>
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
        const dom = document.querySelector('#graph-wrap-chart' + this.chartCode)
        const mychart = echarts.init(dom)
        mychart && mychart.clear()
        const option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          legend: {
            data: ['东证期货', '沪深']
          },
          yAxis: [
            {
              type: 'value',
              alignTicks: true,
            }
          ],
          series: [
            {
              name: '东证期货',
              data: [-150, -230, -224, -218, -135, -147, -260],
              type: 'line'
            },
            {
              name: '沪深',
              data: [-15, -20, -22, -28, -35, -47, -26],
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
  .graph-wrap {
    height: 300px;
    display: flex;
    .graph-wrap-left {
      width: 60%;
      height: 290px;
    }
    .grap-wrap-right {
      flex: 1;
      .grap-wrap-wrap {
        border: 1px solid #eaeaea;
        .grap-wrap-wrap-item {
          display: flex;
          border-bottom: 1px solid #eaeaea;
          padding: 4px 0;
          .wrap-item-column-name {
            border-right: 1px solid #eaeaea;
            width: 50%;
            padding-left: 10px;
          }
          .wrap-item-column-value {
            border-right: 1px solid #eaeaea;
            width: 50%;
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
    }
  }
</style>