<template>
  <div class="sign">
    <my-title>
      <template #left>&lt;</template>
      <template #center>签约管理</template>
      <template #right></template>
    </my-title>
    <div class="tab">
      <li>全部</li>
      <li>待审核</li>
      <li>待支付</li>
      <li>生效中</li>
    </div>
    <section>
      <div>
        <ul>
          <li>
            <div>
              <p>王小明 <span>58岁</span></p>
              <i>
                <img src="../assets/图钉.png" alt="" />
              </i>
            </div>
            <h5 style="color: red">待审核</h5>
          </li>
          <li>
            <h3>身份证号 <span>3245*****2302</span></h3>
          </li>
          <li>
            <h3>签约团队 <span>李明明团队</span></h3>
          </li>
          <li>
            <h3>服务包 <span>老年人</span></h3>
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <p>王小明 <span>58岁</span></p>
              <i>
                <img src="../assets/图钉.png" alt="" />
              </i>
            </div>
            <h5 style="color: #68a9f6">等待居民支付</h5>
          </li>
          <li>
            <h3>身份证号 <span>3245*****2302</span></h3>
          </li>
          <li>
            <h3>签约团队 <span>李明明团队</span></h3>
          </li>
          <li>
            <h3>服务包 <span>老年人</span></h3>
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <p>王小明 <span>58岁</span></p>
              <i>
                <img src="../assets/图钉.png" alt="" />
              </i>
            </div>
            <h5>生效中</h5>
          </li>
          <li>
            <h3>身份证号 <span>3245*****2302</span></h3>
          </li>
          <li>
            <h3>签约团队 <span>李明明团队</span></h3>
          </li>
          <li>
            <h3>服务包 <span>老年人</span></h3>
          </li>
        </ul>
        <ul>
          <li>
            <div>
              <p>王小明 <span>58岁</span></p>
              <i>
                <img src="../assets/图钉.png" alt="" />
              </i>
            </div>
            <h5 style="color: green">已驳回</h5>
          </li>
          <li>
            <h3>身份证号 <span>3245*****2302</span></h3>
          </li>
          <li>
            <h3>签约团队 <span>李明明团队</span></h3>
          </li>
          <li>
            <h3>服务包 <span>老年人</span></h3>
          </li>
        </ul>
      </div>
    </section>
    <p class="p1">~~没有更多了</p>
  </div>
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import myTitle from "../components/myTitle.vue";
export default {
  components: { myTitle },
  setup() {},
};
</script>
<style lang="scss" scoped>
.p1 {
  text-align: center;
  margin: 10px 0;
}
section {
  padding: 0 10px;
}

section p {
  font-size: 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
}

section p span {
  font-size: 14px;
  color: #9999a6;
}

section ul {
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 5px 15px #f2f2f2;
  margin-top: 10px;
}

section ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}

section ul li div {
  flex: 1;
  display: flex;
  align-items: center;
}

section ul li p {
  font-size: 22px;
  display: block;
}

section ul li p span {
  font-size: 16px;
  color: #9999a6;
  margin-left: 15px;
}

section ul li i {
  display: block;
  width: 25px;
  height: 25px;
  background-color: #d1e4fc;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
}

section ul li h3 {
  font-size: 16px;
  font-weight: 400;
  color: #666666;
}

section ul li h3 span {
  margin-left: 17px;
}

section ul li:nth-of-type(4) h3 span {
  margin-left: 29px;
}

section div:nth-of-type(2) {
  padding-bottom: 20px;
}

section div:nth-of-type(2) li:nth-of-type(2) span {
  margin-left: 32px;
}

section div:nth-of-type(2) li:nth-of-type(4) h3 span {
  margin-left: 17px;
}

section div:nth-of-type(2) i {
  width: 70px;
  height: 30px;
  font-size: 14px;
  font-style: normal;
  background-color: #e2e4fd;
  color: #6c9bf7;
}

.tab {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  background: #fff;
}
body {
  background: #f6f9fc;
}
.tab li {
  padding: 5px 0;
}
.tab li:nth-child(1) {
  border-bottom: #3dd4a7 3px solid;
  color: #3dd4a7;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

</style>
