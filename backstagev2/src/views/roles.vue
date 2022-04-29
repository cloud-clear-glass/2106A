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
            <div class="roles_box" v-if="props.row.children.length > 0">
              <el-row
                v-for="item1 in props.row.children"
                :key="item1.id"
                class="roles_box_top"
              >
                <el-col :span="4">
                  <el-tag
                    closable
                    effect="dark"
                    @close="removeRoles(props.row, item1.id)"
                  >
                    {{ item1.authName }}
                  </el-tag>
                </el-col>
                <el-col :span="20">
                  <el-row
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    class="roles_box2"
                  >
                    <el-col :span="4">
                      <el-tag
                        closable
                        type="success"
                        @close="removeRoles(props.row, item2.id)"
                      >
                        {{ item2.authName }}
                      </el-tag>
                    </el-col>
                    <el-col :span="20">
                      <el-tag
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        closable
                        type="warning"
                        @close="removeRoles(props.row, item3.id)"
                      >
                        {{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-else class="roles_box">该角色暂无权限</div>
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
    <el-dialog
      title="分配权限"
      :visible.sync="dialog"
      width="40%"
      :before-close="handleClose"
    >
      <el-tree
        ref="tree"
        default-expand-all
        :data="rightsData"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        :default-checked-keys="checkedArr"
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
  ADDRolesApi,
  removeApi
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
      editRoleseId: '', // 修改角色的id
      checkedArr: [] // 默认勾选的数组
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
      // console.log(res)
    },
    // 打开分配权限列表
    openTools(val) {
      // console.log(val)

      this.editRoleseId = val.id
      this.getChecked(val, this.checkedArr)
      this.dialog = true
    },
    // 获取默认选中的方法
    getChecked(val, arr) {
      // if (val.children) {
      //   val.children.forEach((item) => this.getChecked(item, arr))
      // } else {
      //   return arr.push(val.id)
      // }
      if (!val.children) {
        return arr.push(val.id)
      }
      val.children.forEach((item) => this.getChecked(item, arr))
    },
    // 修改分配权限
    async editRoles() {
      console.log(this.$refs.tree.getHalfCheckedKeys())

      // arr1全选中
      let arr1 = this.$refs.tree.getCheckedKeys()
      // arr2全选中
      let arr2 = this.$refs.tree.getHalfCheckedKeys()
      const res = await ADDRolesApi(this.editRoleseId, arr1, arr2)
      this.getData()
      this.dialog = false
    },
    // 关闭弹出框的回调
    handleClose() {
      this.checkedArr = []
      this.$nextTick(function () {
        // Dom更新完毕
        this.$refs.tree.setCheckedKeys([])
      })
      this.dialog = false
    },
    // 删除单个权限
    removeRoles(row, rightId) {
      MessageBox.alert('此操作将删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true
      })
        .then(async () => {
          const res = await removeApi(row.id, rightId)
          row.children = res
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },

  created() {
    this.getData()
    this.getRights()
  }
}
</script>

<style scoped lang="scss">
.roles_box_top {
  border: 1px solid #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-col {
    border-left: 1px solid #eee;
    &:first-child {
      border-left: 0px;
    }
  }
}

.roles_box2 {
  border-bottom: 0px !important;
  &:nth-of-type(2) {
    border-top: 1px solid #eee;
  }
}
.form_btn {
  display: flex;
  justify-content: flex-end;
}
.el-tag {
  margin: 8px;
}
.roles_box {
  padding: 20px 10px;
}
</style>
