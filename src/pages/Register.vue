<template>
  <div class="container-sm">
    <b-form @submit.prevent="register">
      <b-form-group id="input-group-1" label="Name:" label-for="input-1">
        <b-form-input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Enter your name"
          v-model="name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Email address:"
        label-for="input-2"
        description="Email must be valid and will be used to login"
      >
        <b-form-input
          type="email"
          name="email"
          id="email"
          required
          placeholder="Enter your email"
          v-model="email"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Password:"
        label-for="input-3"
        description="Password must contain at least 6 characters"
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
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("register", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$router.push({ name: "login" });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>
