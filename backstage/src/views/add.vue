<template>
  <div class="add">
    <my-title title1="商品管理" title2="添加商品"></my-title>
    <el-card class="mt">
      <!-- 提示条 -->
      <el-alert
        title="添加商品信息"
        type="info"
        show-icon
        center
        :closable="false"
      />
      <!-- 步骤条 -->
      <el-steps
        :active="active * 1"
        finish-status="success"
        class="mt"
        align-center
      >
        <el-step title="基本信息" />
        <el-step title="商品参数" />
        <el-step title="商品属性" />
        <el-step title="商品图片" />
        <el-step title="商品内容" />
        <el-step title="完成" />
      </el-steps>
      <!-- 大表单 -->
      <el-form class="mt" :model="ruleForm" :rules="ruleForm.rules">
        <!-- tab侧边标签 -->
        <el-tabs
          tab-position="left"
          class="demo-tabs"
          v-model="active"
          :before-leave="handleTab"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item
              label="商品价格"
              label-width="80px"
              prop="goods_price"
            >
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                placeholder="请选择商品分类"
                v-model="value"
                :options="options"
                :props="props"
                @change="handleChange"
              />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item
              v-for="item in manyData"
              :key="item.attr_id"
              :lable="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item1"
                  v-for="(item1, index) in item.attr_vals"
                  :key="index"
                />
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <el-form-item
              v-for="item in onlyData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片">
            <el-upload
              class="upload-demo"
              action="http://www.ysqorz.top:8888/api/private/v1/Upload"
              :headers="headers"
              :on-success="handlePreview"
              :on-remove="handleRemove"
              show-file-list
              list-type="picture"
            >
              <el-button type="primary">上传</el-button>
              <template #tip>
                <div class="el-upload__tip">最多上传图片大小为500kb</div>
              </template>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <QuillEditor theme="snow" ref="QuillEditorRef" />
            <el-button type="primary" @click="addCate" class="mt"
              >添加商品</el-button
            >
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import myTitle from "../components/myTitle.vue";
import { getDataApi, getListApi } from "../api/categoriesHttp";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { addGoodsCateApi } from "../api/goodsHttp";
export default {
  components: { myTitle },
  setup() {
    const QuillEditorRef = ref("QuillEditorRef");
    const router = useRouter();
    const data = reactive({
      active: 0,
      value: [], // 级联选择器的选中值
      options: [], // 级联选择器的数据
      props: {
        // 级联选择器的规则
        children: "children",
        label: "cat_name",
        value: "cat_id",
        expandTrigger: "hover",
      },
      manyData: [], // 动态参数
      onlyData: [], // 静态参数
      headers: {
        // 上传图片的响应头
        Authorization: localStorage.getItem("token"),
      },
    });
    const ruleForm = reactive({
      // 表单的各种数据
      goods_name: "",
      goods_cat: "",
      goods_price: 0,
      goods_number: 0,
      goods_weight: 0,
      goods_introduce: "",
      pics: [],
      attrs: [],
      rules: {
        // 验证
        goods_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
        ],
        goods_cat: [{ required: true, message: "请选择", trigger: "blur" }],
        goods_price: [
          { required: true, message: "请输入价格", trigger: "blur" },
        ],
        goods_weight: [
          { required: true, message: "请输入重量", trigger: "blur" },
        ],
        goods_number: [
          { required: true, message: "请输入数量", trigger: "blur" },
        ],
      },
    });
    // 级联选择器改变时的函数
    const handleChange = (val) => {};
    // 获取分类数据
    const getData = async () => {
      const res = await getDataApi();
      data.options = res;
    };
    // 点击侧边栏拦截的函数
    const handleTab = (newName, oldName) => {
      if (oldName === "0" || data.value.length !== 3) {
        if (!data.value.length) {
          ElMessage.error("请先选择商品分类");
          return false;
        }
        if (data.value.length !== 3) {
          ElMessage({
            message: "只能选择三级分类",
            type: "warning",
          });
          return false;
        }
      }
    };
    // 点击侧边栏切换的函数
    const handleTabClick = async () => {
      if (data.active === "1") {
        //   获取动态参数
        const res = await getListApi(data.value[data.value.length - 1]);
        res.forEach((item) => {
          //   console.log(item.attr_vals);
          item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : "";
        });
        data.manyData = res;
      } else if (data.active === "2") {
        //   获取静态参数
        const res = await getListApi(data.value[data.value.length - 1], "only");
        data.onlyData = res;
      }
    };
    // 上传图片成功的函数
    const handlePreview = (val) => {
      ruleForm.pics.push({ pic: val.data.tmp_path });
    };
    // 移除上传图片的函数
    const handleRemove = (val) => {
      let index = ruleForm.pics.findIndex(
        (item) => item.pic === val.response.data.tmp_path
      );
      ruleForm.pics.splice(index, 1);
    };
    // 添加商品
    const addCate = async () => {
      ruleForm.goods_cat = data.value.join(",");
      // 处理动态参数和静态参数
      const arr1 = data.manyData.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals ? item.attr_vals.join(",") : "",
        };
      });
      const arr2 = data.onlyData.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals,
        };
      });
      // console.log(arr1)
      ruleForm.attrs = [...arr1, ...arr2];
      // 发送添加请求
      console.log(QuillEditorRef.value.getText());
      ruleForm.goods_introduce = QuillEditorRef.value.getText();
      await addGoodsCateApi(ruleForm);
      router.push("/goods");
    };
    getData();
    return {
      ...toRefs(data),
      ruleForm,
      handleChange,
      handleTab,
      handleTabClick,
      handlePreview,
      handleRemove,
      addCate,
      QuillEditorRef,
    };
  },
};
</script>
<style lang="scss" scoped>
:deep(.el-step__title) {
  font-size: 12px;
}
:deep(.el-form-item) {
  flex-direction: column;
  .el-form-item__label {
    text-align: left;
  }
}
:deep(.ql-container) {
  height: 300px;
}
</style>
