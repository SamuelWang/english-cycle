<template>
  <div class="container-md py-3">
    <h1>Portal</h1>
  </div>
</template>

<script>
export default {
  created() {
    this
      .$services()
      .authenticateUser()
      .then(() => {
        
      })
      .catch(error => {
        
      });
  }
};
</script>