<template>
  <div class="page-container">
    <div class="page-left">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
      >
      </el-tree>
    </div>
    <div class="page-right">
      <div class="first-page module">
        <div class="title">This is a first page{{ str }}</div>
        <div class="export-button-contain">
          <div class="export-progress">
            <el-progress type="circle" :percentage="percentage" :color="colors"></el-progress>
          </div>
          <el-button @click="generatePdf" class="exportButton">exportPdf</el-button>
        </div>
      </div>
      <MainContent class="second-page"></MainContent>
    </div>
    <div class="image-wrap">
      <img src="../assets/page-header.png" class="image"/>
    </div>
    <div class="footer">
    </div>
    <div class="endImage">
      <img src="../assets/logo.png" alt="">
    </div>
    <FirstPage class="fristpage"></FirstPage>
    <!-- <MainContent class="second-page-pdf" chartCode="chartCode"></MainContent> -->
    <!-- <el-button @click="exportPDF('secondPage')">export pdf</el-button> -->
  </div>
</template>
<script>
  import MainContent from '@/components/pdf-components/MainContent'
  import FirstPage from '@/components/FirstPage'
  import { addFirstPage, outputPDF } from '../utils/outputPDF'
  // import { Message  } from 'element-ui';
  // import pageHeader from '../assets/page-header.png'

  export default {
    data () {
      return {
        str: '',
        percentage: 0,
        colors: [
          {color: '#f56c6c', percentage: 20},
          {color: '#e6a23c', percentage: 40},
          {color: '#5cb87a', percentage: 60},
          {color: '#1989fa', percentage: 80},
          {color: '#67c23a', percentage: 100}
        ],
        treeData: [
          {
            id: 1,
            label: '总体情况',
            children: [
              {
                id: 11,
                label: '基本情况'
              },
              {
                id: 12,
                label: '净值走势'
              },
              {
                id: 13,
                label: '动态回顾'
              },
              {
                id: 14,
                label: '业绩指标'
              },
              {
                id: 15,
                label: '各区间收益'
              },
              {
                id: 16,
                label: '产品规模'
              },
              {
                id: 17,
                label: '大类持仓时序'
              }
            ]
          },
          {
            id: 2,
            label: '绩效表现',
            children: [
              {
                id: 21,
                label: '业绩表现'
              },
              {
                id: 22,
                label: '风险调整收益'
              }
            ]
          },
          {
            id: 3,
            label: '大类资产配置',
            children: [
              {
                id: 31,
                label: '大类期末资产配置'
              },
              {
                id: 32,
                label: '期间大类资产规模走势'
              },
              {
                id: 33,
                label: '多空敝口时序'
              }
            ]
          },
          {
            id: 4,
            label: '股票资产收益归因',
            children: [
              {
                id: 41,
                label: '股票资产Brinson收益'
              },
              {
                id: 42,
                label: 'Barra归因'
              },
              {
                id: 43,
                label: '个股收益贡献'
              },
              {
                id: 44,
                label: '风格因子收益贡献时序'
              }
            ]
          },
          {
            id: 5,
            label: '总体情况',
            children: [
              {
                id: 51,
                label: '基本信息'
              },
              {
                id: 52,
                label: '净值走势'
              },
              {
                id: 53,
                label: '动态回撤'
              },
              {
                id: 54,
                label: '业绩指标'
              },
              {
                id: 55,
                label: '个区间收益'
              },
              {
                id: 56,
                label: '产品规模'
              },
              {
                id: 57,
                label: '大类持仓时序'
              },
            ]
          },
          {
            id: 6,
            label: '绩效表现',
            children: [
              {
                id: 61,
                label: '业绩表现'
              },
              {
                id: 62,
                label: '风险调整收益'
              },
              {
                id: 63,
                label: '超额业绩'
              }
            ]
          }
        ]
      }
    },
    components: {
      MainContent,
      FirstPage
    },
    mounted() {
      const str = `据产业在线监测显示，2024年2月家用空调生产1174.4万台，同比下降17.9%，销售1232.1万台，同比下降11.1%，其中内销出货606.9万台，同比下降13.4%，出口出货625.2万台，同比下降8.7%。库存1761.8万台，同比下降9.4%。\n 
综合1-2月来看，生产同比增长16.9%，内销同比增长16.3%，出口同比增长18.9%。`
      // console.log('11', '同比下降9.4%。\n '.replace(/\n/g, ''))
      this.str = str.replace(/\n/g, '')
    },
    methods: {
      exportPdf() {
        this.$nextTick(() => {
          this.generatePdf()
        })
      },
      async generatePdf() {
        const element = document.querySelector('.second-page');
        const firstpage = document.querySelector('.fristpage');
        const header = document.querySelector('.image-wrap');
        const footer = document.querySelector('.footer');
        const endImage = document.querySelector('.endImage');
        try {
          const startTime = Date.now()
          await outputPDF({
            element: element,
            firstpage,
            header: header,
            footer,
            endImage,
            outerestClassName: 'second-page', // 'second-page-pdf',
            contentWidth: 560,
            onProgress: (progress) => {
              this.percentage = progress
            }
          })
          console.log('endTime', Math.floor((Date.now() - startTime) / 1000))
        } catch (error) {
          console.log('error', error)
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .page-container {
    // height: 100vh;
    // overflow: hidden;
    display: flex;
    margin: 0 auto;
    .page-left {
      background: #fff;
      width: 200px;
      padding: 60px 20px 0 20px;
    }
    .page-right {
      // height: 100%;
      // overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      .first-page {
        background: #fff;
        .export-button-contain {
          display: flex;
          align-items: center;
          text-align: right;
          padding-right: 150px;
          position: fixed;
          top: 50px;
          right: 20px;
          z-index: 100;
          .export-progress {
            // border: 1px solid red;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            margin-right: 10px;
            text-align: center;
            line-height: 36px;
            font-size: 12px;
            /deep/.el-progress-circle {
              width: 36px !important;
              height: 36px !important;
            }
            /deep/.el-progress__text {
              font-size: 12px !important;
            }
          }
        }
      }
      .second-page::-webkit-scrollbar {
        display: none;
      }
      .second-page {
        flex: 1;
        overflow: auto;
        // width: 1320px;
        // background: purple;
        position: relative;
      }
    }
  }
  .image-wrap {
    position: fixed;
    top: -2000px;
    left: 0;
    width: 1210px;
    height: 80px;
    .image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .footer {
    position: fixed;
    top: -1100px;
    left: 0;
    height: 20px;
    width: 100%;
    background: #fff;
  }
  .endImage {
    position: fixed;
    top: -300px;
    left: 0;
    width: 200px;
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .second-page-pdf {
    position: fixed;
    background: #fff;
    left: -2000px;
    top: 0px;
    width: 1210px;
  }
</style>