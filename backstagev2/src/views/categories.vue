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
              icon="el-icon-edit"
              @click="openeditCate(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteCate(scope.row)"
              >删除</el-button
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
