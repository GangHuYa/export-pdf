<template>
  <div class="about">
    <h1 @click="returnBack">This is an about page</h1>
  </div>
</template>
<script>
export default {
  methods: {
    returnBack() {
      this.$router.go(-1)
    }
  }
}
</script>
