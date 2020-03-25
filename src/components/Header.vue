<template>
  <header>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <div class="container-md">
        <b-navbar-brand href="/">English Cycle</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#">Backlogs</b-nav-item>
            <b-nav-item href="#">Cycles</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#" v-if="!isLoggedIn">Login</b-nav-item>

            <b-nav-item-dropdown :text="userName" right v-if="isLoggedIn">
              <b-dropdown-item href="#">Logout</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
    
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return !!this.$store.state.user.email;
    },
    userName() {
      return this.$store.state.user.name;
    }
  }
};
</script>