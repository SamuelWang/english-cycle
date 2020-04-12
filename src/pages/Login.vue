<template>
  <div class="container-md py-3">
    <h1>Login</h1>
    <div class="d-flex justify-content-center align-items-center py-5">
      <ec-google-button v-on:click="loginWithGoogle"></ec-google-button>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import EcGoogleButton from './../components/GoogleButton.vue';

export default {
  components: {
    EcGoogleButton
  },
  methods: {
    loginWithGoogle() {
      let self = this;
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

      self
        .$services()
        .signInWithPopup(provider)
        .then(() => {
          self.$router.push('/portal');
        });
    }
  }
};
</script>