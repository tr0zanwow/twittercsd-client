import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import * as firebase from "firebase/app";
import { store } from "./store/store.js"
import { createProvider } from './vue-apollo'
import vueCookies from 'vue-cookies'

Vue.config.productionTip = false
Vue.use(vueCookies)
Vue.use(ArgonDashboard)

vueCookies.config('7d')

new Vue({
  router,
  store,
  vueCookies,
  render: h => h(App),
  apolloProvider: createProvider(),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyBJ0cbWMWODy8HIvU_9YI5XAM8XTlIJkOY",
      authDomain: "digitalschoolindia1337.firebaseapp.com",
      databaseURL: "https://digitalschoolindia1337.firebaseio.com",
      projectId: "digitalschoolindia1337",
      storageBucket: "digitalschoolindia1337.appspot.com",
      messagingSenderId: "585435997482",
      appId: "1:585435997482:web:89ac0da23f96313e406a53"
    })
  },
}).$mount('#app')