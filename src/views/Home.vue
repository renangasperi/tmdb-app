<template>
  <div class="home">
    <h1>Welcome to the Home Page</h1>
  </div>
</template>

<script setup>
import { ref } from "vue";

const message = ref("Hello, Vue 3!");

function greet() {
  console.log(message.value);
}
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
}
</style>
