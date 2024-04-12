<template>
  <div class="page-container">
    <div class="page-left">
    </div>
    <div class="page-right">
      <div class="first-page module">
        <div class="title">This is a first page</div>
        <!-- <el-button @click="calculateElementHeight">CalculateHeight</el-button> -->
        <div class="export-button-contain">
          <el-button @click="generatePdf" class="exportButton">exportPdf</el-button>
        </div>
      </div>
      <MainContent class="second-page"></MainContent>
    </div>
    <img src="../assets/page-header.png" class="image"/>
    <div class="footer">
    </div>
    <MainContent class="second-page-pdf"></MainContent>
    <!-- <el-button @click="exportPDF('secondPage')">export pdf</el-button> -->
  </div>
</template>
<script>
  import MainContent from '@/components/pdf-components/MainContent'
  import { outputPDF } from '../utils/outputPDF'
  // import { Message  } from 'element-ui';
  // import pageHeader from '../assets/page-header.png'

  export default {
    data () {
      return {
        
      }
    },
    components: {
      MainContent
    },
    mounted() {
    },
    methods: {
      async generatePdf() {
        const element = document.querySelector('.second-page-pdf');
        const header = document.querySelector('.image');
        const footer = document.querySelector('.footer');
        try {
          await outputPDF({
            element: element,
            header: header,
            footer,
            contentWidth: 560
          })
        } catch (error) {
          console.log('error', error)
          // Message.error(typeof error === 'string' ? error : JSON.stringify(error))
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .page-container {
    height: 100vh;
    overflow: hidden;
    display: flex;
    margin: 0 auto;
    .page-left {
      background: #000;
      width: 200px;
    }
    .page-right {
      height: 100%;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: column;
      .first-page {
        background: #fff;
        .export-button-contain {
          text-align: right;
          padding-right: 150px;
        }
      }
      .second-page {
        flex: 1;
        overflow: auto;
        position: relative;
      }
    }
  }

  .image {
    position: fixed;
    top: -1000px;
    left: 0;
    width: 90%;
    height: 100px;
  }
  .footer {
    position: fixed;
    top: -1100px;
    left: 0;
    height: 20px;
    width: 100%;
    background: yellow;
  }
  .second-page-pdf {
    position: fixed;
    left: -2000px;
    top: 0;
    width: 100%;
  }
</style>