<template>
  <div class="orders">
    <my-title title1="订单管理" title2="订单列表"></my-title>
    <el-card class="mt">
      <!-- 搜索 -->
      <el-row>
        <el-col :span="10">
          <el-input
            v-model="input3"
            placeholder="请输入订单编号"
            class="input-with-select"
            :clearable="true"
            @clear="clear"
          >
            <template #append>
              <el-button :icon="Search" @click="search" />
            </template>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table class="mt" border :data="tableData">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template #default="scope">
            <el-tag effect="dark" type="danger" v-if="scope.row.pay_status == 0"
              >未付款</el-tag
            >
            <el-tag effect="dark" type="success" v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template #default="scope">
            {{ time(scope.row.create_time * 1000) }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              circle
              :icon="EditPen"
              @click="dialogVisible = true"
            ></el-button>
            <el-button
              type="info"
              circle
              :icon="Location"
              @click="dialog = true"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt"
        v-model:currentPage="queryInfo.pagenum"
        v-model:page-size="queryInfo.pagesize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 修改地址 -->
    <el-dialog v-model="dialogVisible" title="修改地址" width="35%">
      <el-row>
        <el-col :span="4">省市区/县</el-col>
        <el-col :span="20">
          <el-cascader
            v-model="value"
            :options="city"
            :props="props"
            placeholder="请选择地区"
            width="100%"
          />
        </el-col>
      </el-row>
      <el-row class="mt">
        <el-col :span="4">详细地址</el-col>
        <el-col :span="20">
          <el-input v-model="input2"></el-input>
        </el-col>
      </el-row>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
    <!-- 物流进度 -->
    <el-dialog v-model="dialog" title="物流信息" width="35%">
      <el-timeline>
        <el-timeline-item
          v-for="(item, index) in res.data"
          :key="index"
          :timestamp="item.time"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="dialog = false">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import myTitle from "../components/myTitle.vue";
import { Search, EditPen, Location } from "@element-plus/icons-vue";
import { getOrdersApi } from "../api/ordersHttp";
import moment from "moment";
import city from "../assets/city";
import res from "../assets/res";
export default {
  components: { myTitle, Search, EditPen, Location },
  setup() {
    const data = reactive({
      input2: "",
      input3: "",
      queryInfo: {
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      tableData: [],
      dialogVisible: false,
      value: [],
      props: {
        expandTrigger: "hover",
        label: "label",
        value: "value",
      },
      city,
      res,
      dialog: false,
    });
    // 获取数据
    const getData = async () => {
      const res = await getOrdersApi(data.queryInfo);
      const { goods, total } = res;
      data.tableData = goods;
      data.total = total;
    };
    // 时间格式化
    const time = (val) => {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    };
    // 分页条数改变
    const handleSizeChange = (val) => {
      data.queryInfo.pagesize = val;
      getData();
    };
    // 分页页码改变
    const handleCurrentChange = (val) => {
      data.queryInfo.pagenum = val;
      getData();
    };
    // 搜索
    const search = () => {
      data.tableData = data.tableData.filter((item) =>
        item.order_number.includes(data.input3)
      );
    };
    // 清空input
    const clear = () => {
      getData();
    };
    getData();
    return {
      ...toRefs(data),
      Search,
      time,
      handleSizeChange,
      handleCurrentChange,
      EditPen,
      Location,
      search,
      clear,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-cascader) {
  width: 70%;
  .el-input {
    width: 100%;
  }
}
:deep(.el-input) {
  width: 70%;
}
</style>
