<template>
  <div class="ec-btn-google" v-on:click="clickButton">
    <div class="wrapper">
      <div class="icon"></div>
      <div class="content">{{ text }}</div>
    </div>
  </div>
</template>

<style>
.ec-btn-google {
  background-color: #4285f4;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
}

.ec-btn-google:hover {
  box-shadow: 0px 0px 3px #4285f4;
}

.ec-btn-google:active {
  background-color: #3367d6;
}

.ec-btn-google .wrapper {
  border: 1px solid transparent;
}

.ec-btn-google .icon {
  background: transparent url('./../images/btn_google_dark_normal_ios.svg') 0px
    50% no-repeat;
  background-position: top -1.5px left -1.5px;
  border-radius: 3px;
  display: inline-block;
  width: 42px;
  height: 42px;
  vertical-align: middle;
}

.ec-btn-google .content {
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  padding: 0px 15px 0px 10px;
  vertical-align: middle;
}
</style>

<script>
export default {
  props: {
    text: {
      type: String,
      required: false,
      default: 'Sign in with Google',
    },
  },
  methods: {
    clickButton() {
      this.$emit('click');
    }
  },
};
</script>
