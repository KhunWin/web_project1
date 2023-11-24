<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>
<template>
  <body>
    <div>
      <h1 v-if="route.name == `eventedit`">Your event has been updated!</h1>
      <h1 v-if="route.name == `editvolunteer`">
        Your volunter has been updated!
      </h1>
      <h2>
        Click 'Home' to return to Home page. Click 'Event' to return to the
        event page. Click 'volunteer' for volunteer page.
      </h2>
      <router-link to="/">
        <h3>Home</h3>
      </router-link>
      <router-link to="/event">
        <h3>Event</h3>
      </router-link>
      <router-link to="/become/volunteer">
        <h3>Volunteer</h3>
      </router-link>
    </div>
  </body>
</template>
