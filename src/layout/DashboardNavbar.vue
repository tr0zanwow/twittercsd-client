<template>
    <base-nav class="navbar-top navbar-dark"
              id="navbar-main"
              :show-toggle-button="false"
              expand>

        <ul class="navbar-nav align-items-center d-none d-md-flex mr-4 d-none d-md-flex ml-lg-auto">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-1">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" v-bind:src="getImageUrl">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{getUname}}</span>
                        </div>
                    </div>

                    <template>
                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Welcome!</h6>
                        </div>
                        <a @click="setUserID" href="/#/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>My profile</span>
                        </a>
                        <a href="/#/about" class="dropdown-item">
                            <i class="fa fa-info-circle"></i>
                            <span>About</span>
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="/#/login" @click="signOut()" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span>Logout</span>
                        </a>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        uname:''
      };
    },
    computed:{
      getUname(){
        return this.$store.state.userName
      },
      getImageUrl(){
        return this.$store.getters.getUserImage
      }
    },
    methods: {
      setUserID(){
        this.$store.commit("setProfileTwitterId",this.$store.state.userTwitterId)
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
      signOut(){
        this.$store.dispatch("logout");
      }
    }
  };
</script>