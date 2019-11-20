<template>
<div id="loginContainer" class="main-content bg-default">
        <base-nav class="navbar-top navbar-horizontal navbar-dark"
                  containerClasses="px-4 container"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
                <strong id="brandTitle">Twitter CSD</strong>
            </router-link>

        </base-nav>
        <div class="header bg-gradient-success py-7 py-lg-8">
            <div class="container">
                <div class="header-body text-center mb-7">
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2860 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <div id="pageContainer" class="container mt--9 pb-9">
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
            </div>
        </div>
        </div>
        
    </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

::-webkit-scrollbar{
        display: none;
}

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
    components: {
    },
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