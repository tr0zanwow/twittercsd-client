<template>
  <div>
    <base-header type="gradient-info" class="pb-6 pb-9 pt-5 pt-md-9">
      <!-- Card stats -->
      <div style="margin-top:-60px" class="row">
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

    <div class="container-fluid mt--8">
        
      <div class="row mt-0" v-if="getDescription != ''">
        <div class="col-xl-12 col-lg-6">
          <stats-card
            title="Description"
            type="gradient-blue"
            :description="getDescription"
            icon="fa fa-sticky-note"
            class="mb-4 mb-xl-0"
          >
          </stats-card>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <div class="card">
            <div class="card-body border-0">
              <div class="row justify-content-start">
                <div class="col-md-1 text-left justify-content-start">
                  <span class="avatar avatar-l rounded-circle">
                    <img v-bind:src="getUserImageURL" />
                  </span>
                </div>
                <div class="col-md-6  text-left">
                  <span
                    ><h3 id="tweetFrom" class="mb-5 tweetText">
                      {{ getTweetText }}
                    </h3></span
                  >
                </div>
              </div>
              <!-- <div class="row justify-content-end">
                <div class="col-md-6 text-right">
                  <span
                    ><h3 id="tweetTo" class="mb-3 tweetText">
                      {{ getTweetText }}
                    </h3></span
                  >
                </div>
                <div class="col-md-1  text-right justify-content-end">
                  <span class="avatar avatar-l rounded-circle">
                    <img v-bind:src="getUserImageURL" />
                  </span>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-1">
        <div class="col-xl-12 col-lg-6">
          <div class="card">
            <div class="card-body border-0">
                <div class="row">
                    <div class="col-xl-11 col-lg-6">
                        <textarea v-model="tweetText" class="form-control" id="tweetToSendTextArea" rows="1" :placeholder="getScreenNameForInputArea"></textarea>
                    </div>
                    <div class="col-xl-1 col-lg-6">
                        <button class="btn btn-icon btn-2 btn-primary" @click="sendTweet" type="button">
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
        
        <div class="py-3 text-center">
                <i class="fa fa-paper-plane fa-4x"></i>
                <h4 class="heading mt-4">Confirmation</h4>
                <p>Send: <br><strong>"{{tweetText}}"</strong><br><br>To: <br> <strong>@{{getScreenName}}</strong><br></p>
            </div>
        <template slot="footer">
                <base-button type="primary" >Send</base-button>
                <base-button type="danger" class="ml-auto" @click="modal0 = false">Close</base-button>
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
@import url("https://fonts.googleapis.com/css?family=Nunito:700&display=swap");

.tweetText {
  font-size: 15px;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  padding: 10px;
  margin-top: -2px;
  display: inline-block;
  border-radius: 25px;
  margin-top: 0px;
  background-color: rgba(77, 77, 77, 0.096);
  color: rgba(0, 0, 0, 0.733);
}

#tweetTo {
  margin-right: -35px;
}

#tweetToSendTextArea{
  resize: none;
}

#tweetFrom {
  margin-left: -35px;
}
</style>

<script>
import Twit from 'twit'

  export default {
    components: {
    },
    data() {
      return {
          modal0: false,
          modalerror: false,
          tweetText: ""
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
        getTweetText(){
            return this.$store.getters.getTweetText 
        },
        getUserImageURL(){
            return this.$store.state.userData.user.profile_image_url 
        }
    },
    methods: {
      sendTweet(){
          if(this.tweetText==""){
          this.modalerror = true
        }
          else{
            this.modal0 = true
          }
      }  
    },
    mounted() {
    }
  };
</script>