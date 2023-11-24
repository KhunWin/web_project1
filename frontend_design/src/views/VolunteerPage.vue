<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import router from "../router";

const route = useRoute();
var volunteer = ref({});

const addVol = async function () {
  var url = "/api/volunteerBack";
  var method = "POST";

  if (route.name == "editvolunteer") {
    url = url + "/" + volunteer.value._id;
    method = "PUT";
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(volunteer.value),
    // post the event to the backend
  });
  // convert the response to json
  const json = await response.json();
  console.log(json);
  router.push("/notification");
};

const deleteVolunteer = async function () {
  // post the event to the backend
  const response = await fetch("/api/volunteerBack/" + volunteer.value._id, {
    method: "DELETE",
  });
  // convert the response to json
  const json = await response.json();
  // log the json
  console.log(json);
  // alert the user
  alert(JSON.stringify(json));
  router.push("/notification");
};

// a function to get the booking from the backend
const getVolunteer = async function () {
  const response = await fetch("/api/volunteerBack/" + route.params.id);
  const json = await response.json();
  console.log(json);
  volunteer.value = json;
};

onMounted(async () => {
  if (route.params.id) {
    getVolunteer();
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
              <router-link
                to=""
                style="text-decoration: none"
                v-if="route.name == `newvolunteer`"
                >Become volunteer!</router-link
              >
              <router-link
                to="/volunteers"
                style="text-decoration: none"
                v-if="route.name == `editvolunteer`"
                >Volunteers</router-link
              >
              <span v-if="route.name == `editvolunteer`">/</span>
              <router-link
                to=""
                style="text-decoration: none; color: black"
                v-if="route.name == `editvolunteer`"
                >Edit</router-link
              >
            </div>
          </div>
          <!-- Delete column to the right -->
          <div class="col-6" v-if="route.name == `editvolunteer`">
            <a
              class="btn btn-danger"
              style="float: right"
              @click="deleteVolunteer"
              >Delete</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="container mt-4">
      <form @submit.prevent="addVol">
        <div class="row">
          <div class="col-6">
            <div>
              <label for="inputEmail1" class="col-sm-2 col-form-label"
                >Email</label
              >
              <input
                type="email"
                class="form-control"
                name="volemail"
                id="volinputEmail3"
                v-model="volunteer.volemail"
                required
              />
            </div>

            <div>
              <label
                for="inputPassword1"
                class="col-sm-2 col-form-label"
                v-if="route.name == `newvolunteer`"
                >Password</label
              >
              <label
                for="inputPassword1"
                class="col-sm-2 col-form-label"
                v-if="route.name == `editvolunteer`"
                >Reset Password</label
              >

              <input
                type="password"
                class="form-control"
                name="volpassword"
                v-model="volunteer.volpassword"
                id="volemailInputPassword1"
                required
              />
            </div>

            <div>
              <label for="" class="col-sm-2 col-form-label">Name</label>
              <input
                type="text"
                class="form-control"
                name="volname"
                id="nameInput"
                v-model="volunteer.volname"
                required
              />
            </div>

            <div>
              <label for="" class="col-sm-2 col-form-label">Contact</label>
              <input
                type="tel"
                class="form-control"
                name="volcontact"
                id="volcontactInput"
                v-model="volunteer.volcontact"
                required
              />
            </div>

            <div>
              <label class="col-sm-2 col-form-label">Age Group</label>
              <select
                class="form-select"
                name="volAge"
                aria-label="Default select example"
                v-model="volunteer.volAge"
              >
                <option selected>Choose Age Group</option>
                <option value="1">12-16</option>
                <option value="1">17-21</option>
                <option value="1">22-26</option>
                <option value="1">27-31</option>
                <option value="1">32-36</option>
              </select>
            </div>

            <div>
              <label for="exampleFormControlTextarea1"
                >About me and remark</label
              >
              <textarea
                class="form-control"
                id="textareaform"
                rows="5"
              ></textarea>
            </div>
          </div>

          <div class="col-6" v-if="route.name == `newvolunteer`">
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
                  Your time and talent can make a real different in people's
                  life
                </p>
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="offset-sm-0">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="terms"
                  id="gridCheck1"
                  required
                />
                <label class="form-check-label" for="gridCheck1" required>
                  Agree to terms and conditions
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-4">
          <button
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 30px"
            v-if="route.name == `newvolunteer`"
          >
            Register
          </button>

          <button
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 30px"
            @c="addVol"
            v-if="route.name == `editvolunteer`"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </body>
</template>
