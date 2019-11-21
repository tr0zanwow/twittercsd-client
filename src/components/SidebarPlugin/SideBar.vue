<template>
  <nav 
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <router-link class="navbar-brand" to="/">
      <strong id="brandTitle">Twitter CSD</strong><br />
      <p id="brandSubtitle"><small>Customer Support Desk</small></p>
    </router-link>
      <span id="recentLabelRefreshContainer"><span id="recentLabel h4">Recent Tweets</span></span>
      <hr class="my-3">
    <div class="navbar-collapse" id="sidenav-collapse-main">
      <ApolloQuery
        :query="require('../../graphql/getUserInfo.gql')"
        :variables="{ idstr }"
      >
        <template v-slot="{ result: { loading, error, data }, isLoading }">
          
          <ApolloQuery
            :query="require('../../graphql/ListTweets.gql')"
            :variables="{ query: '@'+data.twitter.user.screen_name, tweetSize }"
            :pollInterval="5000"
          >
            <template
              v-slot="{ result: { loading, error, data }, isLoading }"
              :onDone="onDone"
            >
              <div id="progressloader" v-if="isLoading && loading">
                <sync-loader
                  :loading="isLoading ? true : false"
                  :color="color"
                  :size="size"
                ></sync-loader>
              </div>
              <div id="userListContainer" v-else>
                <ul
                  v-for="(tweetUsers, itemIndex) in getData(data.twitter.search)"
                  :key="tweetUsers.id_str"
                  class="navbar-nav mb-3"
                >
                  <li
                    class="nav-item"
                    :class="{ active: activeItemId === itemIndex }"
                    @click="
                      setActiveItemId(itemIndex),
                        setUserData(getData(data.twitter.search)[itemIndex])"
                  >
                    <a id="listItemHref" class="nav-link">
                      <span class="avatar avatar-sm rounded-circle">
                        <img
                          v-bind:alt="tweetUsers.name"
                          v-bind:src="tweetUsers.profile_image_url"
                        /> </span
                      ><span id="twitterName">{{ tweetUsers.name }}</span>
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
@import url("https://fonts.googleapis.com/css?family=Montserrat:400|Rubik:400,500&display=swap");

::-webkit-scrollbar {
    display: block;
    width: 10px;
}
::-webkit-scrollbar-track {
    background-color: rgba(245, 245, 245, 0.151);
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #1180ef; 
}
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

#userListContainer{
  margin-top:-1.6rem;
}

#recentLabelRefreshContainer{
  margin-left: -0.9rem;

}

#recentLabel {
  margin-top: -1rem;
  font-size: 15px;
  font-family: "Montserrat", sans-serif;
}

#brandSubtitle {
  font-family: "Montserrat", sans-serif;
  margin-top: -5px;
}
#sidenav-collapse-main {
  margin-top: 0.5rem;
  height: 77vh;
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
import { SyncLoader } from "vue-spinner/dist/vue-spinner.min.js";

export default {
  name: "sidebar",
  components: {
    SyncLoader
  },
  data() {
    return {
      activeItemId: "1",
      color: "#1180EF",
      size: "25px",
      margin: "2px",
      radius: "2px",
      tweetSize: 100,
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
      var i = 0;
      var j = 0;
      var tempUser;
      var findDupUserTweets;
      var findFirstTweet;

      tempData.push(...val);
      for (i = 0; i < tempData.length; i++) {
        tempUser = {
                  id_str: tempData[i].user.id_str,
                  name: tempData[i].user.name,
                  screen_name: tempData[i].user.screen_name,
                  description: tempData[i].user.description,
                  profile_image_url: tempData[i].user.profile_image_url,
                  tweets_count: tempData[i].user.tweets_count,
                  followers_count: tempData[i].user.followers_count,
                  tweets: []
                };

            findFirstTweet = {
                  id_str: tempData[i].id_str,
                  created_at: tempData[i].created_at,
                  text: tempData[i].text
            };
         sortedData.push(tempUser)
         sortedData[i].tweets.push(findFirstTweet)   
        for (j = i + 1; j < tempData.length; j++) {
          if (tempData[i].user.id_str == tempData[j].user.id_str){
            findDupUserTweets = {
                  id_str: tempData[j].id_str,
                  created_at: tempData[j].created_at,
                  text: tempData[j].text
            };
            sortedData[i].tweets.push(findDupUserTweets)
            tempData.splice(j,1)
      }
      }
      }

      return sortedData;
      
    },
    setActiveItemId(itemIndex) {
      this.activeItemId = itemIndex;
    },
    setUserData(data) {
      this.$store.commit("setUserData", data);
      this.$router.push({ name: "dashboard", params: { isSet: true } });
    }
  }
};
</script>