<template>
  <div class="roles">
    <el-card class="mt">
      <!-- 搜索和添加 -->
      <div>
        <el-row :gutter="12">
          <el-col :span="10">
            <el-button type="primary" @click="open">添加角色</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        border
        class="mt"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-tag
              v-for="(item, index) in props.row.children"
              :key="index"
              closable
              effect="dark"
            >
              {{ item.authName }}
              <el-tag
                v-for="(it, i) in item.children"
                :key="i"
                closable
                effect="plain"
              >
                {{ it.authName }}
                <el-tag
                  v-for="(el, j) in it.children"
                  :key="j"
                  closable
                  effect="light"
                >
                  {{ el.authName }}
                </el-tag>
              </el-tag>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-s-tools"
              size="mini"
              @click="openTools(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户弹窗以及修改用户弹窗 二合一 -->
    <el-dialog
      :title="isRuleForm ? '编辑角色' : '添加角色'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        ref="ruleFormRef"
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
        <div class="form_btn">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handlesubmit">确 定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog title="分配权限" :visible.sync="dialog" width="40%">
      <el-tree
        ref="tree"
        default-expand-all
        :data="rightsData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { MessageBox, Message } from 'element-ui'
import { getroles } from '../api/http'
import {
  addRolesApi,
  editRolesApi,
  deleteRolesApi,
  getRightsApi,
  ADDRolesApi
} from '../api/rolesHttp'
export default {
  data() {
    return {
      tableData: [], // 角色列表信息
      isRuleForm: false,
      dialogVisible: false,
      ruleForm: {
        roleName: '', // 角色名称
        roleDesc: '' // 角色描述
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称,长度在 3 到 20 个字符',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        roleDesc: [
          {
            required: true,
            message: '请输入角色描述,长度在 3 到 20 个字符',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ]
      },
      editId: '', // 编辑的id
      dialog: false, // 分配权限模态框的状态
      rightsData: [], // 权限列表
      defaultProps: {
        // 树状图属性
        children: 'children',
        label: 'authName'
      },
      editRoleseId: '' // 修改角色的id
    }
  },
  methods: {
    // 获取角色列表信息
    async getData() {
      const res = await getroles()
      this.tableData = res
      // console.log(res)
    },
    // 打开添加角色模态框
    open() {
      this.dialogVisible = true
      this.isRuleForm = false
      this.ruleForm = {
        roleName: '',
        roleDesc: ''
      }
    },
    // 添加角色或修改
    async handlesubmit() {
      if (this.isRuleForm === false) {
        this.$refs.ruleFormRef.validate(async (valid) => {
          if (!valid) return false
          await addRolesApi(this.ruleForm)
          this.getData()
          this.dialogVisible = false
        })
      } else {
        await editRolesApi({
          id: this.id,
          roleName: this.ruleForm.roleName,
          roleDesc: this.ruleForm.roleDesc
        })
        this.dialogVisible = false
        this.ruleForm = {
          roleName: '',
          roleDesc: ''
        }
      }
    },
    // 打开编辑页面
    handleEdit(row) {
      this.isRuleForm = true
      this.dialogVisible = true
      this.ruleForm = row
      this.id = row.id
    },
    // 删除角色
    handleDelete(val) {
      MessageBox.alert('此操作将删除角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true
      })
        .then(async () => {
          await deleteRolesApi(val.id)
          this.getData()
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取角色权限
    async getRights() {
      const res = await getRightsApi()
      this.rightsData = res
      console.log(res)
    },
    // 打开分配权限列表
    openTools(val) {
      console.log(val)
      this.dialog = true
      this.editRoleseId = val.id
    },
    // 修改分配权限
    async editRoles() {
      console.log(this.$refs.tree.getHalfCheckedKeys())

      // arr1全选中
      let arr1 = this.$refs.tree.getCheckedKeys()
      // arr2全选中
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      const res = await ADDRolesApi(this.editRoleseId, arr1, arr2)
      this.dialog = false
      this.getData()
    }
  },

  created() {
    this.getData()
    this.getRights()
  }
}
</script>

<style scoped lang="scss">
.form_btn {
  display: flex;
  justify-content: flex-end;
}
</style>
