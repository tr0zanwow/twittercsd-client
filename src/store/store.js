import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
    key: "vuex",
    storage: window.localStorage
  })

export const store = new Vuex.Store({
    state:{
        title:"Twitter CSD",
        showModal: false,
        isAuthenticated: false,
        userImgUrl: "",
        userName: "",
        userTwitterId: "",
        profileTwitterID: "",
        userTwitterDescription: "",
        access_token: "",
        access_secret: "",
        userData:[]
    },
    getters:{
        authenticated (state) {
            return state.isAuthenticated
        },
        getUserID(state){
            return state.userData.id_str
        },
        getUserImage(state){
          var str = state.userImgUrl;
          var mod = str.replace("_normal","_400x400")
          return mod;
        },
        getUsername(state){
            return state.userData.name
        },
        getScreenName(state){
            return state.userData.screen_name
        },
        getTweetCount(state){
            return state.userData.tweets_count
        },
        getFollowerCount(state){
            return state.userData.followers_count
        },
        getDescription(state){
            return state.userData.description
        },
        getTweets(state){
            return state.userData.tweets
        },
        getProfileTwitterId(state){
            return state.profileTwitterID
        }
        
    },
    mutations: {
        restoreData(state,payload){
            state.userData = payload
        },
        setProfileTwitterId(state,payload){
            state.profileTwitterID = payload
        },
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
            router.push('profile')
        })
        .catch(function(error) {
            console.log(error);
            
        }
        )
      },
      logout({commit}){
        const userData = {
            userName : '',
            userImgUrl : '',
            userTwitterId : ''
        }
        const credentials = {
            access_token :  '',
            access_secret : ''
        }
            commit("setLoggedInUser",userData)
            commit("setCredentials",credentials)
            commit("authenticated",false)
            router.push('login')
      }
    },
    plugins: [vuexPersist.plugin]
});