import Vue from 'vue';
import App from './App.vue';

import { sampleText1, sampleText2 } from './data';
import showAlert from './alert';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

showAlert(sampleText1);
showAlert(sampleText2);
