<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit" v-if="admin">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
    </div>
  </div>
</template>

<script>
import BlogCard from "@/components/blog/BlogCard.vue";
export default {
  components: { BlogCard },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    admin() {
      return this.$store.state.admin;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
  },
  beforeUnmount() {
    this.$store.commit("toggleEditPost", false);
  },
};
</script>

<style lang="scss" scoped>
.blog-cards {
  position: relative;

  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;

    span {
      margin-right: 16px;
    }

    input[type="checkbox"] {
      appearance: none;
      position: relative;
      border: none;
      border-radius: 20px;
      outline: none;
      background: #fff;
      width: 80px;
      height: 30px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);

      &:before {
        content: "";
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 20px;
        top: 0;
        left: 0;
        background: #303030;
        transform: scale(1.1);
        transition: 750ms ease all;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.01),
          0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }
    }

    input:checked[type="checkbox"]:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>
