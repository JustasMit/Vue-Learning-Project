<template>
  <div>
    <b-row style="margin: auto">
      <b-button
        variant="danger"
        class="col-md mg-clr"
        :disabled="!enableClearButton"
        @click="clearCompleted"
      >
        Clear completed
      </b-button>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "todo-clear-completed",
  computed: {
    enableClearButton() {
      return this.$store.getters["todo/enableClearButton"];
    }
  },
  methods: {
    clearCompleted() {
      this.$store.dispatch("todo/clearCompleted");
    }
  }
};
</script>
