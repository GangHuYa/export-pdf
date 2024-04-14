<template>
  <div class="offset-top-wrap" @click="calculateBodyTop">
    <el-table
      :data="tableData"
      style="width: 100%"
      class="offset-top-table"
    >
      <el-table-column
        prop="target"
        label="指标"
      >
      </el-table-column>
      <el-table-column
        prop="countrange"
        label="统计期间"
      >
      </el-table-column>
    </el-table>
    <!-- <div class="offset-item" ref="offsetItemRef" @click="generateImage">
      <div class="item" v-for="(item, index) in 20" :key="index">{{ item }}</div>
    </div> -->
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  import JsPdf from 'jspdf'
  export default {
    data () {
      return {
        value: '',
        tableData: [
          {
            target: '收益率(年化)',
            countrange: '-178%',
            lastOneMonth: '-206.9%',
            lastThreeMonth: '-206.9%',
            lastSixMonth: '-206.9%',
            lastOneYear: '-206.9%',
            fromYearOn: '-206.9%',
            fromBuildOn: '-206.9%'
          },
          {
            target: '收益率(年化)',
            countrange: '-178%',
            lastOneMonth: '-206.9%',
            lastThreeMonth: '-206.9%',
            lastSixMonth: '-206.9%',
            lastOneYear: '-206.9%',
            fromYearOn: '-206.9%',
            fromBuildOn: '-206.9%'
          }
        ],
        classList: ['el-table__body-wrapper', 'el-table__row']
      }
    },
    mounted() {
      // const tableDom = document.querySelector('.offset-top-table')
      // this.isRowDom(tableDom)
    },
    methods: {
      calculateBodyTop() {
        const bodyDom = document.querySelector('.el-table__body-wrapper')
        console.log('bodyDom', bodyDom, bodyDom.offsetTop)
      },
      getElementTop(element) {
        let actualTop = element.offsetTop;
        let current = element.offsetParent;
        console.log('current', current, actualTop)
        // while (current && current !== null) {
        while (current && !current.classList.contains('offset-top-wrap')) {
          actualTop += current.offsetTop;
          current = current.offsetParent;
          console.log('current1', current, current.offsetTop)
        }
        return actualTop;
      },
      isRowDom(wrapDom) {
        // const tableDom = document.querySelector('.offset-top-table')
        const children = wrapDom.childNodes
        for (let i = 0; i < children.length; i++) {
          const currentDom = children[i]
          // const flag = this.findTableRow(currentDom)
          // console.log('flag', currentDom.classList)
          if (currentDom.classList && currentDom.classList.contains('el-table__body-wrapper')) {
            this.findTableRow(currentDom.querySelectorAll('.el-table__row'))
          }
        }
      },
      findTableRow(currentDom) {
        console.log('currentDom', currentDom)
        for (let i = 0; i < currentDom.length; i++) {
          if (i === 0) {
            const child = currentDom[i]
            console.log('table_row', child.classList)
            const offsetTop = this.getElementTop(child)
            console.log('offsetTop', offsetTop)
          }
        }
      },
      calculateOffsetTop() {
        const currentDom = document.querySelector('.offset-item') // this.$refs.offsetItemRef
        let actualTop = currentDom.offsetTop
        let parentDom = currentDom.offsetParent
        console.log('parentDom', parentDom, currentDom.offsetHeight)
        while (parentDom && !parentDom.classList.contains('offset-top-wrap')) {
          actualTop += parentDom.offsetTop
          parentDom = parentDom.offsetParent
          console.log('parentDom', parentDom)
        }
        console.log('actualTop', actualTop)
      },
      exportPdf() {
        this.$nextTick(() => {
          this.generateImage()
        })
      },
      async generateImage() {
        const doms = document.querySelector('.offset-top-wrap')
        const PDF = new JsPdf('', 'pt', 'a4')
        html2canvas(doms, {
          dpi: 300,
          scale: 3
          // height: doms.height
        }).then(canvas => {
          const contentWidth = canvas.width
          const contentHeight = canvas.height
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89
          //未生成pdf的html页面高度
          let leftHeight = contentHeight
          //页面偏移
          let position = 0
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 10, 0, imgWidth - 20, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth - 20, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if (leftHeight > 0) {
                PDF.addPage();
              }
            }
          }
          PDF.save('bilibili.pdf')
        })
        // })
      },
    }
  }
</script>
<style lang="less" scoped>
  input {
    vertical-align: top;
  }
  .offset-top-wrap {
    position: relative;
    background: red;
    // height: 600px;
    // overflow: hidden;
    .first-top {
      height: 200px;
      margin-bottom: 20px;
      background: blue;
    }
    .offset-item {
      // padding: 30px 0;
      // margin-top: 30px;
      // height: 300px;
      // background: #fff;
      .item {
        background: #000;
        color: #fff;
      }
    }
  }
</style>