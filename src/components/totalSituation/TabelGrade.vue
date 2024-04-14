<template>
  <el-card class="gradeRule-card">
    <div slot="header" class="clearfix">
      <span>{{ title }}</span>
    </div>
    <div class="grade-rule-table">
      <el-select v-model="value">
        <el-option label="产品" value="1"></el-option>
      </el-select>
      <el-table
        :data="tableData"
        style="width: 100%">
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
        <el-table-column
          prop="lastOneMonth"
          label="近一个月">
        </el-table-column>
        <el-table-column
          prop="lastThreeMonth"
          label="近三个月"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lastSixMonth"
          label="近六个月"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lastOneYear"
          label="近一年">
        </el-table-column>
        <el-table-column
          prop="fromYearOn"
          label="今年以来"
          width="180">
        </el-table-column>
        <el-table-column
          prop="fromBuildOn"
          label="成立以来">
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: '业绩指标'
      }
    },
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
          }
        ]
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        let list = []
        for (let i = 0; i < 10; i++) {
          const obj = {
            target: '收益率(年化)',
            countrange: '-178%',
            lastOneMonth: '-206.9%',
            lastThreeMonth: '-206.9%',
            lastSixMonth: '-206.9%',
            lastOneYear: '-206.9%',
            fromYearOn: '-206.9%',
            fromBuildOn: '-206.9%'
          }
          list.push(obj)
        }
        this.tableData = list
      }
    }
  }
</script>
<style lang="less" scoped>
  .grade-rule-table {
    // height: 453px;
  }
</style>