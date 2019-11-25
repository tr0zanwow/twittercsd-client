<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar :background-color="sidebarBackground" short-title="Twitter CSD" title="Twitter CSD">
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view ></router-view>
        </fade-transition>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    mounted(){
      this.setCreds()
    },
    sockets:{
      connect: function(){
        const creds = {
                        userTwitterId: this.$store.state.userTwitterId,
                        access_token: this.$store.state.access_token,
                        access_secret: this.$store.state.access_secret,
                    }
                    this.$socket.emit('creds', creds)
      }
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      },
      setCreds(){
        if(this.$store.state.isAuthenticated){
                    const creds = {
                        userTwitterId: this.$store.state.userTwitterId,
                        access_token: this.$store.state.access_token,
                        access_secret: this.$store.state.access_secret,
                    }
                    this.$socket.emit('creds', creds)
                }
      }
    }
  };
</script>
