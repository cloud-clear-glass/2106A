<template>
  <div class="mytitle">
    <el-breadcrumb>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title1 }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ title2 }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
export default {
  props: {
    title1: {
      type: String,
      default: "",
    },
    title2: {
      type: String,
      default: "",
    },
  },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
