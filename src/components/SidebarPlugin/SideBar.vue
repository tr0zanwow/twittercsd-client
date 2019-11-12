<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main">

    <router-link class="navbar-brand" to="/">
      <strong id="brandTitle">Twitter CSD</strong><br>
      <p id="brandSubtitle"><small>Customer Support Desk</small></p>
    </router-link>
    
    <div class="navbar-collapse" id="sidenav-collapse-main">
          <h6 class="navbar-heading text-muted">Recent Tweets</h6>
          <ApolloQuery :query="require('../../graphql/getUserInfo.gql')" :variables="{idstr}">
            <template v-slot="{result:{loading,error,data}, isLoading}" >
              <!-- '@'+data.twitter.user.screen_name} -->
          <ApolloQuery :query="require('../../graphql/ListTweets.gql')" :variables="{ screenname: '@LoganPaul', tweetSize}">
            <template v-slot="{result:{loading,error,data}, isLoading}">
          <div id="progressloader" v-if="isLoading && loading">
              <sync-loader :loading="isLoading?true:false" :color="color" :size="size"></sync-loader>
          </div>
          <div  v-else>
            <ul v-for="(tweetUsers,itemIndex) in getData(data.twitter.search)" :key="tweetUsers.id_str" class="navbar-nav mb-md-3">
              <li class="nav-item" 
              :class="{'active': activeItemId === itemIndex}" @click="setActiveItemId(itemIndex),setUserData(data.twitter.search[itemIndex])">
                  <a id="listItemHref" class="nav-link">
                  <span class="avatar avatar-sm rounded-circle">
                    <img v-bind:alt="tweetUsers.user.name" v-bind:src="tweetUsers.user.profile_image_url">
                  </span><span id="twitterName">{{tweetUsers.user.name}}</span>
                  </a>
              </li>
          </ul>
        </div>
          </template>
        </ApolloQuery>
          </template>
        </ApolloQuery>
      </div>

  </nav>
</template>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat|Rubik:400,500&display=swap");

#progressloader {
  margin: 0;
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-55%, -50%);
}

#listItemHref {
  cursor: pointer;
}

#sidenav-main {
  overflow: hidden;
}

#brandSubtitle {
  font-family: "Montserrat", sans-serif;
  margin-top: -5px;
}
#sidenav-collapse-main {
  margin-top: -25px;
  height: 88vh;
  overflow: auto;
}
#twitterName {
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  margin-left: 8px;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80%;
  color: rgba(22, 22, 22, 0.74);
  font-size: 15px;
}
.nav-item {
  margin-right: 5px;
  margin-left: 5px;
  margin-top: -5px;
  margin-bottom: -5px;
  &.nav-item:hover {
    background-color: rgba(71, 71, 71, 0.062);
  }
  &.active {
    background-color: #1180ef;
    &.nav-item:hover {
      background-color: #1180ef;
    }
    #twitterName {
      color: rgba(255, 255, 255, 0.925);
    }
  }
}

.nav-link {
  margin-left: -15px;
}
</style>
<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import { SyncLoader } from "vue-spinner/dist/vue-spinner.min.js";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton,
    SyncLoader
  },
  data() {
    return {
      activeItemId: "1",
      color: "#1180EF",
      size: "25px",
      margin: "2px",
      radius: "2px",
      tweetSize: 30,
      idstr: this.$store.state.userTwitterId
    };
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/green.png",
      description: "Sidebar app logo"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  methods: {
    getData(val) {
      var sortedData = [];
      var tempData = [];
      tempData.push(...val);
      var temparray = {
        id_str: tempData[0].user.id_str,
        name: tempData[0].user.name,
        screen_name: tempData[0].user.screen_name,
        description: tempData[0].user.description,
        profile_image_url: tempData[0].user.profile_image_url,
        tweets_count: tempData[0].user.tweets_count,
        followers_count: tempData[0].user.followers_count,
        tweets: [
          {
            id_str: tempData[0].id_str,
            created_at: tempData[0].created_at,
            text: tempData[0].text
          }
        ]
      };
      var temparray1 = {
        id_str: tempData[0].id_str,
        created_at: tempData[0].created_at,
        text: tempData[0].text
      };
      sortedData.push(temparray);
      sortedData[0].tweets.push(temparray1);
      console.log(sortedData);
      return val;
    },
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    setActiveItemId(itemIndex) {
      this.activeItemId = itemIndex;
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    },
    setUserData(data) {
      this.$store.commit("setUserData", data);
      this.$router.push({ name: "dashboard", params: { isSet: true } });
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  }
};
</script>
