<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { formatDistanceStrict } from "date-fns";

const route = useRoute();
var page = ref(route.query.page || 1);
var perPage = ref(route.query.perPage || 6);
var total = ref(0);
var totalPage = ref(0);
var title = ref("");
var events = ref([
  {
    _id: "652eb92e1a193aaa72a2e19e",
    eventTitle: "New",
    organizerName: "Second PersoNew",
    eventDate: "2023-10-17T14:23",
    location: "NewRoom2&LivingRoom",
    eventDesc: "NewDescription is used in the photo.",
    quotaNum: 30,
    imageURL:
      "https://www.analyticsinsight.net/wp-content/uploads/2023/10/Top-Tech-News-Today-ChatGPT-Outperforms-Doctors-in-Depression-Diagnosis.jpg",
    terms: false,
    createdAt: "6/19/2023",
    modifiedAt: {
      $date: "2023-10-18T06:23:39.658Z",
    },
  },
  {
    _id: "652eb92e1a193maa72a2e19e",
    eventTitle: "New",
    organizerName: "Second PersoNew",
    eventDate: "2023-10-17T14:23",
    location: "NewRoom2&LivingRoom",
    eventDesc: "NewDescription is used in the photo.",
    quotaNum: 30,
    imageURL:
      "https://www.analyticsinsight.net/wp-content/uploads/2023/10/Top-Tech-News-Today-ChatGPT-Outperforms-Doctors-in-Depression-Diagnosis.jpg",
    terms: false,
    createdAt: "6/19/2023",
    modifiedAt: {
      $date: "2023-10-18T06:23:39.658Z",
    },
  },
]);

const loadEvents = async () => {
  let response;
  if (title.value) {
    response = await fetch(
      `/api/eventBack?page=${page.value}&perPage=${perPage.value}&eventTitle=${title.value}`
    );
  } else {
    response = await fetch(
      `/api/eventBack?page=${page.value}&perPage=${perPage.value}`
    );
  }

  const json = await response.json();
  console.log(json);
  events.value = json.events;
  total.value = json.totals;
  totalPage.value = Math.ceil(total.value / perPage.value);
};

onMounted(async () => {
  title.value = route.params.title;
  loadEvents();
});

const onPageChange = (p) => {
  page.value = p;
  loadEvents();
};

// const pages = computed(() => {
//   var lastPage = Math.ceil(total.value / perPage.value);
//   if (page.value == 1) {
//     if (lastPage == page.value) return [page];

//     if (lastPage == page.value + 1) {
//       return [page.value, page.value + 1];
//     }
//     return [page.value, page.value + 1, page.value + 2];
//   }
//   if (page.value == lastPage) {
//     if (lastPage == 1) return [page.value];
//     if (lastPage == 2) return [page.value - 1, page];
//     return [page.value - 2, page.value - 1, page];
//   } else {
//     return [page.value - 1, page.value, page.value + 1];
//   }
// });
</script>

<!-- <template>
  <body>
    <div class="container">
      <div class="container-fluid">
        <div class="row my-4">
          <div class="col-6">
            <div class="rectangle-box">
              <a style="text-decoration: none" href="/">Home</a>
              <span>/</span>
              <a style="text-decoration: none; color: black" href="/event"
                >Events</a
              >
            </div>
          </div>
          <form class="col-6 text-end" @submit.prevent="SubmitEvent">
            <button
              type="button"
              class="btn"
              style="
                color: aliceblue;
                background-color: blue;
                margin-top: 5px;
                float: right;
              "
              @click="$router.push('/event/new')"
            >
              New
            </button>
          </form>
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
              <span v-if="calculateMinutes(event) < 60">
                Last updated {{ calculateMinutes(event) }} min
              </span>
              <span v-else-if="calculateHours(event) < 24">
                Last updated {{ calculateHours(event) }} hour
              </span>
              <span v-else> Last updated {{ calculateDays(event) }} day </span>

              <a
                :href="`/event/edit/${event._id}`"
                class="btn btn-outline-primary btn-sm mt-2 edit-btn"
                >Edit</a
              >
            </div>
          </div>
        </div>
      </div>

      pagniation
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
</template> -->

<template>
  <body>
    <!-- ...existing code... -->
    <div class="container">
      <div class="container-fluid">
        <div class="row my-4">
          <div class="col-6">
            <div class="rectangle-box">
              <router-link to="/" style="text-decoration: none"
                >Home</router-link
              >
              <span>/</span>
              <a style="text-decoration: none; color: black" href="">events</a>
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
              <span v-if="calculateMinutes(event) < 60">
                Last updated {{ calculateMinutes(event) }} min
              </span>
              <span v-else-if="calculateHours(event) < 24">
                Last updated {{ calculateHours(event) }} hour
              </span>
              <span v-else> Last updated {{ calculateDays(event) }} day </span>
            </div>

            <a
              :href="`/event/edit/${event._id}`"
              class="btn btn-outline-primary btn-sm mt-auto edit-btn"
              >Edit</a
            >
          </div>
        </div>
      </div>
      <div>
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

      <!-- ...existing code... -->
    </div>
  </body>
</template>

<style>
.card-body {
  display: flex;
  flex-direction: column;
}

.edit-btn {
  margin-top: auto;
  align-self: flex-end;
}
</style>

<script>
export default {
  data() {
    return {
      events: [
        /* Array of events */
      ],
    };
  },
  methods: {
    calculateMinutes(event) {
      const timeDiff = new Date() - new Date(event.modifiedAt);
      return Math.ceil(timeDiff / (1000 * 60));
    },
    calculateHours(event) {
      const timeDiff = new Date() - new Date(event.modifiedAt);
      return Math.ceil(timeDiff / (1000 * 60 * 60));
    },
    calculateDays(event) {
      const timeDiff = new Date() - new Date(event.modifiedAt);
      return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    },
  },
};
</script>
