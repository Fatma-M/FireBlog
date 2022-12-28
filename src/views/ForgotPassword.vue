<template>
  <div class="reset-password">
    <base-modal
      @close-modal="closeModal"
      v-if="modalActive"
      :modalMessage="modalMessage"
    ></base-modal>
    <base-loading v-if="loading"></base-loading>
    <div class="form-wrap">
      <form class="reset">
        <p class="login-register">
          Back to
          <router-link to="/login" class="router-link">Login</router-link>
        </p>
        <h2>Reset Password</h2>
        <p>Forgot Your Password? Enter Your email To Reset It.</p>
        <div class="inputs">
          <div class="input">
            <input type="email" placeholder="Email" v-model="email" />
            <img
              src="@/assets/Icons/envelope-regular.svg"
              alt="icon"
              class="icon"
            />
          </div>
        </div>
        <button @click.prevent="resetPassword">Reset</button>
        <div class="angle"></div>
      </form>
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      modalActive: null,
      modalMessage: "",
      loading: null,
    };
  },

  methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage =
            "If your account exists, you will receive a email";
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },

    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;

  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        margin-bottom: 32px;
        text-align: center;
      }
    }
  }
}
</style>
