import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import router from '../router'
import VuexPersist from 'vuex-persist'
import io from 'socket.io-client';

var socket = io('https://apollo-graphql-socket-node.herokuapp.com');

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
        userScreenName: "",
        profileTwitterID: "",
        userTwitterDescription: "",
        access_token: "",
        access_secret: "",
        currentUserTweets:[],
        taggedTweets:[],
        loggedInUserData: [],
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
            return state.userData.user.name
        },
        getScreenName(state){
            return state.userData.user.screen_name
        },
        getTweetCount(state){
            return state.userData.user.statuses_count
        },
        getFollowerCount(state){
            return state.userData.user.followers_count
        },
        getDescription(state){
            return state.userData.user.description
        },
        getTweets(state){
            return state.userData.tweets
        },
        getCurrentUserTweets(state){
            return state.currentUserTweets
        },
        getTaggedTweets(state){
            return state.taggedTweets
        },
        getProfileTwitterId(state){
            return state.profileTwitterID
        },
        socketOnStart(state){
            if(state.isAuthenticated){
                socket.on('connect', function(){
                    if(state.isAuthenticated){
                    const creds = {
                        userTwitterId: state.userTwitterId,
                        access_token: state.access_token,
                        access_secret: state.access_secret,
                    }
                    socket.emit('creds', creds);
                  }
                }); 
        }
        }
        
    },
    mutations: {
        restoreData(state,payload){
            state.userData = payload
        },
        setProfileTwitterId(state,payload){
            state.profileTwitterID = payload
        },
        setTaggedTweets(state,payload){
            state.taggedTweets = payload
        },
        setLoggedInUserData(state,payload){
            state.loggedInUserData = payload
        },
        authenticated:(state, payload)=> {
            state.isAuthenticated = payload
        },
        setCurrentUserTweets:(state,payload) =>{
            state.currentUserTweets = payload
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
    login ({commit,getters}, payload) {
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
            const creds = {
                userTwitterId: result.user.providerData[0].uid,
                access_token: result.credential.accessToken,
                access_secret: result.credential.secret,
            }
            socket.emit('creds', creds);

            router.push('about')
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

socket.on('eventOccured',function(data){
    console.log(data)
});