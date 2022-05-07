<template>
  <div class="categories">
    <my-title title1="用户管理" title2="用户列表"></my-title>
    <el-card class="mt">
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary" @click="getOptions">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table
        class="mt"
        :data="tableData"
        border
        row-key="cat_id"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column label="#">
          <template #default="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"></el-table-column>
        <el-table-column label="是否有效">
          <template #default="scope">
            <!-- cat_deleted -->
            <el-icon style="color: #38ca38" v-if="!scope.row.cat_deleted"
              ><circle-check-filled
            /></el-icon>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template #default="scope">
            <el-tag effect="dark" v-if="scope.row.cat_level == 0">一级</el-tag>
            <el-tag effect="dark" v-if="scope.row.cat_level == 1" type="success"
              >二级</el-tag
            >
            <el-tag effect="dark" v-if="scope.row.cat_level == 2" type="warning"
              >三级</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="small"
              @click="openeditCate(scope.row)"
              ><el-icon><edit-pen /></el-icon>编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              @click="deleteCate(scope.row.cat_id)"
            >
              <el-icon><delete-filled /></el-icon>删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加的弹出框 -->
    <el-dialog
      title="添加商品分类"
      v-model="dialogVisible"
      width="40%"
      @close="handleClose"
    >
      <el-form :model="ruleForm" :rules="ruleForm.rules">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" label-width="80px">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="value"
            :options="options"
            ref="cascaderRef"
            placeholder="请选择商品分类"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
              children: 'children',
              checkStrictly: 'true',
            }"
            @change="handleChange"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 编辑的弹出框 -->
    <el-dialog
      title="添加商品分类"
      v-model="dialog"
      width="40%"
      @close="handleEditClose"
    >
      <el-form :model="ruleForm" :rules="ruleForm.rules">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="handleEditCate">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import myTitle from "../components/myTitle.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getDataApi,
  getOptionsApi,
  addCateApi,
  handleEditApi,
  deleteCateApi,
} from "../api/categoriesHttp";
export default {
  components: { myTitle },
  setup() {
    const cascaderRef = ref("cascaderRef");
    const data = reactive({
      tableData: [],
      dialogVisible: false,
      value: [], // 级联选择器存储的id
      options: [], // 级联选择器的数据
      editId: "",
      dialog: false,
    });
    const ruleForm = reactive({
      cat_name: "",
      rules: {
        cat_name: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    });
    // 获取数据
    const getData = async () => {
      const res = await getDataApi();
      res.forEach((item, index) => {
        return (item.index = index + 1);
      });
      data.tableData = res;
    };
    // 级联选择器的函数
    const handleChange = () => {
      cascaderRef._value.popperVisible = false;
    };
    // 获取权限数据
    const getOptions = async () => {
      const res = await getOptionsApi();
      data.options = res;
      data.dialogVisible = true;
    };
    // 添加分类
    const handleEdit = async () => {
      if (ruleForm.cat_name == "") return;
      if (data.value.length == 0) {
        await addCateApi(0, ruleForm.cat_name, 0);
        data.dialogVisible = false;
        getData();
      }
      if (data.value.length != 0) {
        await addCateApi(
          data.value[data.value.length - 1],
          ruleForm.cat_name,
          data.value.length
        );
        data.dialogVisible = false;
        getData();
      }
    };
    // 关闭添加弹出框
    const handleClose = () => {
      ruleForm.cat_name = "";
      data.value = [];
    };
    // 打开编辑弹出框
    const openeditCate = (val) => {
      data.editId = val.cat_id;
      ruleForm.cat_name = val.cat_name;
      data.dialog = true;
    };
    // 确定编辑
    const handleEditCate = async () => {
      await handleEditApi(data.editId, ruleForm.cat_name);
      getData();
      data.dialog = false;
    };
    // 关闭编辑弹出框
    const handleEditClose = () => {
      ruleForm.cat_name = "";
      data.editId = "";
    };
    // 删除
    const deleteCate = (id) => {
      ElMessageBox.confirm("确认删除分类", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteCateApi(id);
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
      handleChange,
      getOptions,
      cascaderRef,
      handleEdit,
      handleClose,
      ruleForm,
      openeditCate,
      handleEditCate,
      handleEditClose,
      deleteCate,
    };
  },
};
</script>
<style lang="scss" scoped></style>
<style>
.el-radio {
  position: absolute;
  width: 88%;
  height: 25px;
}
.el-radio__input {
  display: none;
}
</style>
