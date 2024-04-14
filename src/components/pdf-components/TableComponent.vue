<template>
  <el-card class="table-card">
    <div slot="header" class="clearfix">
      <span>个股收益贡献11111</span>
    </div>
    <div class="table-wrap">
      <div class="table-wrap-left">
        <el-table
          :data="tableData"
          border
          style="width: 90%"
          :header-cell-style="rowClass"
        >
          <el-table-column
            label="十大个股收益贡献"
            prop="params"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
      <div class="table-wrap-right">
        <el-table
          :data="tableData"
          style="width: 90%"
          border
          :header-cell-style="rowClass"
        >
          <el-table-column
            label="十大个股收益贡献"
            prop="params"
            align="center"
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
  </el-card>
</template>
<script>
  export default {
    data () {
      return {
        tableData: [
          {
            params: '华友钴业',
          },
          {
            params: '中信特钢'
          }
        ]
      }
    },
    methods: {
      rowClass({ rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          console.log('rowIndex', rowIndex)
          return {
            background: '#F5F7FA'
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .table-card {
    // width: 80%;
    // margin: 10px auto;
    background: red;
    .table-wrap {
      display: flex;
      justify-content: space-between;
      height: 359px;
      &-left {
        width: 50%;
        height: 100%;
      }
      &-right {
        width: 50%;
        height: 100%;
      }
    }
  }
</style>