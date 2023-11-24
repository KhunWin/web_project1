<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
// import { formatDistanceStrict } from "date-fns";

const route = useRoute();
var page = ref(route.query.page || 1);
var perPage = ref(route.query.perPage || 6);
var total = ref(0);
var totalPage = ref(0);
var title = ref("");
var events = ref([]);

const loadEvents = async () => {
  console.log(route.query.title);
  let response;
  if (route.params.keyword) {
    response = await fetch(
      `/api/eventBack?page=${page.value}&perPage=${perPage.value}&title=${route.params.keyword}`
    );

    console.log("here");
  } else {
    response = await fetch();
    `/api/eventBack?page=${page.value}&perPage=${perPage.value}`;
  }

  const json = await response.json();
  console.log(json);
  events.value = json.events;
  total.value = json.totals;
  totalPage.value = Math.ceil(total.value / perPage.value);
};

watch(
  () => route.query.title,
  (newTitle) => {
    title.value = newTitle;
    loadEvents();
  },
  { immediate: true }
);

onMounted(async () => {
  title.value = route.params.title;
  loadEvents();
});

const onPageChange = (p) => {
  page.value = p;
  loadEvents();
};
</script>

<template>
  <body>
    <div class="container">
      <div class="container-fluid">
        <div class="row my-4">
          <div class="col-6">
            <div class="rectangle-box">
              <router-link to="/" style="text-decoration: none"
                >Home</router-link
              >
              <span>/</span>
              <a style="text-decoration: none; color: black" href="">search</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div
          class="card col-md-12 col-lg-4"
          v-for="event in events"
          :key="event._id"
        >
          <a :href="`/event/detail/${event._id}`">
            <img
              style="max-height: 250px; object-fit: cover"
              class="card-img-top"
              :src="event.imageURL"
              alt="Event Image"
            />
          </a>
          <div class="card-body d-flex flex-column">
            <h3 class="card-title mb-2 text-truncate">
              {{ event.eventTitle }}
            </h3>
            <p class="card-text text-clamp-4 mb-2">
              {{ event.eventDesc }}
            </p>

            <div class="mt-auto">
              <!-- for recent time display here -->
              <span
                >Last updated
                {{
                  Math.ceil(
                    (new Date() - new Date(event.modifiedAt)) /
                      (1000 * 60 * 60 * 24)
                  )
                }}
                days
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- pagniation -->
      <nav class="my-4">
        <ul class="pagination">
          <li
            class="page-item"
            v-for="i in Array.from({ length: totalPage }, (_, i) => i + 1)"
            :key="i"
          >
            <a class="page-link" @click="onPageChange(i)">
              {{ i }}
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </body>
</template>

<style></style>
