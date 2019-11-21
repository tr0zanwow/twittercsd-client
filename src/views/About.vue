<template>
    <div>
        <base-header class="header pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 500px; background-image: url(https://hdwallpapers.imgix.net/freestockphotos-449015656762645rgrr0vb1m.jpg?auto=compress&cs=tinysrgb&dpr=1); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-2"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center mt--9">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Pranil Rathod <small class="h4 text-white">Tr0zAnwOw~</small></h1>
                        <p class="text-white mt-0" style="width:80vw">Full Stack Developer / Mobile App Developer</p>
                      
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--9">
            <div class="row">
                <div class="col-xl-12 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Made with <i class="fa fa-heart text-red"></i></h3>
                                </div>
                            </div>
                        </div>
                        <template>
                            <div class="row container align-items-center justify-content-center">
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://firebasestorage.googleapis.com/v0/b/digitalschoolindia1337.appspot.com/o/Vue.js_Logo.svg?alt=media&token=cc9c7dd2-e0e5-4cbf-a1dd-a9ede65bce40" height="150" width="70"/>
                                    </svg>
                                </div>
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://firebase.google.com/downloads/brand-guidelines/SVG/logo-standard.svg" height="150" width="130"/>
                                    </svg>
                                </div>
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://firebasestorage.googleapis.com/v0/b/digitalschoolindia1337.appspot.com/o/apollo.svg?alt=media&token=591112c2-cb35-4646-bc0f-17c3c7281269" height="150" width="130"/>
                                    </svg>
                                </div>
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://www.vectorlogo.zone/logos/graphql/graphql-ar21.svg" height="150" width="130"/>
                                    </svg>
                                </div>
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://brand.heroku.com/static/media/heroku-logotype-horizontal.81c49462.svg" height="150" width="130"/>
                                    </svg>
                                </div>
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" height="150" width="70"/>
                                    </svg>
                                </div>
                                <div class="col-sm-2 ml-4 mt--2">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">       
                                      <image xlink:href="https://user-images.githubusercontent.com/8939680/57233884-20344080-6fe5-11e9-8df3-0df1282e1574.png" height="150" width="130"/>
                                    </svg>
                                </div>
                            </div>
                        </template>
                    </card>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
::-webkit-scrollbar{
        display: none;
}
</style>
<script>
  export default {
    name: 'user-profile',
    data() {
      return {
        model: {
          username: '',
          email: '',
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          country: '',
          zipCode: '',
          about: '',
        }
      }
    },
  };
</script>
<style></style>
