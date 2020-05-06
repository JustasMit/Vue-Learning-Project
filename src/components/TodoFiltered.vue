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
export default {
  name: "todo-filtered",
  computed: {
    filter() {
      return this.$store.getters.filter;
    }
  },
  methods: {
    filterChange(filter) {
      this.$store.dispatch("filterChange", filter);
    }
  }
};
</script>
