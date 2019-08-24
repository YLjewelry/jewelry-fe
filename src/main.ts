import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.use(ElementUI);

import './style/index.scss';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
