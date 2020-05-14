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
      return this.$store.getters["todo/remaining"];
    }
  },
  methods: {
    checkAll() {
      this.$store.dispatch("todo/checkAll", event.target.checked);
    }
  }
};
</script>
