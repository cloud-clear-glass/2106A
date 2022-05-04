<template>
  <div class="login">
    <div class="box">
      <div class="top">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="count">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="ruleForm.rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleForm)"
              >登录</el-button
            >
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs } from "vue";
import { gologin } from "../api/http";
import { useRouter } from "vue-router";

const router = useRouter();
const ruleForm = reactive({
  username: "admin",
  password: "123456",
  rules: {
    username: [
      {
        required: true,
        message: "请输入正确的用户名",
        trigger: "blur",
      },
      {
        min: 3,
        max: 5,
        message: "请输入正确的用户名，长度在3-5位",
        trigger: "blur",
      },
    ],
    password: [
      {
        required: true,
        message: "请输入正确格式的密码",
        trigger: "blur",
      },
      {
        min: 6,
        max: 6,
        message: "请输入正确格式的密码，长度在6位",
        trigger: "blur",
      },
    ],
  },
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  const res = await gologin(ruleForm);
  if (res.token !== "") {
    localStorage.setItem("token", res.token);
    router.push("/home");
  }
};
const resetForm = () => {
  ruleForm.username = "admin";
  ruleForm.password = "123456";
};
</script>
<style lang="scss" scoped>
:deep(.el-input) {
  // width: 200px !important;
  // text-align: center !important;
  margin-right: 20px !important;
  .el-input__inner {
    width: 100% !important;
  }
}
:deep(.el-form-item__label) {
  width: 80px !important;
}
.count {
  margin-top: 100px;
}
.box {
  width: 400px;
  height: 250px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  box-shadow: 0 0 7px 5px rgb(157 156 156 / 33%);
  .top {
    width: 120px;
    height: 120px;
    border: 10px solid #fff;
    border-radius: 50%;
    position: absolute;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    background-color: #efefef;
    box-shadow: 0 0 7px 5px rgb(157 156 156 / 33%);
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.login {
  width: 100%;
  height: 100%;
  background-color: #334b6c;
  position: relative;
}
</style>
