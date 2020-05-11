<template>
  <div>
    <h2>Login</h2>
    <form action="#" @submit.prevent="login">
      <div>
        <label>Email</label>
        <input
          type="email"
          name="username"
          id="username"
          class="login-input"
          v-model="username"
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
        <button type="submit" class="btn-submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      this.$store
        .dispatch("loginToken", {
          username: this.username,
          password: this.password
        })
        // eslint-disable-next-line no-unused-vars
        .then(response => {
          this.$router.push({ name: "todo" });
        });
    }
  }
};
</script>
