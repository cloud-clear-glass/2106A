<template>
  <div class="home">
   <div class="aa"> <h1>居民基本信息</h1></div>
    <div class="count">
      <ul>
        <li>真实姓名 <span>请填写居民的真实姓名</span></li>
        <li>身份证号 <span>请填写居民的身份证号</span></li>
        <li>性别 <span style="margin-left: 50px">请选择居民的性别</span></li>
        <li>出生日期 <span>请选择居民的出生日期</span></li>
        <li>手机号码 <span>居民登录账号,请正确填写</span></li>
        <li>登录密码 <span>8位以上的数字和字母组合</span></li>
        <li style="border: none">
          现居地 <span style="margin-left: 35px">请填写现居地</span>
        </li>
      </ul>
    </div>
    <div class="box">
      <p>居民标签 <span>点击选择居民标签</span></p>
      <ul>
        <li>高血压</li>
        <li>冠心病</li>
        <li>高血糖</li>
        <li>高血脂</li>
      </ul>
      <ul>
        <li>高血压</li>
        <li>冠心病</li>
        <li>高血糖</li>
        <li>高血脂</li>
      </ul>
    </div>
    <div class="count">
      <ul>
        <li>关联家人 <span>请选择该居民家人信息</span></li>
        <li style="border:none;">立即签约</li>
      </ul>
    </div>
    <div class="btn">
      <button>下一步</button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
export default {
  setup() {},
};
</script>
<style lang="scss" scoped>
.btn{
  margin-top: 20px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  line-height: 50px;
  text-align: center;
  button{
    width: 90%;
    height: 35px;
    border:none;
    border-radius: 7px;
    background-color: #41d5ac;
    color:#fff;
  }
}
.box {
  margin-top: 10px;
  padding-left: 10px;
  background-color: #fff;
  p {
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    span {
      margin-left: 20px;
      color: #ccc;
    }
  }
  ul {
    display: flex;
    padding: 10px 0;
    li {
      width: 70px;
      line-height: 50px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    li:nth-of-type(2n) {
      margin-left: 15px;
    }
    li:nth-of-type(3) {
      margin-left: 15px;
    }
  }
}
.home {
  background-color: #f7fafd;
  h1 {
    font-weight: 400;
    margin: 20px;
    margin-bottom: 0;
  }
  .count {
    background-color: #fff;
    margin-top: 10px;
    ul {
      padding-left: 10px;
      li {
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #ccc;
        span {
          color: #ccc;
          margin-left: 20px;
        }
      }
    }
  }
  .aa{
    overflow: hidden;
  }
}
</style>
