<template>
  <div >
    <base-header type="gradient-info" class="pb-6 pt-1 pt-md-9">
      <div id="topContainer" class="row mt--7 mb-2">
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Name"
            type="gradient-red"
            :sub-title="getUserName"
            icon="fa fa-user"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Screen Name"
            type="gradient-orange"
            :sub-title="'@'+getScreenName"
            icon="fa fa-at"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Tweet Count"
            type="gradient-green"
            :sub-title="getTweetCount"
            icon="fa fa-sort"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Followers"
            type="gradient-info"
            :sub-title="getFollowersCount"
            icon="fa fa-users"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
      </div>
    </base-header>

    <div class="wrapper container-fluid mt--6 mb-2" >
    <div class="row">
        <div class="col-lg-12 align-items-stretch" >
          <div class="card shadow"
       :class="type === 'dark' ? 'bg-default': ''">
    <div class="card-header border-0"
         :class="type === 'dark' ? 'bg-transparent': ''">
      <div class="row align-items-center">
        <div class="col">
          <h3 v-if="getDescription != ''" class="mb-0" id="descriptionWrap">
            <small class="h5 text-muted">Description</small><br><span class="h4 descriptionStyle">{{getDescription}}</span>
          </h3>
          <h3 v-else class="mb-0">
            <small class="h5">Description</small><br>Not Available
          </h3>
        </div>
        <div class="col-sm-2 text-right">
          <base-button @click="seeProfile" type="primary" size="sm">See Profile</base-button>
        </div>
      </div>
    </div>
      <hr class="my-1">

    <div id="tweetContainer">

      <ApolloQuery
        :query="require('../graphql/getUserInfo.gql')"
        :variables="{ idstr }"
      >
        <template v-slot="{ result: { loading, error, data }, isLoading }">
          
      <ApolloQuery
        :query="require('../graphql/ListTweets.gql')"
        :variables="{ query: 'to:@'+getScreenName+' from:@'+data.twitter.user.screen_name, tweetSize }"
        :pollInterval="5000"
        :loadingKey= isUpdating
      >
        <template v-slot="{ result: { loading, error, data }, isLoading }">
        <div id="progressloader" v-if="isLoading && loading">
                <sync-loader
                  :loading="isLoading ? true : false"
                  :color="color"
                  :size="size"
                ></sync-loader>
              </div>

      <div v-else v-for="(tweet,itemIndex) in getTweets.slice(0).reverse()" :key="tweet.id_str">
      <div class="row align-items-center mt-4 mb-4 ml-2">
        <div class="col-sm-1 mt--4">
            <span class="avatar avatar-l rounded-circle">
              <img v-bind:src="getUserImageURL" />
            </span>
        </div>

        <div class="col-sm-11 text-left float-left ml--4">
          <span :class="{ tweetTextActive: activeItemId === itemIndex }" class="tweetText h4">{{tweet.text}}</span><span @click="setCurentTweetToReply(tweet.id_str),setActiveItemId(itemIndex)" class="ml-3 clickableReplyIco"><i class="fa fa-reply text-default"></i></span><br>
          <span class="" id="tweetTime">{{getLocalTime(tweet.created_at)}}</span>
        </div>

      </div>
      <div id="tweetReplies" v-for="repliedTweets in data.twitter.search.slice(0).reverse()" :key="repliedTweets.id_str">
          <div v-if="repliedTweets.in_reply_to_status_id_str == tweet.id_str">
          <div class="row align-items-center mt-4 mb-4">
        
        <div class="col-sm-11 text-right">
          <h4 class="replietTweetText">{{repliedTweets.text}}</h4><br>
          <span class="" id="tweetTime">{{getLocalTime(repliedTweets.created_at)}}</span>
        </div>

        <div class="col-sm-1 mt--4">
            <span class="avatar avatar-l rounded-circle">
              <img v-bind:src="repliedTweets.user.profile_image_url" />
            </span>
        </div>

          </div>

        </div>
        </div>
      </div>
        </template>
      </ApolloQuery>
        </template>
      </ApolloQuery>

    </div>
      <div class="card-footer text-muted">
       <div class="row">
                    <div class="col-xl-11 col-lg-6">
                        <textarea v-model="tweetText" class="form-control" id="tweetComposeTextArea" rows="1" :placeholder="getScreenNameForInputArea"></textarea>
                    </div>
                    <div class="col-xl-1 col-lg-6">
                        <button class="btn btn-icon btn-2 btn-primary" @click="validate" type="button">
                            <span class="btn-inner--icon"><i class="fa fa-paper-plane"></i></span>
                        </button>
                    </div>
                  </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  <modal :show.sync="modal0" gradient="info" modal-classes="modal-danger modal-dialog-centered">
        <h5 slot="header" class="modal-title" id="modal-title-notification">Your attention is required</h5>
        
      <div v-if="progressState" class="text-center">
        
        <div id="progressloader2">
                <sync-loader
                  :loading="progressState"
                  color="#fff"
                  size="25px"
                ></sync-loader>
              </div>

      </div>
        <div v-else>
        <div class="py-3 text-center">
                <i class="fa fa-paper-plane fa-4x"></i>
                <h4 class="heading mt-4">Confirmation</h4>
                <p>Send: <br><strong>"{{tweetText}}"</strong><br><br>To: <br> <strong>@{{getScreenName}}</strong><br></p>
            </div>
        </div>
        <template v-if="!progressState" slot="footer">
                <base-button @click="sendTweet" type="default">Send</base-button>
                <base-button type="secondary" class="ml-auto" @click="modal0 = false">Close</base-button>
            </template>
   </modal>
   <modal :show.sync="modalerror"
               gradient="danger"
               modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Alert: Tweet body cannot be blank</h6>

            <div class="py-3 text-center">
                <h4 class="heading mt-4">Please enter some text to send</h4>
            </div>

            <template slot="footer">
                <base-button @click="modalerror = false" type="white">Ok</base-button>
            </template>
    </modal>
  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,500|Rubik:400,500&display=swap");

