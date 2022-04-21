<template>
  <div class="about">
    <div class="title">
      <p @click="$router.back()">&lt;</p>
      <p>关联家人信息</p>
      <span style="color:#28d094;">完成</span>
    </div>
    <div class="box">
      <h6>家人信息</h6>
      <ul>
        <li>
          <p>选择家人</p>
          <span>请选择该居民家人信息</span>
        </li>
        <li>
          <p>与本人关系</p>
          <span>请选择家人与该居民关系</span>
        </li>
      </ul>
    </div>
    <div class="add">
      +新增关联家人
    </div>
</div>
</template>

<script>
  import {ref,reactive,toRefs} from 'vue' 
export default {
setup(){}
};
</script>
<style lang="scss" scoped>
.add{
  text-align: center;
  margin-top: 20px;
  color:#28d094;
}
.box{
  margin-top: 20px;
  h6{
    font-size: 14px;
    color: #666;
    font-weight: 400;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  ul{
    background-color: #fff;
    padding-left: 10px;
    li{
      line-height: 50px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      p{
        width: 100px;
        
      }
      span {
        color: #666;
        flex: 1;
      }
    }
  }
}
.title{
  line-height: 50px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 10px;
}
.about{
  height: 100%;
  background-color: #f7fafd;
}
</style>