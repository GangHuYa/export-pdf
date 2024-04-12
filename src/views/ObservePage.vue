<template>
  <div class="page-wrap">
    <div class="left">
      <el-checkbox-group v-model="checkList">
        <div class="left-item" v-for="(item, index) in 9" :key="index">
          <el-checkbox :label="item">菜单{{item}}</el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div class="right" ref="rightRef">
      <CommonObserve v-show="judgeIsExist(1)">
        <ObservePage1></ObservePage1>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(2)">
        <ObservePage2></ObservePage2>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(3)">
        <ObservePage3></ObservePage3>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(4)">
        <ObservePage4></ObservePage4>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(5)">
        <ObservePage5></ObservePage5>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(6)">
        <ObservePage6></ObservePage6>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(7)">
        <ObservePage7></ObservePage7>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(8)">
        <ObservePage8></ObservePage8>
      </CommonObserve>
      <CommonObserve v-show="judgeIsExist(9)">
        <ObservePage9></ObservePage9>
      </CommonObserve>
    </div>
  </div>
</template>
<script>
  import CommonObserve from '../components/CommonObserve.vue'
  const ObservePage1 = () => import('../components/ObserveComponent1.vue')
  const ObservePage2 = () => import('../components/ObserveComponent2.vue')
  const ObservePage3 = () => import('../components/ObserveComponent3.vue')
  const ObservePage4 = () => import('../components/ObserveComponent4.vue')
  const ObservePage5 = () => import('../components/ObserveComponent5.vue')
  const ObservePage6 = () => import('../components/ObserveComponent6.vue')
  const ObservePage7 = () => import('../components/ObserveComponent7.vue')
  const ObservePage8 = () => import('../components/ObserveComponent8.vue')
  const ObservePage9 = () => import('../components/ObserveComponent9.vue')
  export default {
    data () {
      return {
        checkList: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    components: {
      CommonObserve,
      ObservePage1,
      ObservePage2,
      ObservePage3,
      ObservePage4,
      ObservePage5,
      ObservePage6,
      ObservePage7,
      ObservePage8,
      ObservePage9
    },
    methods: {
      judgeIsExist(currentKey) {
        return this.checkList.includes(currentKey)
      }
    }
  }
</script>
<style lang="less" scoped>
  .page-wrap {
    height: 100%;
    display: flex;
    .left {
      width: 100px;
      // overflow: auto;
      background: #000;
      color: #fff;
      text-align: center;
      .left-item {
        padding: 4px 10px;
      }
    }
    .right {
      height: 100%;
      overflow: auto;
      flex: 1;
      padding: 10px;
      background: #eee;
    }
  }
</style>