<template>
  <div class="create-post">
    <BlogCoverPreview v-show="blogPhotoPreview" />
    <BaseLoading v-show="loading" />
    <div class="container">
      <div class="error-message" :class="{ invisible: !error }">
        <p><span>Error!</span>{{ this.errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input
            type="file"
            ref="blogPhoto"
            id="blog-photo"
            accept=".png, .jpg, .jpeg"
            @change="fileChange"
          />
          <button
            class="preview"
            :class="{ 'button-inactive': !blogPhotoFileURL }"
            @click="openPreview"
          >
            Preview Photo
          </button>
          <span v-if="file">File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <VueEditor
          :editorOptions="editorSettings"
          v-model="blogHTML"
          useCustomImageHandler
          @image-added="imageHandler"
        />
        <!-- @image-added="imageHandler"  -->
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCoverPreview from "@/components/blog/BlogCoverPreview";
import BaseLoading from "@/components/UI/BaseLoading";
import firebase from "firebase/app";
import "firebase/storage";
import db from "@/firebase/firebaseinit";
import { VueEditor, Quill } from "vue3-editor";
window.Quill = Quill;
const ImageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", ImageResize);

export default {
  components: { VueEditor, BlogCoverPreview, BaseLoading },
  data() {
    return {
      loading: null,
      error: null,
      errorMsg: null,
      file: null,
      editorSettings: {
        modules: {
          imageResize: {},
        },
      },
    };
  },

  computed: {
    profileId() {
      return this.$store.state.profileId;
    },
    blogPhotoFileURL() {
      return this.$store.state.blogPhotoFileURL;
    },
    blogPhotoName() {
      return this.$store.state.blogPhotoName;
    },
    blogPhotoPreview() {
      return this.$store.state.blogPhotoPreview;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogTitle;
      },
      set(payload) {
        this.$store.commit("updateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogHTML;
      },
      set(payload) {
        this.$store.commit("newBlogPost", payload);
      },
    },
  },

  methods: {
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("fileNameChange", fileName);
      this.$store.commit("createFileURL", URL.createObjectURL(this.file));
    },
    openPreview() {
      this.$store.commit("openPhotoPreview");
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
        },
        async () => {
          const downloadURL = await docRef.getDownloadURL();
          Editor.insertEmbed(cursorLocation, "image", downloadURL);
          resetUploader();
        }
      );
    },
    uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML !== 0) {
        if (this.file) {
          this.loading = true;
          // SEND TO DB
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(
            `documents/BlogCoverPhotos/${this.blogPhotoName}`
          );
          docRef.put(this.file).on(
            "state_change",
            (snapshot) => {
              console.log(snapshot);
            },
            (error) => {
              console.log(error);
              this.loading = false;
            },
            async () => {
              const downloadURL = await docRef.getDownloadURL();
              const timestamp = await Date.now();
              const database = await db.collection("blogPosts").doc();

              await database.set({
                blogID: database.id,
                blogHTML: this.blogHTML,
                blogPhotoFileURL: downloadURL,
                blogPhotoName: this.blogPhotoName,
                blogTitle: this.blogTitle,
                profileId: this.profileId,
                date: timestamp,
              });
              await this.$store.dispatch("getPost");
              this.loading = false;
              this.$router.push({
                name: "blogView",
                params: { blogId: database.id },
              });
            }
          );
          return;
        }
        this.error = true;
        this.errorMsg = "Please make sure you upload a cover photo";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }

      this.error = true;
      this.errorMsg =
        "Please ensure that blog title & blog post has been filled";
      setTimeout(() => {
        this.error = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;
  button {
    margin-top: 0;
  }
  .router-button {
    text-decoration: none;
    color: #fff;
  }
  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }
  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }
  .invisible {
    opacity: 0 !important;
  }
  .error-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #b10808 !important;
    opacity: 1;
    transition: 0.5s ease all;
    p {
      font-size: 14px;
    }
    span {
      font-weight: 600;
    }
  }
  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;
      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }
  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>
