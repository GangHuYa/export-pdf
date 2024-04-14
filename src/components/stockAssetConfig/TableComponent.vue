<template>
  <el-card class="table-card">
    <div slot="header" class="clearfix">
      <span>股票期末资产比列</span>
    </div>
    <div class="table-wrap">
      <el-table
        :data="tableData"
        border
        style="width: 90%"
        :header-cell-style="rowClass"
      >
        <el-table-column
          label="金额"
          prop="price"
          align="center"
        >
        </el-table-column>
        <el-table-column
          label="比列"
          prop="rate"
          align="center"
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
            price: '',
            rate: ''
          },
          {
            price: '',
            rate: ''
          }
        ]
      }
    },
    methods: {
      rowClass({ rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          // console.log('rowIndex', rowIndex)
          return {
            background: '#F5F7FA'
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped></style>