<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">

        </base-header>
        <ApolloQuery :query="require('../graphql/getUserInfo.gql')" :variables="{idstr}">
                    <template v-slot="{result:{loading,error,data}, isLoading}" >

                <div id="progressloader" v-if="isLoading && loading">
                <sync-loader
                  :loading="isLoading ? true : false"
                  :color="color"
                  :size="size"
                ></sync-loader>
            </div>
            <div v-else>
                <div class="container-fluid mt--9">
            <div class="row justify-content-center">
                <div class="col-xl-6 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">  
                                    <img :src="getFullImage(data.user.profile_image_url_https)" class="rounded-circle">
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-end">
                                <base-button size="sm" type="danger" class="float-right">Log Out</base-button>
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <div>
                                            <span class="heading">{{data.user.tweets_count}}</span>
                                            <span class="description">Tweet Counts</span>
                                        </div>
                                        <div>
                                            <span class="heading">{{data.user.followers_count}}</span>
                                            <span class="description">Follower Counts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>{{data.twitter.user.name}}</h3>
                                <div class="h5 font-weight-300">
                                    <i class="fa fa-at"></i> {{data.user.screen_name}}
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>Account Created
                                </div>
                                <div class="h5 font-weight-300">
                                    <i class="ni education_hat mr-2"></i>{{getCreatedAt(data.user.created_at)}}
                                </div>
                                <hr class="my-4" />
                                <p>{{data.user.description}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
        </template>
                </ApolloQuery>

    </div>
</template>
<style lang="scss" scoped>
#progressloader{
  margin: 0;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-55%, -50%);
}
</style>
<script>
import { SyncLoader } from "vue-spinner/dist/vue-spinner.min.js";

  export default {
    name: 'tables',
    components: {
        SyncLoader
    },
     data(){
      return{
          idstr: this.$store.getters.getProfileTwitterId,
          color: "#fff",
          size: "25px",
          margin: "2px",
          twitter: [],
          radius: "2px",
      }},
    methods:{
        getCreatedAt(data){
            var temp = [];
            temp = data.split(" ")
            return temp[0]+' '+temp[1]+' '+temp[2]+' '+temp[5];
        },
        getFullImage(data){
            var mod = data.replace("_normal","_400x400")
            return mod
        }
    }
  };
</script>
<style></style>
