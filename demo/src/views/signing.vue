<template>
  <div class="signing">
    <div class="header">
      <img src="../assets/logo.png" alt="" />
      <span> 填写签约信息 </span>
      <span></span>
    </div>
    <div class="box">
      <h3>签约信息</h3>
      <ul>
        <li>
          <span class="a">签约机构</span>
          <span class="b">洛西社区卫生服务站</span>
          <img src="../assets/logo.png" alt="" />
        </li>
        <li>
          <span class="a">签约团队</span>
          <span class="b">李明明团队</span>
          <img src="../assets/logo.png" alt="" />
        </li>
        <li>
          <span class="a">签约医生</span>
          <span class="b">李明明</span>
          <span></span>
        </li>
        <li>
          <span class="a">服务包</span>
          <span class="b">老人服务包</span>
          <img src="../assets/logo.png" alt="" />
        </li>
        <li>
          <span class="a">签约周期</span>
          <span class="b">1年</span>
          <span></span>
        </li>
        <li>
          <span class="a">生效日期</span>
          <span class="b">2020年09月01日</span>
          <img src="../assets/logo.png" alt="" />
        </li>
        <li class="li">
          <span class="a">费用</span>
          <span class="b1">￥120</span>
          <span></span>
        </li>
        <li>
          <span class="a">备注</span>
          <span class="bb">请填写备注</span>
        </li>
      </ul>
      <button class="btn">提交</button>
    </div>
  </div>
</template>

<style lang='scss'>
* {
  padding-top: 0 !important;
  padding: 0;
  margin: 0;
  font-family: "微软雅黑";
  background-color: #f7fafd;
}
.header {
  // width: 100%;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  // margin: 0 10px;
  padding-top: 10px;
  background-color: #fff;
  margin-bottom: 20px;

  img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-top: 10px;
  }
}
.box {
  h3 {
    font-size: 20px;
    font-weight: 500;
    margin: 10px 0;
    margin-left: 10px;
    margin-bottom: 20px;
  }
  ul {
    margin: 0 10px;
    li {
      display: flex;
      // justify-content: space-between;
      border-bottom: 1px solid rgb(225, 216, 216);
      padding-bottom: 10px;
      margin-top: 10px;
      line-height: 22px;
      img {
        width: 20px;

        height: 20px;
      }
      .a {
        color: #ccc;
        width: 100px;
      }
      .b {
        // margin-left: -30px;
        // vertical-align: l;
        text-align: left;
        flex: 1;
      }
      .b1 {
        color: red;
      }
      .bb {
        width: 270px;
        height: 100px;
        border-radius: 10px;
        padding-left: 10px;
color: #ccc;
        // padding: 0px; // padding-top: 10px;
        background-color: #f2f2f2;
      }
    }
    .li {
      display: flex;
      // justify-content:;
    }
  }
  .btn{
    width: 90%;
    height: 40px;
    margin-left: 20px;
    border-radius: 10px;
    background-color: #50d6bf;
    color: #fff;
    border: none;
    position: fixed;
    bottom: 5px;
    left: 0;
    text-align: center;
  }
}
</style>
