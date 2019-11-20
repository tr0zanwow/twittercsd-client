<template>
    <div id="loginContainer">
       <base-nav class="navbar-top navbar-horizontal navbar-dark"
                  containerClasses="px-4"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
                <strong id="brandTitle">Twitter CSD</strong>
            </router-link>

        </base-nav>
       <div id="pageContainer" class="container">
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
#pageContainer{
    padding-top:16vh;
    width:80%;
}

#loginContainer{
    width: 100%;
	height: 100vh;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

#brandTitle{
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    color: #fff;
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