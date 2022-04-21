<template>
  <div class="mytitle">
      <p> <slot name="left"></slot> </p>
      <p> <slot name="center"></slot> </p>
      <p> <slot name="right"></slot> </p>
</div>
</template>

<script>
  import {ref,reactive,toRefs} from 'vue' 
export default {
setup(){}
};
</script>
<style lang="scss" scoped>
.mytitle{
    width: 100%;
    height: 50px;
    display: flex;
    padding: 0 10px;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
    p:nth-of-type(2){
       flex: 1;
       text-align:center;
    }
}
*{
  margin: 0;
  padding: 0;
}
</style>