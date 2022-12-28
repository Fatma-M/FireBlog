<template>
  <div class="home">
    <BlogPost :post="welcomeScreen" v-if="!user" />
    <BlogPost
      v-for="(post, index) in blogPostsFeed"
      :key="index"
      :post="post"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View more recent blogs!</h3>
        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in blogPostsCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>

    <div class="updates" v-if="!user">
      <div class="container">
        <h2>Never miss a post, Register for your free account today!</h2>
        <router-link class="router-button" to="/login">
          Register for FireBlogs
          <img
            src="@/assets/Icons/arrow-right-light.svg"
            alt="arrow"
            class="arrow arrow-light"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/blog/BlogPost";
import BlogCard from "@/components/blog/BlogCard";

export default {
  name: "HomeView",
  components: { BlogPost, BlogCard },
  data() {
    return {
      welcomeScreen: {
        title: "Welcome!",
        blogPost:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias earum vel tempore, error est repudiandae quia, voluptatem ut odit corporis atque quisquam alias sed porro.",
        welcomeScreen: true,
        photo: "coding",
      },
    };
  },
  computed: {
    blogPostsCards() {
      return this.$store.getters.blogPostsCards;
    },

    blogPostsFeed() {
      return this.$store.getters.blogPostsFeed;
    },

    user() {
      return this.$store.state.user;
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 20px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      text-align: center;
      text-transform: uppercase;
      width: 100%;
      max-width: 425px;

      @media (min-width: 800px) {
        text-align: inherit;
        font-size: 40px;
      }
    }
  }
}
</style>
