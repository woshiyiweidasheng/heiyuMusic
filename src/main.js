import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入 vue-router
Vue.filter("filterAr", function (arr) {
  let _arr = arr.map(v => {
    return v.name
  })
  return _arr.join("/")
})
Vue.config.productionTip = false
import router from "./router/index.js"
import axios from "axios"
axios.defaults.baseURL="http://183.237.67.218:3000/"
Vue.prototype.$axios=axios
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
