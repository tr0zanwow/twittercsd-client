<template>
  <card class="card-stats" :show-footer-line="true">
    <div class="row">

      <div class="col">
        <slot>
          <h5 class="card-title text-uppercase text-muted mb-0" v-if="title">{{title}}</h5>
          <p id="subtitleText" class="h2 font-weight-bold mb-0" v-if="subTitle">{{subTitle}}</p>
          <span id="twitterUserDescription" class="h2 font-weight-bold mb-0" v-if="description">{{description}}</span>
        </slot>
      </div>

      <div class="col-auto" v-if="$slots.icon || icon">
        <slot name="icon">
          <div class="icon icon-shape text-white rounded-circle shadow"
               :class="[`bg-${type}`, iconClasses]">
            <i :class="icon"></i>
          </div>
        </slot>
      </div>
    </div>

    <p class="mt-3 mb-0 text-sm">
      <slot name="footer">

      </slot>
    </p>
  </card>
</template>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css?family=Open+Sans&display=swap');
h5{
    font-family: 'Montserrat', sans-serif;
}
span{
    font-family: 'Open Sans', sans-serif;
}
#twitterUserDescription{
    font-size: 14px;
}
#subtitleText{
  font-size: 14px;
  white-space: nowrap; 
  width: 10em; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
</style>
<script>
  import Card from './Card.vue';

  export default {
    name: 'stats-card',
    components: {
      Card
    },
    props: {
      type: {
        type: String,
        default: 'primary'
      },
      icon: String,
      title: String,
      subTitle: String,
      iconClasses: [String, Array],
      description: String
    }
  };
</script>