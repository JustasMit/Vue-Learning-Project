<template>
  <div>
    <button :disabled="!enableClearButton" @click="clearCompleted">
      Clear completed
    </button>
  </div>
</template>

<script>
export default {
  name: "todo-clear-completed",
  computed: {
    enableClearButton() {
      return this.$store.getters.enableClearButton;
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    }
  }
};
</script>
