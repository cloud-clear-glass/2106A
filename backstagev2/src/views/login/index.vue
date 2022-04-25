<template>
  <div class="container">
    <div class="box">
      <div class="top">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div class="count">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="ruleForm.rules"
          class="demo-ruleForm"
        >
          <el-form-item prop="username">
            <el-input
              v-model="ruleForm.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              show-password
              v-model="ruleForm.password"
              prefix-icon="el-icon-user"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item class="login_btns">
            <el-button type="primary" @click="submit">登录</el-button>
            <el-button type="info" @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '../../api/http'
export default {
  data() {
    return {
      ruleForm: {
        username: 'admin',
        password: '123456',
        rules: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            {
              min: 3,
              max: 20,
              message: '请输入3~20位之间的字符',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            {
              min: 3,
              max: 20,
              message: '请输入3~20位之间的字符',
              trigger: 'blur'
            }
          ]
        }
      }
    }
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return false
        const res = await getToken(this.ruleForm)
        this.$router.push('/home')
      })
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields()
    }
  }
}
</script>

<style scoped lang="scss">
.login_btns {
  display: flex;
  justify-content: flex-end;
}
.count {
  margin-top: 80px;
}
.box {
  width: 400px;
  height: 250px;
  background-color: #fff;
  position: absolute;
  padding: 0 20px;
  box-sizing: border-box;
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
.container {
  width: 100%;
  height: 100%;
  background-color: #334b6c;
  position: relative;
}
</style>