.wrapper{
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
}
#tweetContainer{
  overflow-y: auto;
  overflow-x: hidden;
  height: 50vh;
  width: 100%;
  max-height: 50vh;
}
#tweetContainer::-webkit-scrollbar {
    display: block;
    width: 10px;
}
#tweetComposeTextArea{
  resize: none;
}
.clickableReplyIco{
  cursor: pointer;
}
#descriptionWrap{
  white-space: nowrap; 
  width: 50em; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
#tweetContainer::-webkit-scrollbar-track {
    background-color: rgba(245, 245, 245, 0.151);
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
#tweetContainer::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #11CCEE; 
}

#progressloader{
  margin: 0;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-55%, -50%);
}

#progressloader2{
  margin: 0;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-45%, -50%);
}

#tweetTime{
  font-family: "Montserrat", sans-serif;
  font-size: 12.8px;
  color: #006064;
  margin-left: 5px;
  font-weight: bold;
}

.tweetText{
font-family: "Montserrat", sans-serif;
background-color: #eceff1c0;
color: #212121c9;
position: relative;
border-radius: .5em;
display: inline-block;
padding: 1em;
}

.tweetText:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #eceff1c0;
	border-left: 0;
	margin-top: -20px;
	margin-left: -20px;
}

.replietTweetText{
  font-family: "Montserrat", sans-serif;
  background-color: #eceff1c0;
  color: #212121c9;
  position: relative;
  border-radius: .5em;
  display: inline-block;
  padding: 1em;
}

.replietTweetText:after {
	content: '';
	position: absolute;
	right: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-left-color: #eceff1c0;
	border-right: 0;
	margin-top: -20px;
	margin-right: -20px;
}

