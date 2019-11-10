<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-9 pt-5 pt-md-9">
            <!-- Card stats -->
            <div style="margin-top:-60px" class="row">
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Name"
                                type="gradient-red"
                                :sub-title="getUserName"
                                icon="fa fa-user"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Screen Name"
                                type="gradient-orange"
                                :sub-title="getScreenName"
                                icon="fa fa-at"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>
                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Tweet Count"
                                type="gradient-green"
                                :sub-title="getTweetCount"
                                icon="fa fa-sort"
                                class="mb-4 mb-xl-0"
                    >
                    </stats-card>

                </div>
                <div class="col-xl-3 col-lg-6">
                    <stats-card title="Followers"
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
            <div class="row mt-0" v-if="getDescription!=''">
                <div class="col-xl-12 col-lg-6">
                    <stats-card title="Description"
                                type="gradient-blue"
                                :description="getDescription"
                                icon="fa fa-sticky-note"
                                class="mb-4 mb-xl-0">
                    </stats-card>

                </div>
            </div>
            <div class="row mt-3">
                <div class="col-xl-12 mb-5 mb-xl-0">
                    <div class="card">
                        <div class="card-body border-0">
                        <div class="row justify-content-start">
                            <div class="col-md-1  text-left justify-content-start">
                            <span class="avatar avatar-l rounded-circle">
                            <img v-bind:src="getUserImageURL">
                            </span>
                            </div>
                            <div class="col-md-7 text-left">
                            <span><h3 id="tweetedText" class="mb-5 tweetText">{{getTweetText}}</h3></span>
                            </div>
                            </div>
                        </div>
                        <!-- <div class="row justify-content-end">
                            <div id="tweeteetingTextList" class="col-md-6 text-right">
                            <h3 id="tweetingText" class="mb-3 tweetText">{{getTweetText}}</h3>
                            </div>
                        </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>





    </div>
</template>
<style lang="scss" scoped>
 #tweetedText{
     margin-left: -10px;
 }
 #tweetingText{
     margin-right: -10px;
 }
 .tweetText{
     font-size: 15px;
 }

// #tweetedTextList{
//     margin-left: -10px;
// }
// #tweeteetingTextList{
//     margin-right: -10px;
// }
</style>
<script>
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';

  export default {
    components: {
      SocialTrafficTable,
    },
    data() {
      return {
         };
    },
    computed:{
        getUserName(){
            return this.$store.getters.getUsername
        },
        getScreenName(){
            return this.$store.getters.getScreenName
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
      
    },
    mounted() {
    }
  };
</script>
<style></style>
