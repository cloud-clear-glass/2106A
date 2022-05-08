<template>
  <div class="roles">
    <el-card class="mt">
      <el-row>
        <el-col>
          <el-button type="primary" @click="openadd">添加角色</el-button>
        </el-col>
      </el-row>
      <el-table class="mt" :data="tableData" border>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <div v-if="scope.row.children.length > 0" class="box">
              <el-row v-for="item in scope.row.children" :key="item.id">
                <el-col :span="4">
                  <el-tag
                    effect="dark"
                    :closable="true"
                    @close="removeItem(scope.row, item.id)"
                    >{{ item.authName }}</el-tag
                  >
                </el-col>
                <el-col :span="20">
                  <el-row v-for="item1 in item.children" :key="item1.id">
                    <el-col :span="4">
                      <el-tag
                        effect="dark"
                        :closable="true"
                        type="success"
                        @close="removeItem(scope.row, item1.id)"
                      >
                        {{ item1.authName }}
                      </el-tag>
                    </el-col>
                    <el-col :span="20">
                      <el-tag
                        effect="dark"
                        :closable="true"
                        type="warning"
                        @close="removeItem(scope.row, item2.id)"
                        v-for="(item2, index) in item1.children"
                        :key="index"
                      >
                        {{ item2.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div v-else class="box">该角色暂无权限</div>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="openEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete"
              @click="deleteRoles(scope.row)"
              >删除</el-button
            >
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-tools"
              @click="openrights(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加和编辑的弹出框 -->
    <el-dialog
      title="添加角色"
      width="40%"
      :visible.sync="dialogVisible"
      @close="close"
    >
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item prop="roleName" label="角色名称" label-width="80px">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item prop="roleDesc" label="角色描述" label-width="80px">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRolse">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      width="40%"
      :visible.sync="dialog"
      @close="close"
    >
      <!-- 树状结构 -->
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultArr"
        :props="defaultProps"
        ref="treeRef"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="addRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getroles } from '../api/http'
import {
  addRolesApi,
  editRolesApi,
  deleteRolesApi,
  getRightsApi,
  ADDRolesApi,
  removeApi
} from '../api/rolesHttp'
import { MessageBox, Message } from 'element-ui'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      ruleForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      flag: true, // 编辑和添加的状态
      editId: '', // 编辑的id
      dialog: false, // 分配状态的开关
      treeData: [], // 树状表的数据
      defaultArr: [], // 默认选择的
      defaultProps: {
        // 树状表的配置项
        label: 'authName',
        children: 'children'
      }
    }
  },
  methods: {
    //   获取数据
    async getData() {
      const res = await getroles()
      this.tableData = res
    },
    // 打开添加角色弹出框
    openadd() {
      this.flag = true
      this.dialogVisible = true
    },
    // 添加角色/编辑角色
    async addRolse() {
      if (this.flag) {
        await addRolesApi(this.ruleForm)
      } else {
        await editRolesApi(this.editId, this.ruleForm)
      }
      this.getData()
      this.dialogVisible = false
    },
    // 打开编辑
    openEdit(val) {
      console.log(val)
      this.editId = val.id
      this.ruleForm = JSON.parse(JSON.stringify(val))
      this.dialogVisible = true
      this.flag = false
    },
    // 关闭弹出框
    close() {
      this.ruleForm = {}
      this.defaultArr = []
    },
    // 删除
    deleteRoles(val) {
      this.editId = val.id
      MessageBox.alert('此操作将删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: 'true'
      })
        .then(async () => {
          await deleteRolesApi(this.editId)
          this.getData()
        })
        .catch(() => {
          Message('已取消删除')
        })
    },
    // 打开分配权限
    async openrights(val) {
      const res = await getRightsApi()
      this.treeData = res
      this.editId = val.id
      this.dialog = true
      this.getDefault(this.defaultArr, val)
    },
    // 获取默认权限
    getDefault(defaultArr, val) {
      if (!val.children) {
        return defaultArr.push(val.id)
      }
      val.children.forEach((item) => {
        this.getDefault(defaultArr, item)
      })
    },
    // 分配权限
    async addRights() {
      //   console.log(this.$refs.treeRef.getHalfCheckedKeys())
      //   console.log(this.$refs.treeRef.getCheckedKeys())
      let arr1 = this.$refs.treeRef.getHalfCheckedKeys()
      let arr2 = this.$refs.treeRef.getCheckedKeys()
      await ADDRolesApi(this.editId, arr1, arr2)
      this.dialog = false
      this.getData()
    },
    // 删除指定权限
    async removeItem(val, id) {
      const res = await removeApi(val.id, id)
      val.children = res
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.box {
  padding: 10px;
}
.el-tag {
  margin: 6px;
}
</style>
