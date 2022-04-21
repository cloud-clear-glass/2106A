<template>
  <div class="submit">
    <div class="header">
      <img src="../assets/logo.png" alt="" />
      <span> 结果 </span>
      <span></span>
    </div>
    <div class="box">
      <div class="a">
        <img src="../assets/logo.png" alt="" />
        <p class="a1">提交成功，等待居民支付</p>
        <p class="a2">签约信息已提交，居民支付后可完成签约</p>
      </div>
      <div>
        <button class="btn">查看签约进度</button>
        <button class="btn1">返回首页</button>
      </div>
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
  .a {
    text-align: center;
    img {
      width: 50px;
      height: 50px;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .a1 {
      font-size: 21px;
      margin-bottom: 7px;
    }
    .a2 {
      font-size: 13px;
      color: #ccc;
      margin-bottom: 30px;
    }
  }
  .btn {
    width: 90%;
    height: 40px;
    margin-left: 20px;
    border-radius: 10px;
    background-color: #50d6bf;
    color: #fff;
    border: none;
    text-align: center;
  }
   .btn1 {
    width: 90%;
    height: 40px;
    margin-left: 20px;
    border-radius: 10px;
    // background-color: #50d6bf;
    color: #50d6bf;
    border: 1px solid  #ccc;
    text-align: center;
    margin-top: 20px;
  }
}
</style>

