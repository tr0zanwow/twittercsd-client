import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import * as firebase from "firebase/app";
import { store } from "./store/store.js"
import { createProvider } from './vue-apollo'
import vueCookies from 'vue-cookies'
import axios from 'axios'
import VueApollo from 'vue-apollo'
import io from 'socket.io-client';

Vue.config.productionTip = false
Vue.use(vueCookies)
Vue.use(ArgonDashboard)
Vue.use(axios)
Vue.use(VueApollo)

var socket = io('https://apollo-graphql-socket-node.herokuapp.com');

new Vue({
  render: h => h(App),
  router,
  store,
  socket,
  vueCookies,
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