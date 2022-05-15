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
              <!-- 修改 -->
              <el-button
                type="primary"
                size="mini"
                @click="handleEdit(scope.row)"
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
              </el-button>
              <!-- 删除 -->
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
              </el-button>
              <!-- 操作 -->
              <el-button
                type="warning"
                size="mini"
                @click="openTools(scope.row)"
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
              </el-button>
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
        <!-- 添加用户弹窗以及修改用户弹窗 二合一 -->
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
        this.ruleForm = {
          username: '',
          password: '',
          email: '',
          mobile: ''
        }
        this.dialogVisible = false
        this.getData()
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
      this.ruleForm = {
        username: '',
        password: '',
        email: '',
        mobile: ''
      }
    },
    // 打开编辑用户模态框
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
