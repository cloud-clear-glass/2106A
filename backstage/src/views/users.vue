<template>
  <div class="users">
    <my-title title1="用户管理" title2="用户列表"></my-title>
    <el-card class="mt">
      <!-- 搜索 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="quyerInfo.query"
            placeholder="请输入内容"
            class="input-with-select"
            :clearable="true"
            @clear="searchBtn"
          >
            <template #append>
              <el-button @click="searchBtn">
                <el-icon><search /></el-icon>
              </el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="openAdd">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="tableData" border class="mt">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态">
          <template #default="scope">
            <!-- 状态 -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeState(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 操作 -->
          <template #default="scope">
            <!-- 修改 -->
            <el-button
              type="primary"
              size="small"
              @click="openeditUsers(scope.row)"
              ><el-icon><edit-pen /></el-icon
            ></el-button>
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              @click="deleteUsers(scope.row.id)"
            >
              <el-icon><delete-filled /></el-icon>
            </el-button>
            <!-- 分配角色 -->
            <el-button
              type="warning"
              size="small"
              @click="openRoles(scope.row)"
            >
              <el-icon><tools /></el-icon>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        v-model:currentPage="quyerInfo.pagenum"
        v-model:page-size="quyerInfo.pagesize"
        :page-sizes="[5, 10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mt"
      />
    </el-card>

    <!-- 添加用户弹出框 -->
    <el-dialog v-model="dialogVisible" title="添加用户" width="40%">
      <!-- 表单数据 -->
      <el-form :model="ruleForm" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改用户弹出框 -->
    <el-dialog v-model="dialog" title="修改用户" width="40%">
      <!-- 表单数据 -->
      <el-form :model="editForm" :rules="rules" ref="ruleFormRef">
        <el-form-item label="用户名" label-width="80px" prop="username">
          <el-input v-model="editForm.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="editUsers">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分配角色弹出框 -->
    <el-dialog v-model="rolesdialog" title="分配角色" width="40%">
      <p>当前的用户：{{ userData.username }}</p>
      <p class="mt">当前的角色：{{ userData.role_name }}</p>
      <p>
        分配新角色：
        <el-select
          v-model="value"
          class="m-2"
          placeholder="请选择"
          size="large"
        >
          <el-option
            v-for="item in rolesData"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          />
        </el-select>
      </p>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="rolesdialog = false">取消</el-button>
          <el-button type="primary" @click="handleRoles">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import MyTitle from "../components/myTitle.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
  getUserData,
  editUsersState,
  addUsers,
  editUsersApi,
  deleteUsersApi,
  rolesApi,
} from "../api/http";
import { getDataApi } from "../api/rolesHttp";
export default {
  components: { MyTitle },
  setup() {
    const data = reactive({
      dialogVisible: false, // 添加用户
      dialog: false, // 修改用户
      rolesdialog: false, // 分配角色
      quyerInfo: {
        query: "",
        pagesize: 5,
        pagenum: 1,
      },
      total: 0,
      tableData: [],
      editId: "",
      // 角色权限的数据
      rolesData: [],
      // 分配角色时存储的用户信息
      userData: {
        username: "",
        role_name: "",
      },
      value: "", // 分配角色绑定
    });
    // 添加用户数据
    const ruleForm = reactive({
      username: "",
      password: "",
      email: "",
      mobile: "",
    });
    // 修改用户数据
    const editForm = reactive({
      username: "",
      email: "",
      mobile: "",
    });
    // 验证规则
    const rules = reactive({
      username: [
        { required: true, message: "用户名不能为空", trigger: "blur" },
      ],
      password: [{ required: true, message: "密码不能为空", trigger: "blur" }],
      email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
      mobile: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
    });
    // 获取table数据
    const getData = async () => {
      const res = await getUserData(data.quyerInfo);
      data.total = res.total;
      data.tableData = res.users;
    };
    // 当前页数量改变
    const handleSizeChange = (val) => {
      data.quyerInfo.pagesize = val;
      getData();
    };
    // 当前页码改变
    const handleCurrentChange = (val) => {
      data.quyerInfo.pagenum = val;
      getData();
    };
    // 改变角色状态
    const changeState = async (row) => {
      await editUsersState(row.id, row.mg_state);
    };
    // 打开添加数据
    const openAdd = () => {
      data.dialogVisible = true;
    };
    // 添加用户
    const submitForm = async () => {
      if (
        ruleForm.username === "" ||
        ruleForm.password === "" ||
        ruleForm.email === "" ||
        ruleForm.mobile === ""
      )
        return;
      await addUsers(ruleForm);
      getData();
      data.dialogVisible = false;
    };
    // 搜索
    const searchBtn = () => {
      getData();
    };
    // 打开修改用户数据
    const openeditUsers = (val) => {
      editForm.username = val.username;
      editForm.mobile = val.mobile;
      editForm.email = val.email;
      data.editId = val.id;
      data.dialog = true;
    };
    // 修改用户数据
    const editUsers = async () => {
      await editUsersApi(data.editId, editForm);
      getData();
      data.dialog = false;
    };
    // 删除用户
    const deleteUsers = (id) => {
      ElMessageBox.confirm("是否删除用户", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await deleteUsersApi(id);
          getData();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    // 打开分配角色
    const openRoles = (val) => {
      data.value = "";
      data.editId = val.id;
      data.userData.username = val.username;
      data.userData.role_name = val.role_name;
      getDataApi().then((res) => {
        data.rolesData = res;
      });
      data.rolesdialog = true;
    };
    const handleRoles = async () => {
      await rolesApi(data.editId, data.value);
      getData();
      data.rolesdialog = false;
    };
    getData();
    return {
      ...toRefs(data),
      handleCurrentChange,
      handleSizeChange,
      changeState,
      ruleForm,
      openAdd,
      submitForm,
      rules,
      searchBtn,
      editForm,
      openeditUsers,
      editUsers,
      deleteUsers,
      openRoles,
      handleRoles,
    };
  },
};
</script>
<style lang="scss" scoped></style>
