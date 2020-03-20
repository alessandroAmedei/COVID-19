import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import vuetify from './plugins/vuetify';
Vue.use(Vuetify)

Vue.use(VueAxios, axios);

Vue.config.productionTip = false

store.dispatch('getAndamentoRegionale').then(()=>{
  store.dispatch('getAndamentoNazionale').then(()=>{
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  });
});

