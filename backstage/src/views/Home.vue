<template>
  <div class="home">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <el-row>
          <el-col :span="2" class="left">
            <img src="../assets/header.png" alt="" />
          </el-col>
          <el-col :span="20" class="cent">
            <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="2" class="right">
            <el-button type="info" @click="over">退出</el-button>
          </el-col>
        </el-row>
      </el-header>
      <!-- 侧边栏 -->
      <el-container>
        <el-aside :width="isCollapse ? '60px' : '200px'">
          <div class="title" @click="isCollapse = !isCollapse">|||</div>
          <el-menu
            :default-active="$route.name"
            :unique-opened="true"
            class="el-menu-vertical-demo"
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            style="background: #333744"
            text-color="#fff"
            background-color="#333744"
          >
            <el-sub-menu
              :index="item.id + ''"
              v-for="item in menuList"
              :key="item.id"
            >
              <template #title>
                <el-icon><folder-add /></el-icon>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="item1.path"
                v-for="item1 in item.children"
                :key="item1.id"
              >
                <el-icon><copy-document /></el-icon>
                <template #title>{{ item1.authName }}</template>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <!-- 主体内容 -->
        <el-main>
          <h2 v-if="$route.path === '/home'">Welcome</h2>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import { getLeftMenuApi } from "../api/http";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const isCollapse = ref(false);
    const data = reactive({
      menuList: [], // 左侧菜单数据
    });
    const getleftMenuData = async () => {
      const res = await getLeftMenuApi();
      data.menuList = res;
    };
    const over = () => {
      ElMessageBox.confirm("是否退出登录", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.removeItem("token");
          router.replace("/login");
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消退出",
          });
        });
    };
    getleftMenuData();
    return {
      isCollapse,
      ...toRefs(data),
      over,
    };
  },
};
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  color: #fff;
  background-color: #4a5064;
}

.left {
  text-align: center;
}
.cent {
  line-height: 60px;
  color: #fff;
  h2 {
    font-weight: 400;
  }
}
.right {
  line-height: 60px;
  text-align: right;
}
.home {
  height: 100%;
}
:deep(.el-header) {
  background-color: #373d41;
}
:deep(.el-aside) {
  background-color: #333744;
}
:deep(.el-main) {
  background-color: #ecf5ff;
}
:deep(.el-container) {
  height: 100%;
}
</style>
