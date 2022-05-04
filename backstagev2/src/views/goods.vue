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
    <el-dialog
      title="编辑商品"
      :visible.sync="dialogVisible"
      width="40%"
      @close="close"
    >
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="商品名称" label-width="80px" prop="goods_name">
          <el-input v-model="ruleForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" label-width="80px" prop="goods_price">
          <el-input v-model="ruleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" label-width="80px" prop="goods_weight">
          <el-input v-model="ruleForm.goods_weight"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" label-width="80px" prop="goods_number">
          <el-input v-model="ruleForm.goods_number"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsData, eiditGoodsApi, deleteGoodsApi } from '../api/goodsHttp'
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
      total: 100,
      ruleForm: {
        goods_name: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0
      },
      rules: {
        goods_name: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_price: [{ required: true, message: '不能为空', trigger: 'blur' }],
        goods_number: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        goods_weight: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      editId: 0
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
    },
    // 打开修改商品
    handleEdit(val) {
      this.dialogVisible = true
      this.editId = val.goods_id
      // this.ruleForm.goods_name = val.goods_name
      // this.ruleForm.goods_price = val.goods_price
      // this.ruleForm.goods_number = val.goods_number
      // this.ruleForm.goods_weight = val.goods_weight
      this.ruleForm = val
    },
    // 提交修改商品
    async editGoods() {
      await eiditGoodsApi(this.editId, this.ruleForm)
    },
    // 关闭修改弹出框
    close() {
      this.ruleForm = {}
    },
    // 删除
    async handleDelete(val) {
      await deleteGoodsApi(val.goods_id)
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style scoped lang="scss"></style>
