import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Menu from '@/components/Menu.vue'
import Logo from '@/components/Logo.vue'
import VueNativeSock from 'vue-native-websocket'
import config from './config'
import VueSweetalert2 from 'vue-sweetalert2';
import axios from 'axios'
import VueAxios from 'vue-axios'
import TrendChart from "vue-trend-chart";


Vue.config.productionTip = false

Vue.use(VueNativeSock, config.SOCKET)
Vue.use(VueSweetalert2)
Vue.use(VueAxios, axios)
Vue.use(TrendChart);

Vue.component('menu-fiapson', Menu)
Vue.component('logo', Logo)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
