<script setup>
// import { RouterLink, RouterView } from "vue-router";

import NavigationBar from "./components/NavigationBar.vue";
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <NavigationBar />
  </header>

  <RouterView />
</template>
