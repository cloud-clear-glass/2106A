<template>
  <div class="container">
    <!-- 顶栏 -->
    <el-container>
      <el-header>
        <div class="home_title">
          <h2>电商后台管理系统</h2>
          <template>
            <el-button type="info" @click="open">退出</el-button>
          </template>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '60px' : '200px'">
          <!-- 侧边栏 -->
          <div style="height: 100%">
            <div
              style="height: 30px; width: 100%; background: #4a5064"
              class="left_title"
              @click="isCollapse = !isCollapse"
            >
              <p style="color: #fff">|||</p>
            </div>
            <el-menu
              :collapse="isCollapse"
              background-color="#333744"
              text-color="#fff"
              router
              unique-opened
              :default-active="$route.path"
              :collapse-transition="false"
            >
              <el-submenu
                :index="index + ''"
                v-for="(item, index) in menus"
                :key="index"
                @click.native="handleleft(index)"
              >
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">{{ item.authName }}</span>
                </template>

                <el-menu-item-group
                  v-for="(it, i) in item.children"
                  :key="i"
                  @click.native="handleLeftEr(i)"
                >
                  <el-menu-item :index="'/' + it.path">{{
                    it.authName
                  }}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </div>
        </el-aside>
        <!-- 主体内容 -->
        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item v-show="leftTitle !== ''">{{
              leftTitle
            }}</el-breadcrumb-item>
            <el-breadcrumb-item v-show="Erleft !== ''">{{
              Erleft
            }}</el-breadcrumb-item>
          </el-breadcrumb>
          <h2 style="text-align: center" v-if="$route.path === '/home'">
            Welcome
          </h2>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { MessageBox, Message } from 'element-ui'
import { getMenus } from '../api/http'
export default {
  data() {
    return {
      isCollapse: false,
      menus: [], // 左侧菜单栏
      Yileft: 0, // 一级导航的下标
      Erleft: '', // 二级导航的下标
      leftTitle: '' // 一级导航的标题
    }
  },
  methods: {
    open() {
      MessageBox.alert('您确认退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        showCancelButton: true
      })
        .then(() => {
          Message({
            type: 'success',
            message: '退出登录成功'
          })
          sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(() => {
          Message({
            type: 'info',
            message: '已取消退出登录'
          })
        })
    },
    async getLeft() {
      const res = await getMenus()
      this.menus = res
    },
    // 点击侧边一级导航
    handleleft(index) {
      this.Yileft = index
      this.leftTitle = this.menus[this.Yileft].authName
    },
    // 点击侧边二级导航
    handleLeftEr(i) {
      // this.Erleft = i
      this.leftTitle = this.menus[this.Yileft].authName
      this.Erleft = this.menus[this.Yileft].children[i]?.authName
    }
  },
  created() {
    this.getLeft()
  }
}
</script>

<style scoped lang="scss">
.el-container {
  height: 100%;
}
.left_title {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.el-radio-group {
  margin-bottom: 0 !important;
  height: 100% !important;
  line-height: 100% !important;
}
.el-header {
  padding: 0;
}
.el-aside {
  height: 100%;
  background-color: #333744;
}

.el-main {
  height: 100% !important;
  background-color: #e9eef3;
}
.home_box {
  height: 100%;
  display: flex;

  .left {
    height: 100%;
    .left_box {
      height: 100%;
      background-color: #333;
    }
  }
}

.el-menu {
  width: 100%;
  border-right-width: 0;
  overflow: hidden;
}
.home_title {
  height: 60px;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    margin: 0;
    margin-left: 70px;
    color: #fff;
    font-weight: 400;
  }
}
.container {
  height: 100%;
}
</style>
