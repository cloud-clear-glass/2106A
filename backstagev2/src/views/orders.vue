<template>
  <div class="orders">
    <el-card class="mt">
      <!-- 搜索 -->
      <el-row>
        <el-col :span="10">
          <el-input
            placeholder="请输入内容"
            v-model="quyerInfo.quyer"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table border class="mt" :data="tableData">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.pay_status === '0'">
              未付款
            </el-tag>
            <el-tag v-else type="success">已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{ (scope.row.create_time * 1000) | data }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 修改地址 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              circle
              @click="openCity"
            ></el-button>
            <el-button
              type="success"
              size="mini"
              icon="el-icon-location-outline"
              circle
              @click="dialog = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="quyerInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="quyerInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 修改地址的弹出框 -->
    <el-dialog
      title="编辑地址"
      :visible.sync="dialogVisible"
      width="30%"
      @close="close"
    >
      <el-form :model="ruleForm">
        <el-form-item label="省市县/区" lable-width="120px">
          <el-cascader
            :options="city"
            :props="{ expandTrigger: 'hover', label: 'label', value: 'value' }"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" lable-width="120px">
          <el-input v-model="ruleForm.value"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 地址 -->
    <el-dialog
      title="快递地址"
      :visible.sync="dialog"
      width="30%"
      @close="close"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in timeData"
          :key="index"
          :timestamp="item.time"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOdersDataApi } from '../api/ordersHttp'
import time from '../assets/data'
import city from '../assets/city'
export default {
  data() {
    return {
      city,
      quyerInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialog: false,
      ruleForm: {
        value: ''
      },
      timeData: []
    }
  },
  methods: {
    // 每页条数改变时
    handleSizeChange(val) {
      this.quyerInfo.pagesize = val
      this.getData()
    },
    // 每页页码改变
    handleCurrentChange(val) {
      this.quyerInfo.pagenum = val
      this.getData()
    },
    // 获取数据
    async getData() {
      const res = await getOdersDataApi(this.quyerInfo)
      this.tableData = res.goods
      this.total = res.total
      this.timeData = time[0].data
    },
    // 搜索
    search() {
      this.getData()
    },
    // 打开修改地址
    openCity() {
      this.dialogVisible = true
    },
    // 关闭弹出框
    close() {}
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.el-input {
  width: 50%;
}
</style>
