import Vue from 'vue'
import App from './App'
import router from './router'
import {sum,minus} from './util'
import * as util from './util'
import infiniteScroll from 'vue-infinite-scroll'

console.log(`sum:${sum(2,5)}`);
console.log(`sum:${util.sum(2,5)}`);
Vue.config.productionTip = false;
Vue.use(infiniteScroll)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
