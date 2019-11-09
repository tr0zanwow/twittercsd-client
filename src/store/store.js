import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)


export const store = new Vuex.Store({
    state:{
        title:"Twitter CSD",
        tweet_id: "",
        showModal: false,
        isAuthenticated: false,
        userImgUrl: "",
        userName: "",
        userTwitterId: "",
        userTwitterDescription: "",
        access_token: "",
        access_secret: ""
    },
    getters:{
        tweet_id(state) {
            if(state.tweet_id == ""){
                this.$router.push('Profile')
            }
            else{
            return state.tweet_id;
            }
        },
        isAuthenticated () {
            return vueAuth.isAuthenticated()
        },
        getUserImage(state){
          var str = state.userImgUrl;
          var mod = str.replace("_normal","_400x400")
          return mod;
      }
    },
    mutations: {
        setTweetId: (state, newValue) => {
            state.tweet_id = newValue
        },
        isAuthenticated:(state, payload)=> {
            state.isAuthenticated = payload.isAuthenticated
        },
        setLoggedInUser: (state,payload) =>{
            state.userName = payload.userName,
            state.userImgUrl = payload.userImgUrl,
            state.userTwitterId = payload.userTwitterId
        },
        setCredentials:(state,payload) =>{
            state.access_token = payload.access_token,
            state.access_secret = payload.access_secret
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
            commit("isAuthenticated",true)

        })
        .catch(function(error) {
            console.log(error);
            
        }
        )
      }
    }
});