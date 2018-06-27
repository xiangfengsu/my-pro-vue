import Vue from 'vue';
import { Notification, Message, MessageBox } from 'element-ui';
import App from './App.vue';
import router from './common/router';
import store from './store/index';


Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app');
