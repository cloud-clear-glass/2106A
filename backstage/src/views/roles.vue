<template>
  <div class="roles">
    <!-- 面包屑 -->
    <my-title title1="权限管理" title2="角色列表"></my-title>
    <el-card class="mt">
      <!-- 添加角色 -->
      <el-row>
        <el-col :span="24">
          <el-button type="primary" @click="openAdd">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 表格数据 -->
      <el-table border class="mt" :data="tableData">
        <el-table-column type="expand">
          <template #default="props">
            <div class="roles_box" v-if="props.row.children.length > 0">
              <el-row v-for="item in props.row.children" class="roles_box_top">
                <el-col :span="4">
                  <el-tag
                    closable
                    effect="dark"
                    @close="deleteOne(props.row, item.id)"
                    >{{ item.authName }}</el-tag
                  >
                </el-col>
                <el-col :span="20">
                  <el-row v-for="item1 in item.children" class="roles_box2">
                    <el-col :span="4">
                      <el-tag
                        closable
                        effect="dark"
                        type="success"
                        @close="deleteOne(props.row, item1.id)"
                        >{{ item1.authName }}</el-tag
                      >
                    </el-col>
                    <el-col :span="20">
                      <el-tag
                        :closable="true"
                        v-for="item2 in item1.children"
                        effect="dark"
                        type="warning"
                        @close="deleteOne(props.row, item2.id)"
                      >
                        {{ item2.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
            <div class="roles_box" v-else>该角色暂无权限</div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <!-- 操作 -->
          <template #default="scope">
            <!-- 编辑 -->
            <el-button
              type="primary"
              size="small"
              @click="openeditRoles(scope.row)"
              ><el-icon><edit-pen /></el-icon>编辑</el-button
            >
            <!-- 删除 -->
            <el-button
              type="danger"
              size="small"
              @click="deleteRoles(scope.row.id)"
            >
              <el-icon><delete-filled /></el-icon>删除
            </el-button>
            <!-- 分配角色 -->
            <el-button
              type="warning"
              size="small"
              @click="openRoles(scope.row)"
            >
              <el-icon><tools /></el-icon>分配权限
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色的弹出框 -->
    <el-dialog v-model="dialogVisible" title="添加角色" width="40%">
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleAddRoles">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改角色的弹出框 -->
    <el-dialog v-model="dialog" title="编辑角色" width="40%">
      <el-form :model="editForm" :rules="rules">
        <el-form-item label="角色名称" label-width="80px" prop="roleName">
          <el-input v-model="editForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="80px" prop="roleDesc">
          <el-input v-model="editForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="handleEdit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 分配权限的弹出框 -->
    <el-dialog v-model="isDialog" title="分配权限" width="40%" @close="close">
      <el-tree
        :data="distributionData"
        ref="treeRef"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defaultArr"
        :props="{ children: 'children', label: 'authName' }"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isDialog = false">取消</el-button>
          <el-button type="primary" @click="handleCheck">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import myTitle from "../components/myTitle.vue";
import {
  getDataApi,
  handleAddRolesApi,
  handleEditApi,
  handleDeleteApi,
  getRightsApi,
  handleCheckApi,
  deleteOneApi,
} from "../api/rolesHttp";
import { ElMessage, ElMessageBox } from "element-plus";
export default {
  components: { myTitle },
  setup() {
    const treeRef = ref("treeRef");
    const data = reactive({
      tableData: [],
      dialogVisible: false,
      dialog: false,
      distributionData: [], // 分配权限的数据
      isDialog: false, // 分配权限的状态
      defaultArr: [], // 选中的id
      editId: "", // 角色id
    });
    // 添加角色的数据
    const ruleForm = reactive({
      roleName: "",
      roleDesc: "",
    });
    // 编辑角色的数据
    const editForm = reactive({
      id: "",
      roleName: "",
      roleDesc: "",
    });
    // 验证规则
    const rules = reactive({
      roleName: [
        { required: true, message: "角色名称不能为空", trigger: "blur" },
      ],
      roleDesc: [
        { required: true, message: "角色名称不能为空", trigger: "blur" },
      ],
    });
    // 获取权限数据
    const getData = async () => {
      data.tableData = await getDataApi();
    };
    //打开添加角色弹出框
    const openAdd = () => {
      data.dialogVisible = true;
    };
    // 添加角色
    const handleAddRoles = async () => {
      if (ruleForm.roleName === "" || ruleForm.roleDesc === "") return;
      await handleAddRolesApi(ruleForm);
      data.dialogVisible = false;
      getData();
    };
    // 打开编辑角色弹出框
    const openeditRoles = (val) => {
      editForm.id = val.id;
      editForm.roleName = val.roleName;
      editForm.roleDesc = val.roleDesc;
      data.dialog = true;
    };
    // 编辑角色
    const handleEdit = async () => {
      await handleEditApi(editForm);
      data.dialog = false;
      getData();
    };
    // 删除角色
    const deleteRoles = (id) => {
      ElMessageBox.confirm("是否删除该角色", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await handleDeleteApi(id);
          getData();
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    // 打开分配权限
    const openRoles = async (val) => {
      data.editId = val.id;
      const res = await getRightsApi("tree");
      data.distributionData = res;
      data.isDialog = true;
      getdefaultData(val, data.defaultArr);
    };
    // 获取默认的权限
    const getdefaultData = (val, defaultArr) => {
      if (!val.children) {
        return defaultArr.push(val.id);
      }
      val.children.forEach((item) => getdefaultData(item, defaultArr));
    };
    // 关闭分配权限弹出框，清空默认获取的权限
    const close = () => {
      data.defaultArr = [];
    };
    // 分配权限
    const handleCheck = async () => {
      // console.log(treeRef.value.getHalfCheckedKeys());
      // console.log(treeRef.value.getCheckedKeys());
      const arr = [
        ...treeRef.value.getHalfCheckedKeys(),
        ...treeRef.value.getCheckedKeys(),
      ];
      await handleCheckApi(data.editId, arr);
      getData();
      data.isDialog = false;
    };
    // 删除单个权限
    const deleteOne = (val, id) => {
      ElMessageBox.confirm("是否删除此权限", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await deleteOneApi(val.id, id);
          val.children = res;
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消删除",
          });
        });
    };
    getData();
    return {
      ...toRefs(data),
      getData,
      openAdd,
      ruleForm,
      rules,
      handleAddRoles,
      editForm,
      openeditRoles,
      handleEdit,
      deleteRoles,
      openRoles,
      handleCheck,
      close,
      treeRef,
      deleteOne,
    };
  },
};
</script>
<style lang="scss" scoped>
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
.roles_box {
  padding: 20px;
}

.el-tag {
  margin: 4px;
}
</style>
