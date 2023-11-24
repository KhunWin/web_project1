<template>
  <div class="container-fluid">
    <div class="navbar row py-2 align-items-center">
      <div class="logo col-md-auto">Navbar</div>
      <ul class="nav col-md">
        <li class="nav-item">
          <router-link to="/" class="nav-link text-muted">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/event" class="nav-link text-dark"
            >Events</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/become/volunteer" class="nav-link text-muted"
            >Become volunteer</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/volunteers" class="nav-link text-muted" href=""
            >Volunteers</router-link
          >
        </li>
      </ul>
      <div class="ml-auto col-md-auto">
        <div class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model="searchQuery"
          />
          <a class="btn btn-outline-success" :href="`/search/${searchQuery}`"
            >Search</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// let isCollapsed = ref(true);
let searchQuery = ref("");

const router = useRouter();

const searchEvents = () => {
  router.push({ name: "search", query: { title: searchQuery.value } });
};
</script>
