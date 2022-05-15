<template>
  <div class="params">
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
        </el-col>
      </el-row>
      <!-- tab切换 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-row>
            <el-col>
              <el-button type="primary" :disabled="isFlag" @click="handleBtn"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <el-table :data="tableData" border class="mt">
            <el-table-column type="expand">
              <!-- 标签 -->
              <template slot-scope="scope">
                <el-tag
                  :key="index"
                  v-for="(item, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="openEdit(scope.row)"
                >
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
                  编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="handleDelete(scope.row)"
                >
                  <svg
                    t="1652615285881"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11087"
                    width="16"
                    height="16"
                  >
                    <path
                      d="M106.666667 213.333333h810.666666v42.666667H106.666667z"
                      fill="#ffffff"
                      p-id="11088"
                    ></path>
                    <path
                      d="M640 128v42.666667h42.666667V128c0-23.573333-19.093333-42.666667-42.538667-42.666667H383.872A42.496 42.496 0 0 0 341.333333 128v42.666667h42.666667V128h256z"
                      fill="#ffffff"
                      p-id="11089"
                    ></path>
                    <path
                      d="M213.333333 896V256H170.666667v639.957333C170.666667 919.552 189.653333 938.666667 213.376 938.666667h597.248C834.218667 938.666667 853.333333 919.68 853.333333 895.957333V256h-42.666666v640H213.333333z"
                      fill="#ffffff"
                      p-id="11090"
                    ></path>
                    <path
                      d="M320 341.333333h42.666667v384h-42.666667zM490.666667 341.333333h42.666666v384h-42.666666zM661.333333 341.333333h42.666667v384h-42.666667z"
                      fill="#ffffff"
                      p-id="11091"
                    ></path>
                  </svg>
                  删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-row>
            <el-col>
              <el-button type="primary" :disabled="isFlag" @click="handleBtn1"
                >添加参数</el-button
              >
            </el-col>
          </el-row>
          <el-table :data="tableData" border class="mt">
            <el-table-column type="expand">
              <!-- 标签 -->
              <template slot-scope="scope">
                <el-tag
                  :key="index"
                  v-for="(item, index) in scope.row.attr_vals"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(scope.row, index)"
                >
                  {{ item }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="scope.row.inputVisible"
                  v-model="scope.row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(scope.row)"
                  @blur="handleInputConfirm(scope.row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(scope.row)"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-edit"
                  @click="openEdit1(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加及编辑的弹出框 -->
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      @close="close"
    >
      <!-- 表单 -->
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item :label="title" label-width="120px" prop="attr_name">
          <el-input v-model="ruleForm.attr_name" style="width: 100%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParmas">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getParamsApi,
  getmanyData,
  editcategoriesApi,
  addcategoriesApi,
  handleDeleteApi
} from '../api/goodsHttp'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      value: [], // 级联选择器存储的id
      options: [], // 级联选择器的数据
      activeName: 'many', // tab切换的name
      tableData: [], // 表格动态参数的数据
      inputVisible: false, // 是否显示输入框
      inputValue: '', // input双向绑定
      dialogVisible: false,
      isDialog: 0,
      title: '',
      ruleForm: {
        attr_name: ''
      },
      rules: {
        attr_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      editId: '',
      editVals: []
    }
  },
  methods: {
    // 点击级联选择器的函数
    async handleChange() {
      if (this.value.length !== 3) {
        Message.error('请选择到三级分类')
        this.value = []
        this.tableData = []
        return false
      }
      if (this.activeName === 'many') {
        this.tableData = []
        const res = await getmanyData(this.value[this.value.length - 1])
        res.forEach((item, index) => {
          item.inputVisible = this.inputVisible
          item.inputValue = this.inputValue
          item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        })
        this.tableData = res
      } else {
        this.tableData = []
        const res = await getmanyData(this.value[this.value.length - 1], 'only')
        res.forEach((item, index) => {
          item.inputVisible = this.inputVisible
          item.inputValue = this.inputValue
          item.attr_vals = item.attr_vals ? item.attr_vals.split(',') : []
        })
        this.tableData = res
      }
    },
    // 获取商品分类参数
    async getParamsData() {
      const res = await getParamsApi()
      this.options = res
    },
    // 切换tab
    handleClick() {
      this.handleChange()
    },
    // 删除动态参数子参数
    async handleClose(val, index) {
      console.log(index)
      val.attr_vals.splice(index, 1)
      await editcategoriesApi(
        this.value[this.value.length - 1],
        val.attr_id,
        val.attr_name,
        this.activeName,
        val.attr_vals.join(',')
      )
    },
    // 编辑提交参数
    async handleInputConfirm(val) {
      if (val.inputValue.trim().length > 0) {
        val.attr_vals.push(val.inputValue)
        await editcategoriesApi(
          this.value[this.value.length - 1],
          val.attr_id,
          val.attr_name,
          this.activeName,
          val.attr_vals.join(',')
        )
      }
      val.inputValue = ''
      val.inputVisible = false
    },
    // 显示input
    showInput(val) {
      val.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 关闭弹出框
    close() {
      this.dialogVisible = false
      this.ruleForm = {}
    },
    // 打开动态参数弹出框
    handleBtn() {
      this.isDialog = 1
      this.title = '添加动态参数'
      this.dialogVisible = true
    },
    // 打开添加静态属性弹出框
    handleBtn1() {
      this.title = '添加静态属性'
      this.isDialog = 1
      this.dialogVisible = true
    },
    // 添加和编辑
    async addParmas() {
      // 添加分类
      if (this.isDialog === 1) {
        await addcategoriesApi(this.value[this.value.length - 1], {
          attr_name: this.ruleForm.attr_name,
          attr_sel: this.activeName,
          attr_vals: ''
        })
        this.ruleForm = {}
        this.handleChange()
        this.dialogVisible = false
      }
      // 编辑动态参数
      if (this.isDialog === 2) {
        await editcategoriesApi(
          this.value[this.value.length - 1],
          this.editId,
          this.ruleForm.attr_name,
          this.activeName,
          this.editVals.join(',')
        )
        this.ruleForm = {}
        this.handleChange()
        this.dialogVisible = false
      }
    },
    // 打开编辑动态分类参数
    openEdit(row) {
      this.ruleForm = row
      this.ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
      this.editId = row.attr_id
      this.editVals = row.attr_vals
      this.isDialog = 2
      this.title = '编辑动态参数'
      this.dialogVisible = true
    },
    // 打开编辑静态属性
    openEdit1(row) {
      this.ruleForm = row
      this.ruleForm = JSON.parse(JSON.stringify(this.ruleForm))
      this.editId = row.attr_id
      this.editVals = row.attr_vals
      this.isDialog = 2
      this.title = '编辑静态属性'
      this.dialogVisible = true
    },
    // 删除动态参数
    async handleDelete(val) {
      await handleDeleteApi(this.value[this.value.length - 1], val.attr_id)
      this.handleChange()
    }
  },
  computed: {
    isFlag() {
      return this.value.length !== 3
    }
  },
  created() {
    this.getParamsData()
  }
}
</script>

<style scoped lang="scss">
.el-input {
  width: 90px;
}
.el-tag {
  margin: 4px;
}
</style>
