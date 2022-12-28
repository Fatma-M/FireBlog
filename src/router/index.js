import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import BlogsView from "../views/BlogsView.vue";
import LogIn from "../views/LogIn.vue";
import SignUp from "../views/SignUp.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Profile from "../views/ProfileView.vue";
import CreatePost from "../views/CreatePost.vue";
import ViewBlog from "../views/ViewBlog.vue";
import EditBlog from "../views/EditBlog.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/home",
    redirect: "/",
  },
  {
    path: "/blogs",
    name: "blogs",
    component: BlogsView,
    meta: {
      title: "Blogs",
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
    meta: {
      title: "Sign up",
    },
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
    meta: {
      title: "Forgot Password",
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: "Profile",
    },
  },
  {
    path: "/create-post",
    name: "createPost",
    component: CreatePost,
    meta: {
      title: "Create Post",
    },
  },
  {
    path: "/blog-view/:blogId",
    name: "blogView",
    component: ViewBlog,
    meta: {
      title: "View Blog Post",
    },
  },
  {
    path: "/edit-blog/:blogId",
    name: "editBlog",
    component: EditBlog,
    meta: {
      title: "Edit Blog",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | FireBlog`;
  next();
});

export default router;
