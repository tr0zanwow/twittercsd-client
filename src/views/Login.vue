<template>
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-7">
                <div class="card bg-secondary shadow border-0">
                    <div class="card-header bg-transparent pb-5">
                        <div class="mt-2 mb-5"></div>
                        <div class="btn-wrapper text-center">
                            <a @click="signIn()" class="btn btn-neutral btn-icon">
                                <span class="btn-inner--icon"><img src="img/icons/common/twitter.svg"></span>
                                <span class="btn-inner--text">Twitter</span>
                            </a>
                        </div>
                    </div>
                    <div class="card-body px-lg-6 py-lg-4">
                        <div class="text-center text-muted mb-4">
                            <div id="titleHeader" class="display-4">Twitter CSD</div>
                            <p id="subHeader">(Customer Support Desk)</p>
                        </div>
                        <div class="">A web app to efficiently manages tweet replies, list recent tweets and much more actions in just one platform</div>
                    </div>
                </div>
                <!-- <div class="row mt-3">
                    <div class="col-6">
                        <a href="#" class="text-light"><small>Forgot password?</small></a>
                    </div>
                    <div class="col-6 text-right">
                        <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
                    </div>
                </div> -->
            </div>
        </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
#titleHeader{
    font-family: 'Montserrat', sans-serif;
    margin-top: 5px;
}
#subHeader{
    font-family: 'Montserrat', sans-serif;
}
</style>
<script>
  export default {
    
    data() {
      return {
        model: {
          email: '',
          password: ''
        }
      }
    },
    methods:{
        signIn: function(){
            this.$store.dispatch("login")
        }
    }
  }
</script>