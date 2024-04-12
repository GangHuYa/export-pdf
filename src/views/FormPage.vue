<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="dateRange">
        <el-date-picker
          v-model="ruleForm.dateRange"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          @change="selectChange"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        ruleForm: {
          dateRange: ''
        },
        rules: {
          dateRange: [{ message: '请输入活动名称' }]
        }
      }
    },
    methods: {
      selectChange() {
        this.$refs.ruleForm.validateField('dateRange', (errorMsg) => {
          console.log('errorMsg', errorMsg)
        })
      }
    }
  }
</script>
<style lang="less" scoped></style>