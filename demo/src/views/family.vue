<template>
  <div class="family">
    <div class="header">
      <img src="../assets/logo.png" alt="" />
      <span> 选择家庭成员 </span>
      <span></span>
    </div>
    <div class="box">
      <h5>A</h5>
      <ul>
        <li>
          <img src="../assets/logo.png" alt="" />
          <div class="a">
            <div class="bb">
              <span class="name">柯南 &emsp;</span>
              <span class="age">26岁 </span>
            </div>
            <div class="cc">
              <span class="c1">低血糖</span>
              <span class="c2">颈椎病</span>
            </div>
          </div>
        </li>
        <li>
          <img src="../assets/logo.png" alt="" />
          <div class="a">
            <div class="bb">
              <span class="name">王梦 &emsp;</span>
              <span class="age">86岁 </span>
            </div>
            <div class="cc">
              <span class="c3">高血压</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="box">
      <h5>B</h5>
      <ul>
        <li>
          <img src="../assets/logo.png" alt="" />
          <div class="a">
            <div class="bb">
              <span class="name">柯南 &emsp;</span>
              <span class="age">26岁 </span>
            </div>
            <div class="cc">
              <span class="c1">低血糖</span>
              <span class="c2">颈椎病</span>
            </div>
          </div>
        </li>
        <li>
          <img src="../assets/logo.png" alt="" />
          <div class="a">
            <div class="bb">
              <span class="name">王梦 &emsp;</span>
              <span class="age">86岁 </span>
            </div>
            <div class="cc">
              <span class="c3">高血压</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="box">
      <h5>C</h5>
      <ul>
        <li>
          <img src="../assets/logo.png" alt="" />
          <div class="a">
            <div class="bb">
              <span class="name">柯南 &emsp;</span>
              <span class="age">26岁 </span>
            </div>
            <div class="cc">
              <span class="c1">低血糖</span>
              <span class="c2">颈椎病</span>
            </div>
          </div>
        </li>
        <li>
          <img src="../assets/logo.png" alt="" />
          <div class="a">
            <div class="bb">
              <span class="name">王梦 &emsp;</span>
              <span class="age">86岁 </span>
            </div>
            <div class="cc">
              <span class="c3">高血压</span>
            </div>
          </div>
        </li>
      </ul>
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
.family {
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
    width: 100%;
    // height: 250px;
    background-color: #fff;
    h5 {
      font-weight: 500;
      font-size: 19px;
      margin: 10px 0;
      margin-left: 10px;
    }
    ul {
      background-color: #fff;

      li {
        background-color: #fff;

        margin-top: 10px;
        display: flex;
        margin-left: 15px;
        border-bottom: 1px solid rgb(255, 241, 241);
        padding-bottom: 10px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 20px;
        }
        .a {
          line-height: 30px;
        }
        .cc {
          .c1 {
            margin-right: 10px;
            background-color: #fff8e4;
            color: #fddb8a;
            padding: 3px;
            border-radius: 5px;
            font-size: 15px;
          }
          .c2 {
            background-color: #fff1f0;
            color: #fa8179;
            padding: 3px;
            border-radius: 5px;
            font-size: 15px;
          }
          .c3 {
            background-color: #f1f2fe;
            color: #838bf5;
            padding: 3px;
            border-radius: 5px;
            font-size: 15px;
          }
        }
      }
    }
  }
}
</style>
