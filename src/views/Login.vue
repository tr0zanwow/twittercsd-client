<template>
        <div class="row justify-content-center">
            <div class="col-lg-5 col-md-7">
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
                    <div class="card-body px-lg-5 py-lg-4">
                        <div class="text-center text-muted mb-4">
                            <div id="titleHeader" class="display-4">Twitter CSD</div>
                            <p id="subHeader">(Customer Support Desk)</p>
                        </div>
                        <form role="form">
                            <base-input class="input-group-alternative mb-3"
                                        placeholder="Email"
                                        addon-left-icon="ni ni-email-83"
                                        v-model="model.email">
                            </base-input>

                            <base-input class="input-group-alternative"
                                        placeholder="Password"
                                        type="password"
                                        addon-left-icon="ni ni-lock-circle-open"
                                        v-model="model.password">
                            </base-input>

                            <base-checkbox class="custom-control-alternative">
                                <span class="text-muted">Remember me</span>
                            </base-checkbox>
                            <div class="text-center">
                                <base-button type="primary" class="my-4">Sign in</base-button>
                            </div>
                        </form>
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