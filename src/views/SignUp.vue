<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" to="/login">Login</router-link>
      </p>
      <h2>Create your FireBlogs Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <img
            src="@/assets/Icons/user-alt-light.svg"
            alt="icon"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <img
            src="@/assets/Icons/user-alt-light.svg"
            alt="icon"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="text" placeholder="Username" v-model="username" />
          <img
            src="@/assets/Icons/user-alt-light.svg"
            alt="icon"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <img
            src="@/assets/Icons/envelope-regular.svg"
            alt="icon"
            class="icon"
          />
        </div>

        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <img
            src="@/assets/Icons/lock-alt-solid.svg"
            alt="icon"
            class="icon"
          />
        </div>

        <div class="error" v-show="error">{{ errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>

      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import db from "@/firebase/firebaseinit";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },

  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" &&
        this.username !== ""
      ) {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await firebase.auth();
        const createUser = await firebaseAuth.createUserWithEmailAndPassword(
          this.email,
          this.password
        );
        const result = await createUser;
        const dataBase = db.collection("users").doc(result.user.uid);
        await dataBase.set({
          firstName: this.firstName,
          lastName: this.lastName,
          username: this.username,
          email: this.email,
          admin: false,
        });
        this.$router.push("/home");
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>
