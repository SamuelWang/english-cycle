<template>
  <div>
    <ec-header></ec-header>
    <main class="container-md">
      <h1>{{ pageHeading }}</h1>
      <router-view></router-view>
    </main>
    <ec-footer></ec-footer>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  components: {
    EcHeader: Header,
    EcFooter: Footer
  },
  computed: {
    pageHeading() {
      return this.$store.state.pageHeading;
    }
  }
};
</script>

<style>
main {
  min-height: 60vh;
}
</style>