.tweetTextActive{
font-family: "Montserrat", sans-serif;
font-weight: 500;
background-color: #182848;
color: rgba(255, 255, 255, 0.884);
position: relative;
border-radius: .5em;
display: inline-block;
padding: 1em;
}

.tweetTextActive:after {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	width: 0;
	height: 0;
	border: 20px solid transparent;
	border-right-color: #182848;
	border-left: 0;
	margin-top: -20px;
	margin-left: -20px;
}

.userInfoTextColor
{
  color: #043949e8;
}

.textDateTime{
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  margin-top: -0.3rem;
  font-size: 11px;
  color: #0278bdad;
}

.textTweetTo{  
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  
}

.tweetToTextContainer{
text-align: start;
vertical-align: middle;
line-height: 48px;
}

.tweetFromTextContainer{
text-align: start;
vertical-align: middle;
line-height: 48px;
}
.descriptionStyle{
  font-size: 14px;
}
</style>
<script>
import axios from 'axios'
import Twit from 'twit'
import ListTweets from '../graphql/ListTweets.gql'
import { SyncLoader } from "vue-spinner/dist/vue-spinner.min.js";


  export default {
    components: {
      SyncLoader
    },
    data() {
      return {
          modal0: false,
          activeItemId: "1",
          modalerror: false,
          tweetText: "",
          color: "#1180EF",
          size: "25px",
          margin: "2px",
          radius: "2px",
          progressState: false,
          idstr: this.$store.state.userTwitterId,
          selectedTweet: '',
          isUpdating: 0,
          tweetSize: 50
         };
    },
    computed:{
        getUserName(){
            this.tweetText = ""
            return this.$store.getters.getUsername
        },
        getScreenName(){
            return this.$store.getters.getScreenName
        },
        getScreenNameForInputArea(){
            return "Send Reply To @"+this.$store.getters.getScreenName
        },
        getTweetCount(){
            return this.$store.getters.getTweetCount.toString()
        },
        getFollowersCount(){
            return this.$store.getters.getFollowerCount.toString()
        },
        getDescription(){
            return this.$store.getters.getDescription 
        },
        getTweets(){
            this.selectedTweet = this.$store.getters.getTweets.slice(0).reverse()[this.$store.getters.getTweets.length -1].id_str;
            this.activeItemId = this.$store.getters.getTweets.length-1
            return this.$store.getters.getTweets
        },
        getUserImageURL(){
            return this.$store.state.userData.profile_image_url 
        }
    },
    updated(){
    },
    methods: {
      validate(){
          if(this.tweetText==""){
          this.modalerror = true
        }
          else{
            this.modal0 = true
          }
      },
      seeProfile(){
        this.$store.commit("setProfileTwitterId",this.$store.getters.getUserID)
        this.$router.push('profile')
      },
      setActiveItemId(itemIndex) {
      this.activeItemId = itemIndex;
    },
      setCurentTweetToReply(data){
        this.selectedTweet = data
      },
      scrollToBottom(){
        var container = this.$el.querySelector("#tweetContainer");
        container.scrollTop = container.scrollHeight;
      },
      sendTweet(){
        this.progressState = true;
        axios.post('https://twittercsdnew.herokuapp.com/sendTweet', {
                    id: this.selectedTweet,
                    statusText: '@'+this.$store.getters.getScreenName+' '+this.tweetText,
                    access_token: this.$store.state.access_token,
                    access_token_secret: this.$store.state.access_secret,
                })
                .then(response =>{
                  console.log("Success")
                  this.progressState = false;
                  this.modal0 = false;
                  this.tweetText = '';
                  setTimeout(() => this.tweetSize++, 2000);
                })
                .catch(error => {
                  console.log("error")
                });
        
      },
      getLocalTime(datetime){
            var myDate = new Date(datetime)
            var inStr = myDate.toString().split(" ")
            return myDate.toLocaleTimeString()+" "+ inStr[0]+" "+inStr[2]+" "+inStr[1]+" "+inStr[3]
        }  
    },
    mounted() {
    }
  };
</script>