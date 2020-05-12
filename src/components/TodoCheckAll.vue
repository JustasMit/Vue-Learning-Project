<template>
  <div>
    <b-form-checkbox
      :checked="!getRemaining"
      @change="checkAll"
      name="check-button"
      button
      button-variant="info"
    >
      Check all
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: "todo-check-all",
  computed: {
    getRemaining() {
      return this.$store.getters.remaining;
    }
  },
  methods: {
    checkAll() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>
