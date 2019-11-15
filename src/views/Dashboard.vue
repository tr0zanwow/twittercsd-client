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
            :sub-title="getScreenName"
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
          <projects-table title="Light Table" style="max-height:28rem"></projects-table>
        </div>
      </div>
    </div>

  </div>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat|Rubik:400,500&display=swap");

.wrapper{
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
}
#scrollBody::-webkit-scrollbar {
    display: block;
    width: 10px;
}
#scrollBody::-webkit-scrollbar-track {
    background-color: rgba(245, 245, 245, 0.151);
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
#scrollBody::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #11CCEE; 
}
#userInfoContainer{
font-family: "Montserrat", sans-serif;
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
  // margin-top:0.5rem;
  display: inline-block;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eceff19f;
  color: #212121c9;
  border-radius: 20px;
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
</style>
<script>
import axios from 'axios'
import Twit from 'twit'
import ProjectsTable from './Tables/ProjectsTable'

  export default {
    components: {
      ProjectsTable
    },
    data() {
      return {
          modal0: false,
          modalerror: false,
          tweetText: "",
          idstr: this.$store.state.userTwitterId
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
            return this.$store.getters.getTweets
        },
        getUserImageURL(){
            return this.$store.state.userData.profile_image_url 
        }
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
      sendTweet(){
        axios.post('https://twittercsdnew.herokuapp.com/sendTweet', {
                    id: '1107667818944708609',
                    statusText: 'Twitter API Bot',
                    access_token: '562116157-qmGraijDrsVRI4yiam7S120oAGnDCIfuaDWPnmY1',
                    access_token_secret: 'MFrdnzx506Bk1N3oz0F8J1ZcRBBBqBMwZoW9VfjGKQMbH',
                })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
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