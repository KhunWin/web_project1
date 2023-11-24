<script setup>
import { ref, onMounted, watch } from "vue"; // add watch
import { formatDistanceStrict } from "date-fns";

const events = ref([]);
const total = ref(0);
const loading = ref(false);
const sortField = ref("modifiedAt");
const sortOrder = ref("desc");

const getEvents = () => {
  const params = [`sort_by=${sortField.value}.${sortOrder.value}`].join("&");
  loading.value = true;
  fetch(`/api/eventBack?${params}`)
    .then((response) => response.json())
    .then((result) => {
      events.value = result.events.slice(0, 3);
      loading.value = false;
    })
    .catch((error) => {
      events.value = [];
      total.value = 0;
      loading.value = false;
      throw error;
    });
};

onMounted(() => {
  getEvents();
});

const search = ref("");

watch(
  () => search.value,
  () => {
    getEvents();
  }
);
</script>

<template>
  <body>
    <div class="container-fluid">
      <!-- carousel -->
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active c-item">
            <img
              src="https://www.photoshopbuzz.com/wp-content/uploads/free-images-commercial-use10.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://www.photoshopbuzz.com/wp-content/uploads/free-images-commercial-use4.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="https://www.photoshopbuzz.com/wp-content/uploads/stock-image1.png"
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>

    <div class="row mb-3 .container" style="margin: 30px">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Recent</a>
        </li>
      </ul>
      <div class="container" style="margin: 30px">
        <div class="row">
          <div
            class="card col-12 col-md-12 col-lg-4"
            style="margin-top: 0px"
            v-for="event in events"
            :key="event._id"
          >
            <a :href="`/event/detail/${event._id}`"
              ><img
                :src="`${event.imageURL}`"
                class="card-img-top"
                onError="this.onerror=null;this.src='cardimg.png';"
                style="object-fit: fill; height: 300px"
            /></a>
            <div class="card-body">
              <h5 class="card-title">
                {{ event.eventTitle }}
              </h5>
              <p class="card-text">
                {{ event.eventDesc }}
              </p>
              <small class="text-muted">
                Last updated
                {{
                  formatDistanceStrict(new Date(event.modifiedAt), Date.now(), {
                    addSuffix: true,
                  })
                }}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
