<!-- -->
<template>
  <div class="second-page-wrap" id="secondPage">
    <div class="area-first area-common 1">
      1
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
    <div class="area-common 2">
      2
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>

    <div class="area-common 3">
      3
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>

    <div class="area-common 4">
      <EchartPage></EchartPage>
    </div>

    <div class="area-common divide-inside 5">
      <div class="container black">
        <div class="item" v-for="(item, index) in 40" :key="index">{{ item }}</div>
      </div>
    </div>

    <CircleComponent class="area-common"></CircleComponent>

    <div class="area-common 6">
      4
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>

    <div class="area-common 7">
      5
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>

    <div class="area-common 8">
      6
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import JsPdf from 'jspdf'
  import EchartPage from './EchartPage'
  import CircleComponent from '@/components/pdf-components/CircleComponent'
  export default {
    data () {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    },
    components: {
      EchartPage,
      CircleComponent
    },
    mounted () {

    },
    methods: {
      async generateImage1() {
        // const doms = document.querySelectorAll('.page-container .module')
        const doms = document.querySelector('.second-page')
        const PDF = new JsPdf('', 'pt', 'a4')
        // doms.forEach((item) => {
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
          // let position = 0
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          let imgWidth = 595.28
          let imgHeight = 592.28 / contentWidth * contentHeight
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          // this.loadImage(pageData)
          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          // console.log('imgHeight', imgHeight)
          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 10, 100, imgWidth, imgHeight)
          } else {
            const pages = this.calculateElementHeight()
            for (let i = 0; i < pages.length; i++) {
              PDF.addImage(pageData, 'JPEG', 0, pages[i], imgWidth, imgHeight)
              PDF.addPage();
            }
            // while (leftHeight > 0) {
            //   PDF.addImage(pageData, 'JPEG', 0, pages[index], imgWidth, imgHeight)
            //   leftHeight -= pageHeight;
            //   // position -= 841.89;
            //   index++
            //   //避免添加空白页
            //   if (leftHeight > 0) {
            //     PDF.addPage();
            //   }
            // }
            PDF.save('bilibili.pdf')
          }
        })
        // })
      },
      //避免分页被截断
      exportPDF(pdfDom) {
        const A4_WIDTH = 592.28;
        const A4_HEIGHT = 841.89;
        // myLoading 自定义等待动画组件，实现导出事件的异步等待交互
        // dom的id。
        let target = document.getElementById(pdfDom);
        let pageHeight = (target.scrollWidth / A4_WIDTH * A4_HEIGHT).toFixed(2);
        console.log('singlePdf', pageHeight, target.scrollWidth)
        // 获取分割dom，此处为class类名为item的dom
        let lableListID = target.getElementsByClassName('area-common');
        // let lableListID = document.getElementsByClassName('item');
        // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
        for (let i = 0; i < lableListID.length; i++) {
          let multiple = Math.ceil((lableListID[i].offsetTop + lableListID[i].offsetHeight) / pageHeight);
          if (this.isSplit(lableListID, i, multiple * pageHeight, multiple)) {
            let divParent = lableListID[i].parentNode; // 获取该div的父节点
            let newNode = document.createElement('div');
            newNode.className = 'emptyDiv';
            newNode.style.background = '#01195e';
            let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].offsetHeight);
            newNode.style.height = _H + 30 + 'px';
            newNode.style.width = '100%';

            // const imageNode = document.createElement('img')
            // imageNode.src = pageHeader
            // imageNode.style.width = '100%'
            // imageNode.style.height = '40px'

            let next = lableListID[i].nextSibling; // 获取div的下一个兄弟节点
            // 判断兄弟节点是否存在
            // console.log(next);
            if (next) {
              // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
              divParent.insertBefore(newNode, next);
              // divParent.insertBefore(imageNode, next);
            } else {
              // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
              divParent.appendChild(newNode);
            }
          }
        }
        this.generateImage()
      },
      // 判断是否需要添加空白div
      isSplit(nodes, index, pageHeight, multiple) {
        if (index === 4 || index === 5) {
          console.log('multiple', multiple)
          console.log('selfHeight', nodes[index].offsetTop + nodes[index].offsetHeight)
          console.log('index', index, nodes[index].className, pageHeight)
        }
        // 计算当前这块dom是否跨越了a4大小，以此分割
        if (nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight && nodes[index + 1] && nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight) {
          return true;
        }
        return false;
      },
      loadImage(dataUrl) {
        const aDom = document.createElement('a')
        aDom.href = dataUrl
        aDom.download = '1.png'
        document.body.appendChild(aDom)
        aDom.click()
        document.body.removeChild(aDom)
      },
      calculateElementHeight() {
        const areaCommonDoms = document.querySelectorAll('.second-page .area-common')
        let firstTop = 0
        const pages = [0]
        for (let i = 0; i < areaCommonDoms.length; i++) {
          const currentDom = areaCommonDoms[i]
          const item = currentDom.getBoundingClientRect()
          if (i === 0) {
            firstTop = item.top
          }
          const distanceTop = item.top - firstTop
          const offsetHeight = currentDom.offsetHeight
          console.log('item', item.top - firstTop)
          if (distanceTop + offsetHeight > 841) {
            pages.push(Math.ceil(distanceTop))
          }
        }
        return pages
        // console.log('pages', pages)
      }
    }
  }
</script>
<style lang='less' scoped>
  .second-page-wrap {
    .black {
      background: #000;
    }
    .container {
      // margin-bottom: 50px;
      color: #fff;
      .item {
        height: 40px;
        line-height: 40px;
        // background: #000;
        padding-left: 10px;
      }
    }
    .area-common {
      // margin: 30px auto;
      width: 80%;
      margin: 0 auto;
      padding: 30px 0;
    }
  }
</style>