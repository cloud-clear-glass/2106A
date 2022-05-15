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
            <el-button type="primary" size="mini">
              <svg
                t="1652615098815"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10161"
                width="16"
                height="16"
              >
                <path
                  d="M546.133333 128l243.2 243.2-371.2 371.2H170.666667v-243.2L546.133333 128zM213.333333 516.266667v179.2h179.2L725.333333 371.2l-179.2-179.2L213.333333 516.266667z m-42.666666 311.466666h128v42.666667H170.666667v-42.666667z m170.666666 0h213.333334v42.666667H341.333333v-42.666667z m256 0h298.666667v42.666667h-298.666667v-42.666667z"
                  fill="#ffffff"
                  p-id="10162"
                ></path>
              </svg>
            </el-button>
            <el-button type="danger" size="mini">
              <svg
                t="1652615285881"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11087"
                width="16"
                height="16"
              >
                <path
                  d="M106.666667 213.333333h810.666666v42.666667H106.666667z"
                  fill="#ffffff"
                  p-id="11088"
                ></path>
                <path
                  d="M640 128v42.666667h42.666667V128c0-23.573333-19.093333-42.666667-42.538667-42.666667H383.872A42.496 42.496 0 0 0 341.333333 128v42.666667h42.666667V128h256z"
                  fill="#ffffff"
                  p-id="11089"
                ></path>
                <path
                  d="M213.333333 896V256H170.666667v639.957333C170.666667 919.552 189.653333 938.666667 213.376 938.666667h597.248C834.218667 938.666667 853.333333 919.68 853.333333 895.957333V256h-42.666666v640H213.333333z"
                  fill="#ffffff"
                  p-id="11090"
                ></path>
                <path
                  d="M320 341.333333h42.666667v384h-42.666667zM490.666667 341.333333h42.666666v384h-42.666666zM661.333333 341.333333h42.666667v384h-42.666667z"
                  fill="#ffffff"
                  p-id="11091"
                ></path>
              </svg>
            </el-button>
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
