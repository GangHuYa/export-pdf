<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>Barra归因</span>
    </div>
    <div class="radar-wrap" :id="'radar-wrap' + chartCode">
      <!-- <div class="radar-wrap-left" :id="'radar-left' + chartCode"></div> -->
      <!-- <div class="radar-wrap-right" :id="'radar-right' + chartCode"></div> -->
    </div>
    <div class="radar-table" >
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="rowClass"
      >
        <el-table-column
          label=""
          prop="first"
          align="center"
        >
        </el-table-column>
        <el-table-column label="2022年6月" align="center">
          <el-table-column prop="2022年6月.param2" align="center">
          </el-table-column>
          <el-table-column prop="2022年6月.param3" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="2022年12月" align="center">
          <el-table-column prop="2022年12月.param2" align="center">
          </el-table-column>
          <el-table-column prop="2022年12月.param3" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="2023年6月" align="center">
          <el-table-column prop="2023年6月.param2" align="center">
          </el-table-column>
          <el-table-column prop="2023年6月.param3" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="2023年12月" align="center">
          <el-table-column prop="2023年12月.param2" align="center">
          </el-table-column>
          <el-table-column prop="2023年12月.param3" align="center">
          </el-table-column>
        </el-table-column>
      </el-table>
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
      return {
        tableData: [
          {
            first: '风格因子',
            '2022年6月': {
              first: 'size',
              param2: '1',
              param3: '2'
            },
            '2022年12月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            },
            '2023年6月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            },
            '2023年12月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            }
          },
          {
            first: 'size',
            '2022年6月': {
              first: 'size',
              param2: '1',
              param3: '2'
            },
            '2022年12月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            },
            '2023年6月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            },
            '2023年12月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            }
          },
          {
            first: 'size',
            '2022年6月': {
              first: 'size',
              param2: '1',
              param3: '2'
            },
            '2022年12月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            },
            '2023年6月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            },
            '2023年12月': {
              first: 'size',
              param2: '收益贡献',
              param3: '风险暴露'
            }
          }
        ]
      }
    },
    mounted() {
      this.drawRadar()
    },
    methods: {
      drawRadar() {
        const radarDom = document.querySelector('#radar-wrap' + this.chartCode)
        const myEchart = echarts.init(radarDom)
        myEchart && myEchart.clear()
        const option = {
          color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
          title: {
            text: 'Customized Radar Chart'
          },
          legend: {},
          radar: [
            {
              indicator: [
                { text: 'Indicator1' },
                { text: 'Indicator2' },
                { text: 'Indicator3' },
                { text: 'Indicator4' },
                { text: 'Indicator5' }
              ],
              center: ['25%', '50%'],
              radius: 120,
              startAngle: 90,
              splitNumber: 4,
              shape: 'circle',
              axisName: {
                formatter: '【{value}】',
                color: '#428BD4'
              },
              splitArea: {
                areaStyle: {
                  color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                  shadowColor: 'rgba(0, 0, 0, 0.2)',
                  shadowBlur: 10
                }
              },
              axisLine: {
                lineStyle: {
                  color: 'rgba(211, 253, 250, 0.8)'
                }
              },
              splitLine: {
                lineStyle: {
                  color: 'rgba(211, 253, 250, 0.8)'
                }
              }
            },
            {
              indicator: [
                { text: 'Indicator1', max: 150 },
                { text: 'Indicator2', max: 150 },
                { text: 'Indicator3', max: 150 },
                { text: 'Indicator4', max: 120 },
                { text: 'Indicator5', max: 108 },
                { text: 'Indicator6', max: 72 }
              ],
              center: ['75%', '50%'],
              radius: 120,
              axisName: {
                color: '#fff',
                backgroundColor: '#666',
                borderRadius: 3,
                padding: [3, 5]
              }
            }
          ],
          series: [
            {
              type: 'radar',
              emphasis: {
                lineStyle: {
                  width: 4
                }
              },
              data: [
                {
                  value: [100, 8, 0.4, -80, 2000],
                  name: 'Data A'
                },
                {
                  value: [60, 5, 0.3, -100, 1500],
                  name: 'Data B',
                  areaStyle: {
                    color: 'rgba(255, 228, 52, 0.6)'
                  }
                }
              ]
            },
            {
              type: 'radar',
              radarIndex: 1,
              data: [
                {
                  value: [120, 118, 130, 100, 99, 70],
                  name: 'Data C',
                  symbol: 'rect',
                  symbolSize: 12,
                  lineStyle: {
                    type: 'dashed'
                  },
                  label: {
                    show: true,
                    formatter: function (params) {
                      return params.value;
                    }
                  }
                },
                {
                  value: [100, 93, 50, 90, 70, 60],
                  name: 'Data D',
                  areaStyle: {
                    color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                      {
                        color: 'rgba(255, 145, 124, 0.1)',
                        offset: 0
                      },
                      {
                        color: 'rgba(255, 145, 124, 0.9)',
                        offset: 1
                      }
                    ])
                  }
                }
              ]
            }
          ]
        }
        myEchart.setOption(option)
      },
      rowClass({ rowIndex, columnIndex }) {
        if (rowIndex === 1) {
          return {
            display: 'none'
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .box-card {
    // width: 80%;
    // margin: 0 auto;
  }
  .radar-wrap {
    height: 449px;
  }
</style>