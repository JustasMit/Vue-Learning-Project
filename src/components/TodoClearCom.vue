<template>
  <div>
    <button :disabled="!enableClearButton" @click="clearCompleted">
      Clear completed
    </button>
  </div>
</template>

<script>
import { EventBus } from "./event-bus";
export default {
  name: "todo-clear-completed",
  props: {
    enableClearButton: {
      type: Number,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      EventBus.$emit("clearCompleted");
    }
  }
};
</script>
