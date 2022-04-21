<template>
  <div class="pending">
      <my-title>
          <template #left>&lt;</template>
          <template #center>待处理签约申请</template>
          <template #right></template>
      </my-title>
      <section>
          <div>
               <ul>
                    <li>
                       <div>
                        <p>王小明 <span>58岁</span></p>
                        <i>
                            <img src="../assets/图钉.png" alt="">
                        </i>
                       </div>
                        <h5>待审核</h5>
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
                            <img src="../assets/图钉.png" alt="">
                        </i>
                       </div>
                        <h5>待审核</h5>
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
                            <img src="../assets/图钉.png" alt="">
                        </i>
                       </div>
                        <h5>待审核</h5>
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
      <p class="foot">没有更多了~~</p>
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
.foot{
    font-size: 12px;
    text-align:center;
    margin-top: 10px;
    color: #666;
}
section {
    padding: 0 10px;

    p {
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        line-height: 50px;

        span {
            font-size: 14px;
            color: #9999a6;
        }
    }

    ul {
        padding: 10px;
        border-radius: 10px;
        background-color: #fff;
        box-shadow: 0px 5px 15px rgb(242, 242, 242);
        margin-top: 10px;
        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 15px;
            div {
                flex: 1;
                display: flex;
                align-items: center;
            }

            p {
                font-size: 22px;
                display: block;

                span {
                    font-size: 16px;
                    color: #9999a6;
                    margin-left: 15px;
                }
            }

            i {
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

            h5 {
                color: red;
            }
            h3{
                font-size: 16px;
                font-weight: 400;
                color: #666666;
                span {
                    margin-left: 17px;
                }
            }
        }
        li:nth-of-type(4) {
            h3 {
                span {
                    margin-left: 29px;
                }
            }
        }
    }
    div:nth-of-type(2) {
        padding-bottom: 20px;
        li:nth-of-type(2) {
            span {
                margin-left: 32px;
            }
        }
        li:nth-of-type(4) {
            h3 {
                span {
                    margin-left: 17px;
                }
            }
        }
        i {
            width: 70px;
            height: 30px;
            font-size: 14px;
            font-style: normal;
            background-color: #e2e4fd;
            color: #6c9bf7;
        }
    }
}
.pending{
    height: 100%;
    background-color: #f6f9fc;
}
</style>