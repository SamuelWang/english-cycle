<template>
  <div>
    <ec-header></ec-header>
    <main>
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
  }
};
</script>