<template>
  <div class="form-wrap">
    <form class="login">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" to="/signup">Signup</router-link>
      </p>
      <h2>Login to FireBlogs</h2>
      <div class="inputs">
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

      <p>
        Forgot Your Password!
        <router-link class="forgot-password" to="/forgot-password"
          >Reset It From Here</router-link
        >
      </p>

      <button @click.prevent="signIn">Sign In</button>

      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },

  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/home");
          this.error = false;
          this.errorMsg = "";
          console.log(firebase.auth().currentUser.uid);
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = err.message;
        });
    },
  },
};
</script>

<style lang="scss">
.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: #000;
    }
  }

  form {
    padding: 0 10px;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;
      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }

        .icon {
          width: 12px;
          position: absolute;
          left: 6px;
        }
      }
    }

    .forgot-password {
      text-decoration: none;
      color: #000;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: #fff;
      transform: rotateZ(3deg);
      width: 60px;
      height: 101%;
      right: -30px;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 1;
    width: 100%;
    height: 100%;
    background: url("@/assets/background.png") center center/cover no-repeat;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
