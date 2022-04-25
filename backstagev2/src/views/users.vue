<template>
  <div class="container">
    <el-card>
      <!-- 搜索和添加 -->
      <div style="margin-top: 15px">
        <el-row :gutter="12">
          <el-col :span="8">
            <el-input
              clearable
              @clear="search"
              placeholder="请输入内容"
              v-model="queryInfo.query"
              class="input-with-select"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search"
              ></el-button>
            </el-input>
          </el-col>
          <el-col :span="10">
            <el-button type="primary" @click="open">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <div class="mt">
        <el-table border :data="tableData">
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="角色" prop="role_name"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="handleSatus(scope.row)"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-s-tools"
                size="mini"
                @click="openTools(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页器 -->
      <div class="mt">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 4, 6, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
      <div>
        <!-- 添加用户弹窗已经修改用户弹窗 二合一 -->
        <el-dialog
          :title="isRuleForm ? '添加用户' : '编辑用户'"
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
            <el-form-item label="用户名" label-width="100px" prop="username">
              <el-input
                v-model="ruleForm.username"
                :disabled="isRuleForm == false"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              label-width="100px"
              prop="password"
              v-if="isRuleForm"
            >
              <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="100px" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <div class="form_btn">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="handlesubmit">确 定</el-button>
            </div>
          </el-form>
        </el-dialog>
      </div>
      <!-- 分配角色 -->
      <el-dialog title="分配角色" :visible.sync="dialog" width="40%">
        <p>当前的用户：{{ tools.name }}</p>
        <p>当前的角色：{{ tools.role_name }}</p>
        <p>
          分配新角色：<el-select v-model="value" placeholder="请选择">
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item, index) in rolesData"
              :key="index"
            >
            </el-option>
          </el-select>
        </p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary" @click="handlesubmitTools">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getusers,
  submitUser,
  handleStatusApi,
  handleEditApi,
  handleDeleteApi,
  getroles,
  handlesubmitToolsApi
} from '../api/http'
export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      tableData: [], // 表格的数据
      total: 0,
      isSearch: false,
      dialogVisible: false, // 添加用户弹窗
      ruleForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名,长度在 3 到 20 个字符',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码,长度在 3 到 20 个字符',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          {
            required: true,
            message: '请输入邮箱,长度在 3 到 20 个字符',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 20,
            message: '长度在 3 到 20 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '请输入手机号,长度在 3 到 20 个字符',
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
      isRuleForm: false,
      editId: 0,
      dialog: false, // 分配角色的对话框状态
      tools: {
        name: '',
        role_name: '',
        id: ''
      },
      rolesData: [], // 角色信息
      value: ''
    }
  },
  methods: {
    // 获取表格信息
    async getData() {
      const res = await getusers(this.queryInfo)
      // console.log(res)
      const { total, pagenum, users } = res
      this.tableData = users
      this.total = total
      this.queryInfo.pagenum = pagenum
      this.isSearch = true
    },
    // 分页选几条一页
    handleSizeChange(val) {
      // console.log(val)
      this.queryInfo.pagesize = val
      this.getData()
    },
    // 分页当前页码
    handleCurrentChange(val) {
      // console.log(val)
      this.queryInfo.pagenum = val
      this.getData()
    },
    // 搜索
    search() {
      if (this.isSearch) {
        const time = setTimeout(() => {
          this.getData()
          clearTimeout(time)
        }, 1000)
        this.isSearch = false
      }
    },
    // 点击添加 以及点击编辑
    async handlesubmit() {
      if (this.isRuleForm) {
        this.$refs.ruleFormRef.validate(async (valid) => {
          if (!valid) return false
          const res = await submitUser(this.ruleForm)
          this.dialogVisible = false
          this.getData()
        })
      } else {
        // 编辑
        const res = await handleEditApi({
          id: this.editId,
          email: this.ruleForm.email,
          mobile: this.ruleForm.mobile
        })
        this.dialogVisible = false
        this.getData()
        this.ruleForm = {
          username: '',
          password: '',
          email: '',
          mobile: ''
        }
      }
    },
    // 点击改变状态
    async handleSatus(val) {
      const res = await handleStatusApi(val)
    },
    // 打开添加用户
    open() {
      this.dialogVisible = true
      this.isRuleForm = true
    },
    // 编辑用户
    handleEdit(val) {
      // console.log(val)
      this.dialogVisible = true
      this.isRuleForm = false
      if (this.isRuleForm === false) {
        this.ruleForm.username = val.username
        this.ruleForm.email = val.email
        this.ruleForm.mobile = val.mobile
        this.ruleForm.password = val.passwordmobile
        this.editId = val.id
      }
    },
    // 删除
    async handleDelete(val) {
      const res = await handleDeleteApi(val.id)
      this.getData()
    },
    // 打开分配角色
    async openTools(val) {
      // console.log(val)
      this.dialog = true
      this.tools.name = val.username
      this.tools.role_name = val.role_name
      this.tools.id = val.id
      const res = await getroles()
      this.rolesData = res
      // console.log(res)
    },
    // 分配角色
    async handlesubmitTools() {
      const res = await handlesubmitToolsApi({
        id: this.tools.id,
        rid: this.value
      })
      this.dialog = false
      this.getData()
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped lang="scss">
.form_btn {
  display: flex;
  justify-content: flex-end;
}
.el-card {
  margin-top: 16px;
}
</style>
