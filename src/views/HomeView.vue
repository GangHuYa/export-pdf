<template>
  <div class="home">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="navWrap">
      <el-tab-pane
        v-for="(item, index) in 20"
        :label="index + '用户管理'"
        :name="'first' + index"
        :key="index"
        >用户管理</el-tab-pane
      >
    </el-tabs>
    <el-button type="primary" @click="jumpNewPage">enterNewPage</el-button>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      activeName: '',
      activeIndex: ''
    }
  },
  beforeRouteLeave(from, to, next) {
    this.getOffsetLeft()
    next()
  },
  mounted() {
    // console.log('---')
    const translateValue = window.sessionStorage.getItem('tabsOffsetValue')
    const activeName = window.sessionStorage.getItem('activeName')
    const navScrollDom = document.querySelector('.el-tabs__nav')
    navScrollDom.setAttribute(
      'style',
      `transform: translateX(${Number(translateValue) + 'px'})`
    )
    this.activeName = activeName
    this.requestTestHttp()
  },
  methods: {
    async requestTestHttp() {
      try {
        const res = await axios.get('http://localhost:3000/test')
        console.log('res', res)
      } catch (e) {
        console.log('e11111', e)
      }
    },
    handleSelect(key) {
      console.log('key', key, this.activeIndex)
      // this.activeIndex = key
    },
    jumpNewPage() {
      this.$router.push('/newpage')
    },
    getOffsetLeft() {
      const navScrollDom = document.querySelector('.el-tabs__nav')
      const translateValue = getComputedStyle(navScrollDom).transform
      console.log('translateValue', translateValue)
      const values = translateValue.substring(
        translateValue.indexOf('(') + 1,
        translateValue.length - 1
      )
      console.log(values.split(','))
      window.sessionStorage.setItem(
        'tabsOffsetValue',
        Number(values.split(',')[4].trim())
      )
      window.sessionStorage.setItem('activeName', this.activeName)
    },
    handleClick() {
      this.$nextTick(() => {
        this.getOffsetLeft()
      })
    }
  },
  watch: {
    activeIndex(nv, ov) {
      console.log('nv', nv, ov)
    }
  }
}
</script>
