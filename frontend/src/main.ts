declare var require: any;
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios"
const  codec  = require("irisnet-crypto/util/codec.js") ;
const  crypto = require("irisnet-crypto");

Vue.use(BootstrapVue);
Vue.prototype.$Crypto = crypto;
Vue.prototype.$Codec = codec;
Vue.config.productionTip = false;
let faucet_url;
let fuxi;

if(localStorage.getItem('Faucet_url') && localStorage.getItem('Faucet_url') !== "null"){
  faucet_url = localStorage.getItem('Faucet_url')
}else{
  faucet_url = ''
}

if(localStorage.getItem('Chain_id') && localStorage.getItem('Chain_id') !== "null"){
  fuxi = localStorage.getItem('Chain_id')
}else{
  fuxi = ''
}
Vue.prototype.faucet_url = faucet_url;
Vue.prototype.fuxi = fuxi;
axios.get(`/api/sysdate`).then(data => {
  if(data.status === 200){
    return data.data
  }
}).then(sysdate => {
  setInterval(function () {
    sysdate.data+= 1;
    Vue.prototype.sysdate = sysdate.data;
  },1000)

});
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
