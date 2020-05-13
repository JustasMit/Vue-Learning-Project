<template>
  <div class="container-sm">
    <b-form @submit.prevent="login">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          type="email"
          name="username"
          id="username"
          required
          placeholder="Enter your email"
          v-model="username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2"
        description="No special requirements"
      >
        <b-form-input
          type="password"
          name="password"
          id="password"
          required
          placeholder="Enter your password"
          v-model="password"
        ></b-form-input>
      </b-form-group>
      <b-button class="col-lg-2" type="submit" variant="primary"
        >Submit</b-button
      >
      <b-button class="col-lg-2 float-right" type="reset" variant="danger"
        >Reset</b-button
      >
    </b-form>
    <div class="text-center">
      <b-spinner
        v-if="loadingLogin"
        style="margin-top: 20px"
        label="Loading..."
      ></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      loadingLogin: false
    };
  },
  methods: {
    async login() {
      this.loadingLogin = true;

      try {
        await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        this.$router.push({ name: "todo" });
      } catch (e) {
        this.password = "";
      } finally {
        this.loadingLogin = false;
      }
    },
    onReset(evt) {
      evt.preventDefault();
      this.form.email = "";
      this.form.password = "";
    }
  }
};
</script>
