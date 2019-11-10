<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <router-link class="navbar-brand" to="/">
                <strong id="brandTitle">Twitter CSD</strong>
            </router-link>

            <slot></slot>
            <ApolloQuery :query="require('../../graphql/ListTweets.gql')">
              <template v-slot="{result:{loading,error,data}}">
            <div v-if="!loading" class="navbar-collapse collapse show" id="sidenav-collapse-main">
                <h6 class="navbar-heading text-muted">Recent Tweets</h6>
                <ul v-for="tweetUsers in data.twitter.search" :key="tweetUsers.id_str" class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link" href="#/">
                        <span class="avatar avatar-sm rounded-circle">
                          <img v-bind:alt="tweetUsers.user.name" v-bind:src="tweetUsers.user.profile_image_url">
                        </span><span id="twitterName">{{tweetUsers.user.name}}</span>
                        </a>
                    </li>
                </ul>
            </div>
            </template>
            </ApolloQuery>
            </div>
    </nav>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Karla&display=swap');

#twitterName{
    font-family: 'Karla', sans-serif;
    font-weight: bold;
    margin-left: 8px;
    display:inline-block; 
    text-overflow:ellipsis;
    overflow:hidden; 
    width:80%;
    font-size: 15px;
}
.nav-item{
  margin-right: 5px;
  margin-left: 5px;
  margin-top: -5px;
  margin-bottom: -5px;
  &.nav-item:hover{
    background-color: rgba(21, 223, 105, 0.11);
  };
}

.nav-link{
  margin-left: -15px
}
   
.nav-item > active{
  color: rgb(18, 214, 106);
}

</style>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton'

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    data(){
      return{
      }
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
