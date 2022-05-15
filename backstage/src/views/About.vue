<template>
  <div class=""></div>
</template>

<script>
import { onMounted, onBeforeMount } from "vue";
export default {
  beforeCreate() {
    console.log("我是beforeCreate");
  },
  created() {
    console.log("我是created");
  },
  beforeMount() {
    console.log("我是beforeMount");
  },
  mounted() {
    console.log("我是mounted");
  },
  setup() {
    console.log("我是setup");
    onBeforeMount(() => {
      console.log("我是onBeforeMount");
    });
    onMounted(() => {
      console.log("我是onMounted");
    });
  },
};
</script>
<style lang="scss" scoped></style>
