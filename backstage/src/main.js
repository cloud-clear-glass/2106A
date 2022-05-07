import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '@element-plus/icons-vue'
import * as ElIcons from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import 'nprogress/nprogress.css'
const app = createApp(App)
app.component('QuillEditor', QuillEditor)
for (const name in ElIcons) {
    app.component(name, (ElIcons)[name])
}
app.use(store).use(router).use(ElementPlus).mount('#app')
