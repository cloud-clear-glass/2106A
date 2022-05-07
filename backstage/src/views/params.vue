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
              <el-button type="primary" :disabled="isDisabled"
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
            <el-table-column label="操作"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">静态属性</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, toRefs, nextTick } from "vue";
import myTitle from "../components/myTitle.vue";
import { getDataApi } from "../api/categoriesHttp";
import { ElMessage } from "element-plus";
import { getTableDataApi, addParamsApi } from "../api/params";
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
    const handleClick = () => {};
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
      console.log(val);
      nextTick(() => {
        InputRef._value.focus();
      });
    };
    // 添加子参数
    const handleInputConfirm = async (val) => {
      if (val.inputValue.length) {
        console.log(1);
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
    getData();
    return {
      ...toRefs(data),
      handleChange,
      handleClick,
      handleClose,
      showInput,
      handleInputConfirm,
      InputRef,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-tag {
  margin: 4px;
}
</style>
