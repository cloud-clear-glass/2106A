<template>
  <div class="goods">
    <el-card class="mt">
      <router-view></router-view>
      <!-- 搜索和添加 -->
      <div style="margin-top: 15px">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-input
              clearable
              v-model="quyerInfo.query"
              placeholder="请输入内容"
              @clear="seach"
              class="input-with-select"
            >
              <el-button slot="append" icon="el-icon-search" @click="seach">
              </el-button>
            </el-input>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" @click="handlebtn">添加商品</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <div class="mt">
        <el-table border :data="tableData">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="商品名称" prop="goods_name"></el-table-column>
          <el-table-column
            label="商品价格(元)"
            prop="goods_price"
            width="110px"
          ></el-table-column>
          <el-table-column
            label="商品重量"
            prop="goods_number"
            width="80px"
          ></el-table-column>
          <el-table-column label="创建时间" width="160px">
            <template slot-scope="scope">
              {{ new Date(scope.row.add_time * 1000).toLocaleString() | data }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <!-- 修改 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
              ></el-button>
              <!-- 删除 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="mt">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="quyerInfo.pagenum"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="quyerInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getGoodsData } from '../api/goodsHttp'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      quyerInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 100
    }
  },
  methods: {
    handleSizeChange(val) {
      this.quyerInfo.pagesize = val
      this.getData()
    },
    handleCurrentChange(val) {
      this.quyerInfo.pagenum = val
      this.getData()
    },
    // 获取商品列表数据
    async getData() {
      const res = await getGoodsData(this.quyerInfo)
      this.total = res.total
      this.tableData = res.goods
      //   console.log(new Date(this.tableData[0].add_time).toLocaleString())
    },
    handlebtn() {
      this.$router.push('/add')
    },
    // 搜索
    seach() {
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style scoped lang="scss"></style>
