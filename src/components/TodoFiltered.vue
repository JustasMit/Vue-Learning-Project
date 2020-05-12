<template>
  <div>
    <b-row style="margin: auto">
      <b-button variant="info" class="col-md mg-r" @click="filterChange('all')">
        All
      </b-button>
      <b-button
        variant="info"
        class="col-md mg-r mg-clr"
        @click="filterChange('active')"
      >
        Active
      </b-button>
      <b-button
        variant="info"
        class="col-md mg-clr"
        @click="filterChange('completed')"
      >
        Completed
      </b-button>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "todo-filtered",
  methods: {
    filterChange(filter) {
      this.$store.dispatch("filterChange", filter);
    }
  }
};
</script>
