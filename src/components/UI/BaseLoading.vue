<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;

  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }

  span {
    display: block;
    width: 60px;
    height: 60px;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    animation: spin ease 1s infinite;
  }
}
</style>
