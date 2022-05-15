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
                  <svg
                    t="1652614870931"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="6100"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M191.488 190.464q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l695.296 0q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-695.296 0zM191.488 443.392q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l631.808 0q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-631.808 0zM886.784 569.344q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-695.296 0q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l695.296 0zM823.296 822.272q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-631.808 0q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l631.808 0z"
                      p-id="6101"
                      fill="#fff"
                    ></path>
                  </svg>
                  <span slot="title">{{ item.authName }}</span>
                </template>

                <el-menu-item-group
                  v-for="(it, i) in item.children"
                  :key="i"
                  @click.native="handleLeftEr(i)"
                >
                  <el-menu-item :index="'/' + it.path">
                    <svg
                      t="1652615010831"
                      class="icon"
                      viewBox="0 0 1024 1024"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      p-id="8447"
                      width="16"
                      height="16"
                    >
                      <path
                        d="M258.233 86.657c18.193 0 33.574 6.328 46.26 18.955 12.627 12.656 18.955 28.081 18.955 46.274v110.933c0 18.179-6.328 33.604-18.955 46.26-12.686 12.656-28.066 18.984-46.26 18.984H147.271c-18.164 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.26V151.887c0-18.193 6.328-33.618 18.984-46.274 12.656-12.627 28.066-18.955 46.23-18.955h110.962v-0.001z m307.603 0c18.163 0 33.589 6.328 46.229 18.955 12.672 12.656 18.984 28.081 18.984 46.274v110.933c0 18.179-6.313 33.604-18.984 46.26-12.641 12.656-28.066 18.984-46.229 18.984H452.911c-18.149 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.26V151.887c0-18.193 6.328-33.618 18.984-46.274 12.656-12.627 28.081-18.955 46.23-18.955h112.925v-0.001z m303.677 0c18.193 0 33.617 6.328 46.26 18.955 12.656 12.656 18.984 28.081 18.984 46.274v110.933c0 18.179-6.328 33.604-18.984 46.26-12.643 12.656-28.066 18.984-46.26 18.984H756.616c-18.164 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.26V151.887c0-18.193 6.328-33.618 18.984-46.274 12.656-12.627 28.066-18.955 46.23-18.955h112.897v-0.001z m-611.28 305.655c18.193 0 33.574 6.328 46.26 18.955 12.627 12.656 18.955 28.066 18.955 46.23v110.991c0 18.149-6.328 33.574-18.955 46.23-12.686 12.656-28.066 18.984-46.26 18.984H147.271c-18.164 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.23V457.497c0-18.164 6.328-33.574 18.984-46.23 12.656-12.627 28.066-18.955 46.23-18.955h110.962z m307.603 0c18.163 0 33.589 6.328 46.229 18.955 12.672 12.656 18.984 28.066 18.984 46.23v110.991c0 18.149-6.313 33.574-18.984 46.23-12.641 12.656-28.066 18.984-46.229 18.984H452.911c-18.149 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.23V457.497c0-18.164 6.328-33.574 18.984-46.23 12.656-12.627 28.081-18.955 46.23-18.955h112.925z m303.677 0c18.193 0 33.617 6.328 46.26 18.955 12.656 12.656 18.984 28.066 18.984 46.23v110.991c0 18.149-6.328 33.574-18.984 46.23-12.643 12.656-28.066 18.984-46.26 18.984H756.616c-18.164 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.23V457.497c0-18.164 6.328-33.574 18.984-46.23 12.656-12.627 28.066-18.955 46.23-18.955h112.897z m-611.28 305.639c18.193 0 33.574 6.328 46.26 18.97 12.627 12.671 18.955 28.052 18.955 46.245v110.962c0 18.149-6.328 33.574-18.955 46.23-12.686 12.656-28.066 18.984-46.26 18.984H147.271c-18.164 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.23V763.166c0-18.193 6.328-33.574 18.984-46.245 12.656-12.642 28.066-18.97 46.23-18.97h110.962z m307.603 0c18.163 0 33.589 6.328 46.229 18.97 12.672 12.671 18.984 28.052 18.984 46.245v110.962c0 18.149-6.313 33.574-18.984 46.23-12.641 12.656-28.066 18.984-46.229 18.984H452.911c-18.149 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.23V763.166c0-18.193 6.328-33.574 18.984-46.245 12.656-12.642 28.081-18.97 46.23-18.97h112.925z m303.677 0c18.193 0 33.617 6.328 46.26 18.97 12.656 12.671 18.984 28.052 18.984 46.245v110.962c0 18.149-6.328 33.574-18.984 46.23-12.643 12.656-28.066 18.984-46.26 18.984H756.616c-18.164 0-33.574-6.328-46.23-18.984s-18.984-28.081-18.984-46.23V763.166c0-18.193 6.328-33.574 18.984-46.245 12.656-12.642 28.066-18.97 46.23-18.97h112.897z m0 0"
                        fill="#ffffff"
                        p-id="8448"
                      ></path>
                    </svg>
                    {{ it.authName }}</el-menu-item
                  >
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
