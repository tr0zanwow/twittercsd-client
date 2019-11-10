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
            <!--Tables-->
            <div class="row mt-0" v-if="getDescription!='nodata'">
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
                    <page-visits-table></page-visits-table>
                </div>
            </div>
            <!--End tables-->
        </div>

    </div>
</template>
<script>
  import SocialTrafficTable from './Dashboard/SocialTrafficTable';
  import PageVisitsTable from './Dashboard/PageVisitsTable';

  export default {
    components: {
      PageVisitsTable,
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
        }
    },
    methods: {
      
    },
    mounted() {
    }
  };
</script>
<style></style>
