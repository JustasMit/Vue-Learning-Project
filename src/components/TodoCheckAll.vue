<template>
  <div>
    <label>
      <input type="checkbox" :checked="!remaining" @change="allChecked" />
      Check all
    </label>
  </div>
</template>

<script>
import { EventBus } from "./event-bus";
export default {
  name: "todo-check-all",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  },
  methods: {
    allChecked() {
      EventBus.$emit("checkAllChanged", this.remaining);
    }
  }
};
</script>
