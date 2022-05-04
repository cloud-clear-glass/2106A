<template>
  <div class="rights">
    <!-- 面包屑 -->
    <my-title title1="权限管理" title2="权限列表"></my-title>
    <el-card class="mt">
      <el-table :data="list" border>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级">
          <template #default="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.level === '2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { getRightsApi } from "../api/rolesHttp";
import MyTitle from "../components/myTitle.vue";
export default {
  components: { MyTitle },
  setup() {
    const list = ref([]);
    getRightsApi("list").then((res) => {
      list.value = res;
    });
    return { list };
  },
};
</script>
<style lang="scss" scoped></style>
