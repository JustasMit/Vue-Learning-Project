<template>
  <div></div>
</template>
<script>
export default {
  created() {
    // eslint-disable-next-line no-unused-vars
    this.$store.dispatch("destroyToken").then(response => {
      this.$router.push({ name: "home" });
    });
  }
};
</script>
