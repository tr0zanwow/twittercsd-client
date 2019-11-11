<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <router-link class="navbar-brand" to="/">
                <strong id="brandTitle">Twitter CSD</strong><br>
                <p id="brandSubtitle"><small>Customer Support Desk</small></p>
            </router-link>

            <slot></slot>
            
              <div class="navbar-collapse collapse show" id="sidenav-collapse-main">
                  <h6 class="navbar-heading text-muted">Recent Tweets</h6>
                  <ApolloQuery :query="require('../../graphql/ListTweets.gql')">
                    <template v-slot="{result:{loading,error,data}}">
                  <ul v-for="(tweetUsers,itemIndex) in data.twitter.search" :key="tweetUsers.id_str" class="navbar-nav mb-md-3">
                      <li class="nav-item" 
                      :class="{'active': activeItemId === itemIndex}" @click="setActiveItemId(itemIndex),setUserData(data.twitter.search[itemIndex])">
                          <a id="listItemHref" class="nav-link">
                          <span class="avatar avatar-sm rounded-circle">
                            <img v-bind:alt="tweetUsers.user.name" v-bind:src="tweetUsers.user.profile_image_url">
                          </span><span id="twitterName">{{tweetUsers.user.name}}</span>
                          </a>
                      </li>
                  </ul>
                  </template>
            </ApolloQuery>
              </div>

            </div>
    </nav>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat|Rubik:400,500&display=swap');

#listItemHref{
  cursor: pointer;
}
#brandSubtitle{
font-family: 'Montserrat', sans-serif;
margin-top: -5px;
}
#sidenav-collapse-main{
margin-top: -30px;
}
#twitterName{
    font-family: 'Rubik', sans-serif;
    font-weight: 500;
    margin-left: 8px;
    display:inline-block; 
    text-overflow:ellipsis;
    overflow:hidden; 
    width:80%;
    color:rgba(22, 22, 22, 0.74);
    font-size: 15px;
}
.nav-item{
  margin-right: 5px;
  margin-left: 5px;
  margin-top: -5px;
  margin-bottom: -5px;
  &.nav-item:hover{
    background-color: rgba(71, 71, 71, 0.062);
  };
  &.active{
  background-color: #1180EF; 
    &.nav-item:hover{
    background-color: #1180EF;
  }
  #twitterName{
    color: rgba(255, 255, 255, 0.925);
    
  }
    }
}

.nav-link{
  margin-left: -15px
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
        activeItemId: '1'
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
      setActiveItemId(itemIndex) {
        this.activeItemId = itemIndex;
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      },
      setUserData(data){
        this.$store.commit("setUserData",data);
        this.$router.push({name: 'dashboard', params: { isSet: true}})
      }
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    }
  };
</script>
