<template>
  <div class="rights">
    <el-card class="mt">
      <div class="mt">
        <el-table border :data="tableData" stripe>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="权限名称" prop="authName"></el-table-column>
          <el-table-column label="路径" prop="path"></el-table-column>
          <el-table-column label="权限等级" prop="pid">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.level === '0'"> 一级</el-tag>
              <el-tag type="success" v-if="scope.row.level === '1'"
                >二级</el-tag
              >
              <el-tag type="warning" v-if="scope.row.level === '2'"
                >三级</el-tag
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getrightData } from '../api/rolesHttp'
export default {
  data() {
    return {
      tableData: [],
      twoID: []
    }
  },
  methods: {
    async getData() {
      const res = await getrightData()
      // console.log(res)
      this.tableData = res
      this.twoID = this.tableData.filter((item) => {
        return item.level === '1'
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss"></style>
