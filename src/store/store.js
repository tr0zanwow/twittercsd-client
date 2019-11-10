import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'

Vue.use(Vuex)


export const store = new Vuex.Store({
    state:{
        title:"Twitter CSD",
        showModal: false,
        isAuthenticated: false,
        userImgUrl: "",
        userName: "",
        userTwitterId: "",
        userTwitterDescription: "",
        access_token: "",
        access_secret: "",
        userData:[]
    },
    getters:{
        authenticated (state) {
            return state.isAuthenticated
        },
        getUserImage(state){
          var str = state.userImgUrl;
          var mod = str.replace("_normal","_400x400")
          return mod;
      }
    },
    mutations: {
        authenticated:(state, payload)=> {
            state.isAuthenticated = payload
        },
        setLoggedInUser: (state,payload) =>{
            state.userName = payload.userName,
            state.userImgUrl = payload.userImgUrl,
            state.userTwitterId = payload.userTwitterId
        },
        setCredentials:(state,payload) =>{
            state.access_token = payload.access_token,
            state.access_secret = payload.access_secret
        },
        setUsername:(state,payload)=>{
            state.userName = payload
        },
        setUserData:(state,payload)=>{
            state.userData = payload
        }
},
actions: {
    login ({commit}, payload) {
        firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then(function(result){
            const userData = {
                userName : result.user.providerData[0].displayName,
                userImgUrl : result.user.providerData[0].photoURL,
                userTwitterId : result.user.providerData[0].uid
            }
            const credentials = {
                access_token :  result.credential.accessToken,
                access_secret : result.credential.secret
            }
            commit("setLoggedInUser",userData)
            commit("setCredentials",credentials)
            commit("authenticated",true)
            router.push({name: 'dashboard',params: {isAuthenticated: true}})

        })
        .catch(function(error) {
            console.log(error);
            
        }
        )
      },
      logout(){
          router.push('login')
      }
    }
});