import 'normalize.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import VueQuillEditor from 'vue-quill-editor'
// 时间格式化插件
import moment from 'moment'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import _ from 'lodash'

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.config.productionTip = false
Vue.filter('data', function (val) {
  return moment(val).format('YYYY-MM-DD hh:mm:ss')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
