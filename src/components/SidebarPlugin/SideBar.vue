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
     
              <div id="progressloader" v-if="isLoading">
                <sync-loader
                  :loading="isLoading"
                  :color="color"
                  :size="size"
                ></sync-loader>
              </div>
              <div id="userListContainer" v-else>
                <ul
                  v-for="(tweetUsers, itemIndex) in sortedData"
                  :key="itemIndex"
                  class="navbar-nav mb-3"
                >
                  <li
                    class="nav-item"
                    :class="{ active: activeItemId === itemIndex }"
                    @click="
                      setActiveItemId(itemIndex),
                        setUserData(sortedData[itemIndex])"
                  >
                    <a id="listItemHref" class="nav-link">
                      <span class="avatar avatar-sm rounded-circle">
                        <img
                          v-bind:alt="tweetUsers.user.name"
                          v-bind:src="tweetUsers.user.profile_image_url_https"
                        /> </span
                      ><span id="twitterName">{{ tweetUsers.user.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
            
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
      search: [],
      user:[],
      sortedData: [],
      radius: "2px",
      tweetSize: 100,
      isLoading: false,
      idstr: this.$store.state.userTwitterId
    };
  },
  props: {
  },
  provide() {
    return {
      autoClose: this.autoClose
    };
  },
  apollo:{
    user:{
      query: require('../../graphql/getUserInfo.gql'),
    variables () {
      return {
        idstr: this.idstr
      }
    },
    deep: false,
   
    result ({ data, loading, networkStatus }) {
  
    },
    error (error) {
    },
    loadingKey: 'loadingQueriesCount',
    watchLoading (isLoading, countModifier) {
    }

    },
    search: {
    query: require('../../graphql/listUsers.gql'),
    variables () {
      return {
        queryText: 'to:@'+this.user.screen_name,
        limit: this.tweetSize
      }
    },
    deep: false,
   
    result ({ data, loading, networkStatus }) {
      this.sortedData = data.search.filter((set => f => !set.has(f.user.id_str) && set.add(f.user.id_str))(new Set));
    },
    error (error) {

    },
    loadingKey: 'loadingQueriesCount',
    watchLoading (isLoading, countModifier) {
      this.isLoading = isLoading
    },
  },
  },
  methods: {
    setActiveItemId(itemIndex) {
      this.activeItemId = itemIndex;
    },
    refreshQuery(){
      
    },
    setUserData(data) {
      this.$store.commit("setUserData", data);
      this.$router.push({ name: "dashboard", params: { isSet: true } });
    }
  }
};
</script>