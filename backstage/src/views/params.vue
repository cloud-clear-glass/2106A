<template>
  <div class="params">
    <my-title title1="商品管理" title2="分类参数"></my-title>
    <el-card class="mt">
      <!-- 提示 -->
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 选择分类 -->
      <el-row class="mt">
        <el-col :span="3">选择商品分类：</el-col>
        <el-col :span="21">
          <span class="demonstration">hover 触发子菜单</span>
          <el-cascader
            v-model="value"
            :options="options"
            :props="{ expandTrigger: 'hover' }"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import myTitle from "../components/myTitle.vue";
export default {
  components: { myTitle },
  setup() {},
};
</script>
<style lang="scss" scoped></style>
