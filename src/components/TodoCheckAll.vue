<template>
  <div>
    <label>
      <input type="checkbox" :checked="!getRemaining" @change="checkAll" />
      Check all
    </label>
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
