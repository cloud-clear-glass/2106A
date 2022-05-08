<template>
  <div class="goods">
    <el-card class="mt">
      <!-- 搜索 -->
      <el-row :gutter="12">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-button type="primary" @click="$router.replace('/add')"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table border class="mt" :data="tableData">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
          width="120px"
        ></el-table-column>
        <el-table-column
          label="商品重量"
          prop="goods_weight"
          width="100px"
        ></el-table-column>
        <el-table-column label="创建时间" width="160px">
          <template slot-scope="scope">
            {{ (scope.row.add_time * 1000) | data }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 50, 150, 200]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsData } from '../api/goodsHttp'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagesize: 10,
        pagenum: 1
      },
      tableData: [],
      total: 0 // 总条数
    }
  },
  methods: {
    // 获取数据
    async getData() {
      const res = await getGoodsData(this.queryInfo)
      const { goods, total } = res
      this.tableData = goods
      this.total = total
    },
    // 每页条数改变
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getData()
    },
    // 每页页码改变
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss"></style>
