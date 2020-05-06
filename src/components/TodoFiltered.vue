<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="filterChange('all')">
      All
    </button>
    <button
      :class="{ active: filter == 'active' }"
      @click="filterChange('active')"
    >
      Active
    </button>
    <button
      :class="{ active: filter == 'completed' }"
      @click="filterChange('completed')"
    >
      Completed
    </button>
  </div>
</template>

<script>
import { EventBus } from "./event-bus";
export default {
  name: "todo-filtered",
  data() {
    return {
      filter: "all"
    };
  },
  methods: {
    filterChange(filter) {
      this.filter = filter;
      EventBus.$emit("filterChanged", filter);
    }
  }
};
</script>
