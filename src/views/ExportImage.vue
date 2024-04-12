<template>
  <div class="export-container">
    <div class="container">
      <div>1111</div>
    </div>
    <!-- <img src="../assets/temp.png" alt="" id="logo">
    <img src="../assets/logo.png" id="image"></img> -->
    <el-button @click="drawDpf">export Image</el-button>
  </div>
</template>
<script>
  import html2canvas from 'html2canvas'
  import JsPdf from 'jspdf'
  export default {
    data () {
      return {}
    },
    methods: {
      drawDpf() {
        const pdf = new JsPdf('', 'pt', 'a4')
        const domContainer = document.querySelector('.container')
        console.log('rawHeight', domContainer.offsetHeight)
        html2canvas(domContainer, {
          dpi: 190,
          scale: 4,
          height: domContainer.offsetHeight
        }).then(canvas => {
          console.log('height', canvas.height)
          const contentWidth = canvas.width
          const contentHeight = canvas.height
          //一页pdf显示html页面生成的canvas高度;
          let pageHeight = contentWidth / 592.28 * 841.89

          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          console.log('pageHeight', pageHeight, contentHeight, imgWidth)
          console.log('imgHeight', imgHeight)
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          pdf.save('11.pdf')
          // console.log('imgWidth', imgWidth, imgHeight)
        })
        // // const imageDom = document.querySelector('#image')
        // const logoDom = document.querySelector('#logo')
        // let imgWidth = 595.28
        // let imgHeight = 592.28 / logoDom.clientWidth * logoDom.clientHeight
        // pdf.addImage(logoDom, 'PNG', 10, 0, imgWidth, imgHeight)

        // pdf.addPage()
        
        // pdf.addImage(logoDom, 'PNG', 10, -imgHeight + 40, imgWidth, imgHeight)

        // pdf.setDrawColor(0)
        // pdf.setFillColor(255, 255, 255)
        // pdf.rect(0, 0, imgWidth, 40, 'F')

        // pdf.addImage(imageDom, 'PNG', 0, 0, imgWidth, 40)
        // pdf.save('1.pdf')
      }
    }
  }
</script>
<style lang="less" scoped>
  .export-container {
    // display: flex;
    .container {
      height: 800px;
      background: red;
    }
    // #logo {
    //   width: 50%;
    //   height: 900px;
    // }
  }
</style>