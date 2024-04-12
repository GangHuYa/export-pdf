<template>
  <div class="container">
    <div class="tab-wrap">
      <div class="left_arrow" v-if="isShowArrow" @click="prev"><</div>
      <div class="tab-container" ref="tabContainerRef">
        <div
          class="tab-nav-scroll"
          ref="tabNavScrollRef"
          :style="tabNavScrollOffsetLeft"
        >
          <div
            class="tab-item"
            v-for="(item, index) in tabsList"
            :key="index"
            :class="tabIndex === index ? 'tab-item-background' : ''"
            ref="tabItemRef"
            @click="clicktabItem(index)"
          >
            {{ item }}
          </div>
          <div class="slideline" :style="slideStyle"></div>
        </div>
      </div>
      <div class="right_arrow" v-if="isShowArrow" @click="next">></div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsList: [
        '首页',
        '菜单',
        '证券',
        '中央新闻',
        '金钱',
        '好看的电影',
        '铜铁铝',
        '好看的电影1',
        '好看的电影2',
        '好看的电影4'
      ],
      tabIndex: 0,
      slidelineWidth: 0,
      slideOffsetLeft: 0,
      tabContainerWidth: 0,
      isShowArrow: false,
      navScrollLeft: 0,
      clickTabIndex: 0
    }
  },
  computed: {
    slideStyle() {
      return {
        width: this.slidelineWidth + 'px',
        transform: `translateX(${this.slideOffsetLeft}px)`
      }
    },
    tabContainerStyle() {
      return {
        width: this.tabContainerWidth + 'px'
      }
    },
    tabNavScrollOffsetLeft() {
      return {
        transform: `translateX(-${this.navScrollLeft}px)`
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTabContainerWidth()
      this.getSlideDefaultWidth(0)
    })
  },
  methods: {
    getTabContainerWidth() {
      let sumWidth = 0
      this.$refs.tabItemRef.forEach((item) => {
        const itemObj = item.getBoundingClientRect()
        const { width } = itemObj
        sumWidth += width
      })
      const tabContainerWidth =
        this.$refs.tabContainerRef.getBoundingClientRect().width
      // const tabNavScrollWidth = this.$refs.tabNavScrollRef.getBoundingClientRect().width
      console.log('tabContainerWidth', tabContainerWidth, sumWidth)
      this.isShowArrow = sumWidth > tabContainerWidth
      this.sumWidth = sumWidth
      this.tabContainerWidth = tabContainerWidth
    },
    getSlideDefaultWidth(index) {
      const tabItemEle = this.$refs.tabItemRef[index]
      const tabItemObj = tabItemEle.getBoundingClientRect()
      // console.log('tabItemObj', tabItemObj, tabItemEle.offsetLeft)
      const { width } = tabItemObj
      this.slidelineWidth = width

      this.slideOffsetLeft = tabItemEle.offsetLeft
    },
    clicktabItem(index) {
      this.tabIndex = index
      this.getSlideDefaultWidth(index)
    },
    next() {
      let sumLeftWidth = 0
      this.$refs.tabItemRef.slice(0, this.clickTabIndex + 1).forEach((item) => {
        const itemObj = item.getBoundingClientRect()
        const { width } = itemObj
        sumLeftWidth += width
      })
      const remainWidth = this.sumWidth - sumLeftWidth
      const tabContainerWidth =
        this.$refs.tabContainerRef.getBoundingClientRect().width
      console.log('remainWidth', remainWidth, tabContainerWidth)
      if (remainWidth > tabContainerWidth) {
        this.navScrollLeft = sumLeftWidth
        this.clickTabIndex++
      } else {
        this.navScrollLeft = this.sumWidth - tabContainerWidth
      }
    },
    prev() {
      if (this.clickTabIndex <= 0) {
        this.navScrollLeft = 0
        return false
      }
      let sumLeftWidth = 0
      this.$refs.tabItemRef.slice(0, this.clickTabIndex - 1).forEach((item) => {
        const itemObj = item.getBoundingClientRect()
        const { width } = itemObj
        sumLeftWidth += width
      })
      console.log('sumLeftWidth', sumLeftWidth)
      this.navScrollLeft = sumLeftWidth
      this.clickTabIndex--
      // const remainWidth = this.sumWidth - sumLeftWidth
      // const tabContainerWidth = this.$refs.tabContainerRef.getBoundingClientRect().width
      // console.log('remainWidth', remainWidth, tabContainerWidth)
      // if (remainWidth > tabContainerWidth) {
      //   this.navScrollLeft = sumLeftWidth
      // } else {
      //   this.navScrollLeft = this.sumWidth - tabContainerWidth
      // }
      // this.tabIndex--
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 700px;
}
.tab-wrap {
  display: flex;
  width: 100%;
  .common_class {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .left_arrow {
    width: 50px;
    .common_class;
  }
  .right_arrow {
    width: 50px;
    .common_class;
  }
  .tab-container {
    flex: 1;
    overflow: hidden;
    border: 1px solid #eaeaea;
    .tab-nav-scroll {
      width: 100%;
      display: flex;
      flex-wrap: nowrap;
      transition: all 0.3s;
      position: relative;
      .tab-item-background {
        color: #409eff;
        background: red;
      }
      .tab-item {
        padding: 4px 10px;
        cursor: pointer;
        flex-shrink: 0;
      }
      .slideline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0px;
        height: 4px;
        background: #409eff;
        transition: all 0.3s;
      }
    }
  }
}
</style>
