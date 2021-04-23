import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'
 
Vue.config.productionTip = false
Vue.use(Datetime)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
