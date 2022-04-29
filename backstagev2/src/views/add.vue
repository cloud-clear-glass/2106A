<template>
  <div class="container">
    <el-card class="mt">
      <!-- 消息提示 -->
      <el-alert
        class="mt"
        show-icon
        title="添加商品信息"
        type="info"
        center
        :closable="false"
      >
      </el-alert>
      <!-- 步骤条 -->
      <el-steps
        :active="active * 1"
        finish-status="success"
        class="mt"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- 表单 -->
      <el-form class="mt" :model="ruleForm" :rules="rules">
        <!-- tab切换 -->
        <el-tabs
          tab-position="left"
          v-model="active"
          :before-leave="handleTab"
          @tab-click="handleClick"
        >
          <el-tab-pane label="基本信息">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="ruleForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="ruleForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="ruleForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="ruleForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <!-- 联级选择器 -->
              <el-cascader
                v-model="value"
                :options="options"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id',
                  children: 'children'
                }"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <el-form-item
              v-for="item in manyData"
              :key="item.attr_id"
              :label="item.attr_name"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  :label="item1"
                  v-for="(item1, index) in item.attr_vals"
                  :key="index"
                ></el-checkbox>
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
              action="http://www.ysqorz.top:8888/api/private/v1/upload"
              :headers="headers"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handlesuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容">
            <template>
              <div class="edit_container">
                <quill-editor
                  v-model="ruleForm.goods_introduce"
                  ref="myQuillEditor"
                >
                </quill-editor>
              </div>
              <el-button type="primary" @click="addCate" class="mt"
                >添加商品</el-button
              >
            </template>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { getParamsApi, getmanyData, addGoodsCateApi } from '../api/goodsHttp'
export default {
  data() {
    return {
      active: '0',
      options: [], // 联级选择器的数据
      value: [], // 联级选择器的绑定数据
      manyData: [], // 动态参数
      onlyData: [], // 静态参数
      headers: {
        Authorization: sessionStorage.getItem('token')
      },
      ruleForm: {
        // 表单的各种数据
        goods_name: '',
        goods_cat: '',
        goods_price: 0,
        goods_number: 0,
        goods_weight: 0,
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      rules: {
        // 验证
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_cat: [{ required: true, message: '请选择', trigger: 'blur' }],
        goods_price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入数量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    editorOption() {
      // @blur="onEditorBlur($event)"
      //             @focus="onEditorFocus($event)"
      //             @change="onEditorChange($event)"
    },
    // 选中联级选择器
    handleChange() {
      if (this.value.length < 3) {
        Message({
          type: 'warning',
          message: '只能选中三级列表'
        })
      }
    },
    // 切换tab 拦截
    handleTab(newActive, oldActive) {
      if (oldActive === '0' && this.value.length !== 3) {
        Message({
          type: 'error',
          message: '请选择商品分类分类'
        })
        return false
      }
      if (this.value.length < 3) {
        return false
      }
    },
    // 点击tab时获取动态参数和静态参数
    async handleClick() {
      if (this.active === '1') {
        // 获取动态数据
        let id = this.value[this.value.length - 1]
        const res = await getmanyData(id)
        res.forEach((item) => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : ''
        })
        this.manyData = res
      } else if (this.active === '2') {
        // 获取静态数据
        let id = this.value[this.value.length - 1]
        const res = await getmanyData(id, 'only')
        console.log(res)
        this.onlyData = res
      }
    },
    // 获取商品分类数据
    async getParams() {
      const res = await getParamsApi()
      this.options = res
      // console.log(res)
    },
    handlePreview(val) {
      console.log(val)
    },
    // 删除图片文件
    handleRemove(val) {
      console.log(val)
      let index = this.ruleForm.pics.findIndex(
        (item) => item.pic === val.response.data.tmp_path
      )
      this.ruleForm.pics.splice(index, 1)
    },
    // 文件上传成功
    handlesuccess(res) {
      console.log(res)
      this.ruleForm.pics.push({ pic: res.data.tmp_path })
    },
    // 添加商品信息
    async addCate() {
      this.ruleForm.goods_cat = this.value.join(',')
      // 处理动态参数和静态参数
      const arr1 = this.manyData.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals ? item.attr_vals.join(',') : ''
        }
      })
      const arr2 = this.onlyData.map((item) => {
        return {
          attr_id: item.attr_id,
          attr_value: item.attr_vals
        }
      })
      // console.log(arr1)
      this.ruleForm.attrs = [...arr1, ...arr2]
      // 发送添加请求
      await addGoodsCateApi(this.ruleForm)
      this.$router.push('/goods')
    }
  },
  created() {
    this.getParams()
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-step__title {
  font-size: 12px;
}
::v-deep .ql-editor {
  height: 300px;
}
</style>
