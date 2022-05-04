<template>
  <div class="goods">
    <my-title title1="商品管理" title2="商品列表"></my-title>
    <el-card class="mt">
      <!-- 搜索和添加 -->
      <el-row :gutter="12">
        <el-col :span="8">
          <el-input
            v-model="quyerInfo.query"
            placeholder="请输入搜索内容"
            class="input-with-select"
            clearable
            @clear="search"
          >
            <template #append>
              <el-button @click="search"
                ><el-icon><search /></el-icon
              ></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="16">
          <el-button type="primary" @click="$router.push('/add')"
            >添加商品</el-button
          >
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" border class="mt">
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
        <el-table-column label="创建时间" width="180px">
          <template #default="scope">
            {{ time(scope.row.add_time * 1000) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px">
          <template #default="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="small"
              @click="openeditGoods(scope.row)"
              ><el-icon><edit-pen /></el-icon>编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              @click="deleteGoods(scope.row.goods_id)"
            >
              <el-icon><delete-filled /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:currentPage="quyerInfo.pagenum"
        v-model:page-size="quyerInfo.pagesize"
        :page-sizes="[10, 50, 150, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 编辑 -->
    <el-dialog v-model="dialogVisible" title="编辑商品" width="40%">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="商品名称" label-width="80px">
          <el-input v-model="ruleForm.goods_name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="商品价格"
          :disabled="true"
          prop="goods_price"
          label-width="80px"
        >
          <el-input v-model="ruleForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item
          label="商品重量"
          :disabled="true"
          prop="goods_weight"
          label-width="80px"
        >
          <el-input v-model="ruleForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed } from "vue";
import myTitle from "../components/myTitle.vue";
import { getDataApi, EditCateApi, deleteGoodsApi } from "../api/goodsHttp";
import moment from "moment";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: { myTitle },
  setup() {
    const data = reactive({
      tableData: [], // 商品数据
      quyerInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0, // 总数量
      dialogVisible: false,
      editId: "",
    });
    const ruleForm = reactive({
      // 表单的各种数据
      goods_name: "",
      goods_price: 0,
      goods_number: 0,
      goods_weight: 0,
      goods_introduce: "",
      pics: [],
      attrs: [],
    });
    const rules = reactive({
      // 验证
      goods_price: [{ required: true, message: "请输入价格", trigger: "blur" }],
      goods_weight: [
        { required: true, message: "请输入重量", trigger: "blur" },
      ],
    });
    // 获取商品列表
    const getData = async () => {
      const res = await getDataApi(data.quyerInfo);

      data.tableData = res.goods;
      data.total = res.total;
    };
    // 搜索
    const search = () => {
      getData();
    };
    // 时间格式化
    const time = (val) => {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    };
    // 分页条数改变
    const handleSizeChange = (val) => {
      data.quyerInfo.pagesize = val;
      getData();
    };
    // 分页页码改变
    const handleCurrentChange = (val) => {
      data.quyerInfo.pagenum = val;
      getData();
    };
    // 打开编辑
    const openeditGoods = (val) => {
      data.editId = val.goods_id;
      ruleForm.goods_name = val.goods_name;
      ruleForm.goods_price = val.goods_price;
      ruleForm.goods_number = val.goods_number;
      ruleForm.goods_weight = val.goods_weight;
      ruleForm.goods_introduce = val.goods_introduce;
      ruleForm.pics = val.pics;
      ruleForm.attrs = val.attrs;
      data.dialogVisible = true;
    };
    // 提交编辑
    const handleEdit = async () => {
      console.log(data.editId);
      await EditCateApi(data.editId, ruleForm);
      getData();
      data.dialogVisible = false;
    };
    // 删除
    const deleteGoods = (id) => {
      ElMessageBox.confirm("确认删除商品", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteGoodsApi(id);
          getData();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    getData();
    return {
      ...toRefs(data),
      time,
      handleSizeChange,
      handleCurrentChange,
      openeditGoods,
      ruleForm,
      rules,
      handleEdit,
      deleteGoods,
      search,
    };
  },
};
</script>
<style lang="scss" scoped></style>
