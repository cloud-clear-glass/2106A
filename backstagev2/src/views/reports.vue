<template>
  <div class="reports">
    <div id="main" style="width: 800px; height: 400px" class="mt"></div>
  </div>
</template>

<script>
import { getReportsApi } from '../api/ordersHttp'
import * as echarts from 'echarts'
import _ from 'lodash'
export default {
  data() {
    return {
      reportsData: [],
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  methods: {
    getData() {}
  },
  created() {
    this.getData()
  },
  async mounted() {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    const res = await getReportsApi()
    const result = _.merge(res, this.options)
    myChart.setOption(result)
  }
}
</script>

<style scoped lang="scss"></style>
