<template>
  <el-card class="trade-analysis-card">
    <div slot="header" class="clearfix">
      <span>前十大成交金额股东</span>
    </div>
    <div class="trade-analysis-table">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="zqcode"
          label="证券代码"
        >
        </el-table-column>
        <el-table-column
          prop="zqname"
          label="证券名称"
        >
        </el-table-column>
        <el-table-column
          prop="tradeNumber"
          label="交易金额"
        >
        </el-table-column>
        <el-table-column
          label="买入"
        >
          <el-table-column
            prop="in.number"
            label="股数(万股)"
          >
          </el-table-column>
          <el-table-column
            prop="in.amount"
            label="金额(万元)"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          label="卖出"
        >
          <el-table-column
            prop="out.number"
            label="股数(万股)"
          >
          </el-table-column>
          <el-table-column
            prop="out.amount"
            label="金额(万元)"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column
          prop="income"
          label="股票盈亏(万元)"
        >
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [
          {
            zqcode: '300043',
            zqname: '星辉娱乐',
            tradeNumber: '38.06',
            in: {
              number: '6.03',
              amount: '38.06'
            },
            out: {
              number: '6.03',
              amount: '38.06'
            },
            income: '38.06'
          }
        ]
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        let list = []
        for (let i = 0; i < 10; i++) {
          const obj = {
            zqcode: '300043' + i,
            zqname: '星辉娱乐' + i,
            tradeNumber: '38.06' + i,
            in: {
              number: '6.03' + i,
              amount: '38.06' + i
            },
            out: {
              number: '6.03' + i,
              amount: '38.06' + i
            },
            income: '38.06' + i
          }
          list.push(obj)
        }
        this.tableData = list
      }
    }
  }
</script>
<style lang="less" scoped></style>