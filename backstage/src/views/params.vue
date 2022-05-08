<template>
  <div class="params">
    <my-title title1="商品管理" title2="分类参数"></my-title>
    <el-card class="mt">
      <!-- 提示 -->
      <el-alert
        title="注意:只允许为第三级分类设置相关参数"
        type="warning"
        center
        show-icon
        :closable="false"
      >
      </el-alert>
      <!-- 选择分类 -->
      <el-row class="mt">
        <el-col :span="3">选择商品分类：</el-col>
        <el-col :span="21">
          <!-- 级联选择器 -->
          <el-cascader
            placeholder="请选择商品分类"
            v-model="value"
            :options="options"
            :props="{
              expandTrigger: 'hover',
              children: 'children',
              label: 'cat_name',
              value: 'cat_id',
            }"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab切换 -->
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数 -->
          <el-row>
            <el-col>
              <el-button type="primary" :disabled="isDisabled" @click="openadd"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <!-- 表格 -->
          <el-table :data="tableData" border class="mt" row-key="attr_id">
            <el-table-column type="expand">
              <template #default="scope">
                <!-- 动态编辑tag -->
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  class="mx-1"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  v-if="scope.row.inputVisible"
                  ref="InputRef"
                  v-model="scope.row.inputValue"
                  class="ml-1 w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                  style="width: 90px"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput(scope.row)"
                >
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="openEdit(scope.row)"
                  ><el-icon><edit-pen /></el-icon>编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteParams(scope.row)"
                  ><el-icon><delete /></el-icon>删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <!-- 添加参数 -->
          <el-row>
            <el-col>
              <el-button type="primary" :disabled="isDisabled" @click="openadd1"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <!-- 表格 -->
          <el-table :data="tableData" border class="mt" row-key="attr_id">
            <el-table-column type="expand">
              <template #default="scope">
                <!-- 动态编辑tag -->
                <el-tag
                  v-for="(item, index) in scope.row.attr_vals"
                  :key="index"
                  class="mx-1"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  v-if="scope.row.inputVisible"
                  ref="InputRef"
                  v-model="scope.row.inputValue"
                  class="ml-1 w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                  style="width: 90px"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  @click="showInput(scope.row)"
                >
                  + New Tag
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="openEdit1(scope.row)"
                  ><el-icon><edit-pen /></el-icon>编辑</el-button
                >
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteParams(scope.row)"
                  ><el-icon><delete /></el-icon>删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加和编辑的弹出框 -->
    <el-dialog
      v-model="dialogVisible"
      :title="title1"
      width="30%"
      @close="close"
    >
      <el-form :model="ruleForm" :rules="ruleForm.rules">
        <el-form-item :label="title2" lable-width="100px" prop="attr_name">
          <el-input v-model="ruleForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addParams">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs, nextTick } from "vue";
import myTitle from "../components/myTitle.vue";
import { getDataApi } from "../api/categoriesHttp";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getTableDataApi,
  addParamsApi,
  addParamManysApi,
  editParamsApi,
  deleteParamsApi,
} from "../api/params";
export default {
  components: { myTitle },
  setup() {
    const InputRef = ref("InputRef");
    const data = reactive({
      value: [],
      options: [],
      activeName: "many",
      tableData: [],
      isDisabled: false,
      inputValue: "", //tag的input绑定
      inputVisible: false, // tag绑定的input是否显示
      title1: "",
      title2: "",
      dialogVisible: false,
      editId: "",
      vals: "",
      isEdit: false,
    });
    const ruleForm = reactive({
      attr_name: "",
      rules: {
        attr_name: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    });
    // 点击级联选择器改变的事件
    const handleChange = async () => {
      if (data.value.length !== 3) {
        ElMessage.error("请选择三级分类");
        data.value = [];
        data.isDisabled = true;
        data.tableData = [];
        return;
      }
      if (data.activeName === "many") {
        const res = await getTableDataApi(data.value[data.value.length - 1]);
        data.tableData = res;
        data.isDisabled = false;
        res.forEach((item) => {
          item.inputValue = data.inputValue;
          item.inputVisible = data.inputVisible;
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
      } else {
        const res = await getTableDataApi(
          data.value[data.value.length - 1],
          "only"
        );
        data.tableData = res;
        data.isDisabled = false;
        res.forEach((item) => {
          item.inputValue = data.inputValue;
          item.inputVisible = data.inputVisible;
          item.attr_vals =
            item.attr_vals.length > 0 ? item.attr_vals.split(",") : [];
        });
      }
    };
    // 获取级联选择器数据
    const getData = async () => {
      const res = await getDataApi();
      data.isDisabled = true;
      data.tableData = [];
      data.options = res;
    };
    // 切换tab栏
    const handleClick = () => {
      handleChange();
    };
    // 关闭tag时
    const handleClose = async (val, index) => {
      val.attr_vals.splice(index, 1);
      await addParamsApi(
        data.value[data.value.length - 1],
        val.attr_id,
        val.attr_name,
        data.activeName,
        val.attr_vals.join(",")
      );
    };
    // 显示input
    const showInput = (val) => {
      val.inputVisible = true;
      nextTick(() => {
        InputRef._value.focus();
      });
    };
    // 添加子参数
    const handleInputConfirm = async (val) => {
      if (val.inputValue.length) {
        val.attr_vals.push(val.inputValue);
        await addParamsApi(
          data.value[data.value.length - 1],
          val.attr_id,
          val.attr_name,
          data.activeName,
          val.attr_vals.join(",")
        );
      }
      handleChange();
      val.inputVisible = false;
      val.inputValue = "";
    };
    // 打开添加动态参数
    const openadd = () => {
      data.isEdit = true;
      data.title1 = "添加动态参数";
      data.title2 = "动态参数";
      data.dialogVisible = true;
    };
    // 打开添加静态属性
    const openadd1 = () => {
      data.isEdit = true;
      data.title1 = "添加静态属性";
      data.title2 = "静态属性";
      data.dialogVisible = true;
    };
    // 添加动态参数
    const addParams = async () => {
      if (data.isEdit) {
        await addParamManysApi(
          data.value[data.value.length - 1],
          ruleForm.attr_name,
          data.activeName,
          ""
        );
      } else {
        await editParamsApi(
          data.value[data.value.length - 1],
          data.editId,
          ruleForm.attr_name,
          data.activeName,
          data.vals
        );
      }
      handleChange();
      data.dialogVisible = false;
    };
    // 关闭弹框
    const close = () => {
      ruleForm.attr_name = "";
    };
    // 打开动态参数编辑
    const openEdit = (val) => {
      data.isEdit = false;
      data.title1 = "编辑动态参数";
      ruleForm.attr_name = val.attr_name;
      data.editId = val.attr_id;
      data.vals = val.attr_vals.join(",");
      data.dialogVisible = true;
    };
    // 打开静态属性编辑
    const openEdit1 = (val) => {
      data.isEdit = false;
      data.title1 = "编辑静态属性";
      ruleForm.attr_name = val.attr_name;
      data.editId = val.attr_id;
      data.vals = val.attr_vals.join(",");
      data.dialogVisible = true;
    };
    // 删除
    const deleteParams = (val) => {
      ElMessageBox.confirm("确认删除参数", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteParamsApi(data.value[data.value.length - 1], val.attr_id);
          handleChange();
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
      handleClick,
      handleClose,
      showInput,
      handleInputConfirm,
      InputRef,
      ruleForm,
      openadd,
      addParams,
      close,
      openEdit,
      deleteParams,
      openadd1,
      openEdit1,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 4px;
}
</style>
