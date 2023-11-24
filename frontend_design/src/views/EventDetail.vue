<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

var event = ref({});

// a function to get the booking from the backend
const getEvent = async function () {
  const response = await fetch("/api/eventBack/" + route.params.id);
  const json = await response.json();
  console.log(json);
  event.value = json;
};

onMounted(async () => {
  if (route.params.id) {
    getEvent();
  }
});
</script>

<template>
  <body>
    <div class="container-fluid">
      <div class="container">
        <div class="col-6 px-0 mb-3">
          <div class="rectangle-box">
            <a style="text-decoration: none" href="/">Home</a>
            <span>/</span>
            <a style="text-decoration: none" href="/event">Events</a>
            <span>/</span>
            <a style="text-decoration: none; color: black" href=""
              >event title</a
            >
            <a
              style="text-decoration: none; color: black"
              href="/event"
              v-if="route.name == `eventform`"
              >New event</a
            >
          </div>
        </div>

        <div class="row">
          <!-- the left box with detail information. -->
          <div class="col-6 left-container">
            <div class="border border-secondary" style="padding-bottom: 5rem">
              <h3>
                {{ event.eventTitle }}
              </h3>
              <h5 class="text-muted">
                {{ event.organizerName }}
              </h5>
              <p>
                {{ event.eventDesc }}
              </p>
              <!-- table with rounded thin border and one columns and three rows -->
              <div class="event-details-bottom">
                <p>
                  {{ event.eventDate }}
                </p>
                <p
                  style="
                    border-top: 0px solid #dfdfdf;
                    border-bottom: 0px solid #dfdfdf;
                  "
                >
                  {{ event.location }}
                </p>
                <p>
                  {{ event.quotaNum }}
                </p>
              </div>
            </div>
          </div>
          <!-- the right card -->
          <div class="col-6 right-container">
            <div class="card w-75">
              <a href="/become/volunteer"
                ><img
                  src="https://ichef.bbci.co.uk/news/976/cpsprodpb/10CB5/production/_131398786_gettyimages-1683091546.jpg.webp"
                  class="card-img-top"
                  alt="image1"
              /></a>
              <div class="card-body">
                <h5 class="card-title">Become a volunteer</h5>
                <p class="card-text">
                  Your time and talent can make a real difference in people's
                  life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>
