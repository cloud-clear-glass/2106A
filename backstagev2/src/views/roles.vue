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
            <el-button type="primary" size="mini" @click="openEdit(scope.row)"
              ><svg
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
                ></path></svg
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteRoles(scope.row)"
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
            <el-button
              type="warning"
              size="mini"
              @click="openrights(scope.row)"
            >
              <svg
                t="1652615408986"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="12724"
                width="16"
                height="16"
              >
                <path
                  d="M880.288 232.48L560.192 45.12a95.648 95.648 0 0 0-96.64 0L143.68 232.48A96.64 96.64 0 0 0 96 315.904v397.664c0 34.784 18.624 66.88 48.736 84l320 181.92a95.52 95.52 0 0 0 94.496 0l320-181.92A96.576 96.576 0 0 0 928 713.568V315.904a96.64 96.64 0 0 0-47.712-83.424zM864 713.568c0 11.584-6.208 22.304-16.256 28l-320 181.92a31.776 31.776 0 0 1-31.488 0l-320-181.92A32.192 32.192 0 0 1 160 713.568V315.904c0-11.456 6.048-22.048 15.904-27.808l319.872-187.36a31.84 31.84 0 0 1 32.192 0l320.128 187.392c9.856 5.728 15.904 16.32 15.904 27.776v397.664z"
                  p-id="12725"
                  fill="#ffffff"
                ></path>
                <path
                  d="M512 320a192 192 0 1 0 0 384 192 192 0 0 0 0-384z m0 320a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"
                  p-id="12726"
                  fill="#ffffff"
                ></path>
              </svg>
              分配权限</el-button
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
