<template>
  <div class="reviewed">
      <my-title>
          <template #left>&lt;</template>
          <template #center>签约详情</template>
          <template #right>
              <p style="color:#3dd4bb;font-size:14px">查看协议</p>
          </template>
      </my-title>
      <div class="ccc">
        <span>等待医生审核</span>
    </div>
    <div class="ccc1">
        居民信息
    </div>
    <div class="box1">
        <li><p>姓名</p><span>王安然</span></li>
        <li><p>身份证号</p><span>3714561980908090543</span></li>
        <li><p>性别</p><span>女</span></li>
        <li><p>年龄</p><span>26</span></li>
        <li><p>联系电话</p><span>156789090990</span></li>
        <li><p>现居地</p><span>怀柔区洛西县建设路青莲小区6-601
        </span></li>
    </div>
    <div class="ccc1">
        签约信息
    </div>
    <div class="box1">
        <li><p>签约状态</p><span style="color:#41d5ad">待签约</span></li>
        <li><p>签约机构</p><span>洛西社区卫生服务站</span></li>
        <li><p>签约医生</p><span>李明明</span></li>
        <li><p>服务包</p><span>老人服务包</span></li>
        <li><p>签约周期</p><span>1年</span></li>
        <li><p>生效日期</p><span>2020/10/09
        </span></li>
        <li><p>费用</p><span style="color: red;">￥120</span></li>
        <li><p>申请时间</p><span>2020/10/09 &nbsp; 10:09:09</span></li>
    </div>
    <div class="box2">
        <button>驳回</button>
        <button>审核通过</button>
    </div>
</div>
</template>

<script>
  import {ref,reactive,toRefs} from 'vue' 
import myTitle from '../components/myTitle.vue';
export default {
  components: { myTitle },
setup(){}
};
</script>
<style lang="scss" scoped>
    .box2 button:nth-child(1){
        background: #fff;
        color: red;
        border: 1px solid red;
    }
    .box2{
        display: flex;
        justify-content: space-between;
        width: 88%;
        margin: 10px auto;

    }
    button{
        width: 47%;
        height: 45px;
        border-radius: 5px;
    }
    .box2 button:nth-child(2){
        background: #4fd6be;
        color: #fff;
        border: #4fd6be;
    }
    .box1 li{
        padding: 7px 0;
    }
    .ccc1{
        padding: 10px;
        font-size: 22px;
    }
    .ccc{
        background: #fddb78;
        color: #fff;
        font-size: 12px;
        box-sizing: border-box;
        padding:5px 20px;
    }
    .box1{
        width: 88%;
        margin: 0 auto;
        background: #fff;
        padding: 5px 10px;
    }
    .box1 p{
        display: inline-block;
        width: 25%;
        color: #ccc;
    }
    *{
        margin: 0;
        padding: 0;
        list-style: none;
    }
    body{
        background:#f7fafd;
    }
</style>