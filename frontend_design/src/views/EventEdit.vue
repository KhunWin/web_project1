<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();

var event = ref({});

// a function to get the booking from the backend
const getEvent = async function () {
  const response = await fetch("/api/eventBack/" + route.params.id);
  const json = await response.json();
  console.log(json);
  event.value = json;
};

const deleteEvent = async function () {
  // post the event to the backend
  const response = await fetch("/api/eventBack/" + event.value._id, {
    method: "DELETE",
  });
  // convert the response to json
  const json = await response.json();
  alert(JSON.stringify(json));
  // redirect to the home page
  router.push("/notification");
};

const handleSubmit = async function () {
  // post the event to the backend
  var url = "/api/eventBack";
  var method = "POST";

  if (route.name == "eventedit") {
    url = url + "/" + event.value._id;
    method = "PUT";
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event.value),
  });

  const json = await response.json();

  alert(JSON.stringify(json));
  router.push("/notification");
  // redirect to the home page
};

onMounted(async () => {
  if (route.params.id) {
    getEvent();
  }
});
</script>

<template>
  <body>
    <!-- showing path -->
    <div class="container-fluid">
      <div class="container">
        <div class="row my-4">
          <div class="col-6 px-0">
            <div class="rectangle-box">
              <router-link to="/" style="text-decoration: none"
                >Home</router-link
              >
              <span>/</span>
              <router-link to="/event" style="text-decoration: none"
                >Event</router-link
              >
              <span>/</span>
              <router-link
                to=""
                style="text-decoration: none; color: black"
                v-if="route.name == `eventedit`"
                >Edit event</router-link
              >
              <router-link
                to="/event"
                style="text-decoration: none; color: black"
                v-if="route.name == `eventform`"
                >New event</router-link
              >
            </div>
          </div>
          <!-- Delete column to the right -->
          <div class="col-6" v-if="route.name == `eventedit`">
            <a class="btn btn-danger" style="float: right" @click="deleteEvent"
              >Delete</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <form @submit.prevent="handleSubmit">
        <!-- <form :action="`/event/edit/${event._id}`" method="POST"> -->
        <div class="row">
          <!-- the left column -->
          <div class="col-6">
            <label for="inputEmail3" class="col-sm-2 col-form-label"
              >Event title</label
            >
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                name="eventTitle"
                v-model="event.eventTitle"
                id="eventtitle"
                required
              />
            </div>
            <div class="col-sm-10">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Organizer</label
              >
              <input
                type="text"
                class="form-control"
                name="organizerName"
                v-model="event.organizerName"
                id="organizer"
                required
              />
            </div>
            <div class="col-sm-10">
              <label for="inputPassword3" class="col-sm-2 col-form-label"
                >Datetime</label
              >
              <input
                id="datetimeInput"
                type="datetime-local"
                name="eventDate"
                v-model="event.eventDate"
                class="form-control"
                required
              />
            </div>
            <div class="col-sm-10">
              <label for="inputLocation" class="col-sm-2 col-form-label"
                >Location</label
              >
              <input
                id="eventLocation"
                type="text"
                name="location"
                v-model="event.location"
                class="form-control"
              />
            </div>
          </div>

          <!-- the right column -->
          <div class="col-6">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea
              class="form-control"
              id="descriptionForm"
              name="eventDesc"
              v-model="event.eventDesc"
              rows="5"
            ></textarea>

            <label for="inputPassword3" class="col-sm-2 col-form-label"
              >Quota</label
            >
            <input
              type="number"
              class="form-control"
              name="quotaNum"
              id="quotaNum"
              v-model="event.quotaNum"
              required
            />

            <label for="inputPassword3" class="col-sm-2 col-form-label"
              >Image</label
            >
            <input
              type="url"
              class="form-control"
              name="imageURL"
              id="imageURL"
              v-model="event.imageURL"
              required
            />
          </div>

          <div class="row mb-3">
            <div class="offset-sm-0">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="highlightY"
                  id="highlightY"
                />
                <label class="form-check-label" for="gridCheck1">
                  Highlight
                </label>
              </div>
            </div>
          </div>

          <!-- Save button to the right -->
          <div class="container">
            <div class="row">
              <div class="col-md-6 offset-md-6 text-right">
                <button
                  type="submit"
                  class="btn btn-primary"
                  style="float: right"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </body>
</template>
