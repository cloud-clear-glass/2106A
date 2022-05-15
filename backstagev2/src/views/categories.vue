<template>
  <div class="categories">
    <el-card class="mt">
      <el-button class="mt" type="primary" @click="addCate">添加分类</el-button>
      <el-table :data="tableData" border class="mt" row-key="cat_id">
        <el-table-column label="#" type="index">
          <template slot-scope="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="cat_name"> </el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <i
              class="el-icon-success"
              v-if="!scope.row.cat_deleted"
              style="color: #40c440"
            ></i>
            <i class="el-icon-error" v-else></i>
          </template>
        </el-table-column>
        <el-table-column label="排序">
          <template slot-scope="scope">
            <el-tag type="dark" v-if="scope.row.cat_level === 0">一级</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level === 1"
              >二级</el-tag
            >
            <el-tag type="warning" v-if="scope.row.cat_level === 2"
              >三级</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="openeditCate(scope.row)"
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
            <el-button type="danger" size="mini" @click="deleteCate(scope.row)">
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
    </el-card>
    <!-- 添加弹出框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="dialogVisible"
      width="40%"
      @close="close"
    >
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="ruleForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" label-width="80px">
          <!-- 级联选择器 -->
          <el-cascader
            v-model="value"
            :options="options"
            ref="cascaderRef"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
              children: 'children',
              checkStrictly: 'true'
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateGories">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的模态框 -->
    <el-dialog title="编辑分类" :visible.sync="dialog" width="40%">
      <el-form :model="editForm" :rules="rules">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="editCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getParamsApi } from '../api/goodsHttp'
import { MessageBox, Message } from 'element-ui'
import {
  getCateListApi,
  addCateGoriesApi,
  editCateApi,
  deleteCategoryApi
} from '../api/cateHttp'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false, // 添加的弹出框
      value: [], // 级联选择器的值
      options: [], // 级联选择器的数据
      ruleForm: {
        // 添加的数据
        cat_name: '',
        cat_level: 0
      },
      rules: {
        cat_name: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      // 编辑的数据
      editForm: {
        id: '',
        cat_name: ''
      },
      dialog: false // 编辑模态框的状态
    }
  },
  methods: {
    // 获取表格数据
    async getData() {
      const res = await getCateListApi()
      // console.log(res)
      res.forEach((item, index) => {
        item.index = index + 1
      })
      this.tableData = res
    },
    // 打开添加分类
    async addCate() {
      const res = await getParamsApi({ type: '2' })
      this.options = res
      this.dialogVisible = true
    },
    // 选择级联选择器的函数
    handleChange() {
      this.$refs.cascaderRef._self.dropDownVisible = false
      // console.log(this.$refs.cascaderRef._self.dropDownVisible)
    },
    // 添加分类
    async addCateGories() {
      if (this.value.length !== 0) {
        this.ruleForm.cat_pid = this.value[this.value.length - 1]
        this.ruleForm.cat_level = this.value.length
      } else {
        this.ruleForm.cat_pid = 0
        this.ruleForm.cat_level = 0
      }
      await addCateGoriesApi(this.ruleForm)
      this.getData()
      this.dialogVisible = false
    },
    // 打开编辑分类
    openeditCate(val) {
      this.dialog = true
      this.editForm.id = val.cat_id
      this.editForm.cat_name = val.cat_name
    },
    // 修改分类
    async editCate() {
      await editCateApi(this.editForm)
      this.getData()
      this.dialog = false
    },
    // 删除分类
    async deleteCate(val) {
      MessageBox.alert('此操作将删除权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true
      })
        .then(async () => {
          await deleteCategoryApi(val.cat_id)
          this.getData()
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭添加时清空数据
    close() {
      this.ruleForm = {}
      this.value = []
    }
  },
  created() {
    this.getData()
  }
}
</script>
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
<style scoped lang="scss"></style>
