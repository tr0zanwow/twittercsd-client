<template>
    <div>
        <base-header type="gradient-info" class="pb-6 pb-8 pt-5 pt-md-8">

        </base-header>
        <ApolloQuery :query="require('../graphql/getUserInfo.gql')" :variables="{idstr}">
                    <template v-slot="{result:{loading,error,data}, isLoading}" >
        <div class="container-fluid mt--9">
            <div class="row justify-content-center">
                <div class="col-xl-6 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">  
                                    <img :src="getUserFullImage" class="rounded-circle">
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
                                            <span class="heading">{{data.twitter.user.tweets_count}}</span>
                                            <span class="description">Tweet Counts</span>
                                        </div>
                                        <div>
                                            <span class="heading">{{data.twitter.user.followers_count}}</span>
                                            <span class="description">Follower Counts</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>{{getUsername}}</h3>
                                <div class="h5 font-weight-300">
                                    <i class="fa fa-at"></i> {{data.twitter.user.screen_name}}
                                </div>
                                <div class="h5 mt-4">
                                    <i class="ni business_briefcase-24 mr-2"></i>Account Created
                                </div>
                                <div class="h5 font-weight-300">
                                    <i class="ni education_hat mr-2"></i>{{data.twitter.user.created_at}}
                                </div>
                                <hr class="my-4" />
                                <p>{{data.twitter.user.description}}</p>
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
<script>
  import ProjectsTable from './Tables/ProjectsTable'
  export default {
    name: 'tables',
    components: {
      ProjectsTable
    },
     data(){
      return{
          idstr : this.$store.state.userTwitterId
      }},
    computed:{
        getUserFullImage(){
           return this.$store.getters.getUserImage
        },
        getUsername(){
           return this.$store.state.userName
        }
    }
  };
</script>
<style></style>
