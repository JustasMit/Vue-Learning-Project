<template>
  <div>
    <h2>Register</h2>
    <form action="#" @submit.prevent="register">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          id="name"
          class="login-input"
          v-model="name"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="login-input"
          v-model="email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          id="password"
          class="login-input"
          v-model="password"
        />
      </div>
      <div>
        <button type="submit" class="btn-submit">Create</button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      this.$store
        .dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.$router.push({ name: "login" });
        });
    }
  }
};
</script>
