import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 时间格式化插件
import moment from 'moment'
Vue.config.productionTip = false
Vue.filter('data', function (val) {
  return moment(val).format('YYYY-MM-DD hh:mm:ss')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
