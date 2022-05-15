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
            <el-button type="primary" size="mini" circle @click="openCity">
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
            <el-button type="success" size="mini" circle @click="dialog = true">
              <svg
                t="1652615472261"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="13702"
                width="16"
                height="16"
              >
                <path
                  d="M511.998977 65.290005c-173.638689 0-314.904063 138.294716-314.904063 308.281225 0 77.603449 31.020504 185.005574 85.10633 294.67023 53.746088 108.971877 124.852566 209.287607 195.185424 275.377838 8.955976 9.602705 21.51092 15.08865 34.612309 15.08865 12.913101 0 25.359574-5.358031 34.296107-14.736633 149.549038-140.014894 280.608979-406.358985 280.608979-570.401108C826.904063 203.584722 685.637666 65.290005 511.998977 65.290005zM517.467525 914.127613l-1.128707 1.13894c-0.816598 0.8913-2.232854 1.952468-4.339842 1.952468-2.245134 0-3.695159-1.251503-4.361331-1.997494l-1.294482-1.327228C366.207519 782.579555 238.584863 525.041014 238.584863 373.572254c0-147.109476 122.652458-266.791276 273.414113-266.791276 150.761656 0 273.415137 119.6818 273.415137 266.791276C785.414113 525.483082 657.700383 783.130094 517.467525 914.127613z"
                  p-id="13703"
                  fill="#ffffff"
                ></path>
                <path
                  d="M513.044796 181.616384c-91.091648 0-165.199483 74.112951-165.199483 165.210739 0 91.076298 74.107835 165.172877 165.199483 165.172877 91.083461 0 165.184133-74.096579 165.184133-165.172877C678.228929 255.729336 604.128257 181.616384 513.044796 181.616384zM513.044796 470.51005c-68.213591 0-123.709533-55.484685-123.709533-123.682927 0-68.219731 55.495942-123.720789 123.709533-123.720789 68.205405 0 123.694183 55.501058 123.694183 123.720789C636.738979 415.025365 581.2502 470.51005 513.044796 470.51005z"
                  p-id="13704"
                  fill="#ffffff"
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
