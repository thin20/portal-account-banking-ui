<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Logo"
      @back="
        () => {
          this.$router.push({ name: 'Home' });
        }
      "
    >
      <template slot="extra" v-if="!username">
        <router-link to="login">
          <a-button key="1"> Login </a-button>
        </router-link>
        <router-link to="Register">
          <a-button key="2"> Register </a-button>
        </router-link>
      </template>
      <template slot="extra" v-else>
        <span>{{ idRole }}: {{ username }}</span
        >&nbsp;&nbsp;
        <a-button
          type="danger"
          v-on:click="handleLogout"
          style="cursor: pointer"
          >Logout</a-button
        >
      </template>
    </a-page-header>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions["auth/logOut"],
    handleLogout() {
      let state = this.$store.dispatch("auth/logOut");
      if (state) {
        this.$router.push({ name: "Login" });
      }
    },
  },
  computed: {
    username() {
      console.log("Username: ", this.$store.state?.auth?.currentUser?.name);
      return this.$store.state?.auth?.currentUser?.name;
    },
    idRole() {
      return this.$store.state?.auth?.currentUser?.idRole;
    },
  },
};
</script>

<style>
</style>