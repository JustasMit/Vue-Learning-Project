<template>
  <div>
    <b-jumbotron
      header="To do"
      lead="Yet another 'to do' application made with Vue"
    >
      <b-link href="https://github.com/JustasMit/vueApp">GitHub</b-link>
      <hr />
      <b-button variant="success" :to="{ name: 'login' }"
        >Go to login page</b-button
      >
    </b-jumbotron>
  </div>
</template>
