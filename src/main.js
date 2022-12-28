import firebase from "firebase/app";
import "firebase/auth";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseModal from "@/components/UI/BaseModal";
import BaseLoading from "@/components/UI/BaseLoading";

const app = createApp(App);

app.use(store);
app.use(router);

app.component("base-modal", BaseModal);
app.component("base-loading", BaseLoading);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    // app.mount("#app");
    // console.log(app)
  }
});

app.mount("#app");
