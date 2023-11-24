<script setup>
import { ref, onMounted, watch } from "vue";
// import { useRoute } from "vue-router";
// const route = useRoute();

const data = ref([]);
const total = ref(0);
const loading = ref(false);
const sortField = ref("volemail");
const sortOrder = ref("desc");
const defaultSortOrder = ref("desc");
const page = ref(1);
const perPage = ref(4);

const search = ref("");

watch(
  () => search.value,
  () => {
    loadAsyncData();
  }
);

const loadAsyncData = () => {
  const params = [
    `email=${search.value}`,
    `perPage=${perPage.value}`,
    `sort_by=${sortField.value}.${sortOrder.value}`,
    `page=${page.value}`,
  ].join("&");
  loading.value = true;
  fetch(`/api/volunteerBack?${params}`)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      let currentTotal = result.totals;

      total.value = currentTotal;
      data.value = result.volunteers;
      // cap results for usability
      // if (data.value.length > 10) data.value = data.value.slice(0, 5);

      loading.value = false;
    })
    .catch((error) => {
      data.value = [];
      total.value = 0;
      loading.value = false;
      throw error;
    });
};

/*
 * Handle page-change event
 */

/*
 * Handle sort event
 */
const onSort = (field, order) => {
  sortField.value = field;
  sortOrder.value = order;
  loadAsyncData();
};

onMounted(() => {
  loadAsyncData();
});

const onPageChange = (p) => {
  page.value = p;
  loadAsyncData();
};
</script>

<!-- HTML is in template -->
<template>
  <div class="container">
    <div class="container-fluid">
      <div class="row my-4">
        <div class="col-6">
          <div class="rectangle-box">
            <a style="text-decoration: none" href="/">Home</a>
            <span>/</span>
            <a style="text-decoration: none; color: black" href="/volunteers"
              >Volunteers</a
            >
          </div>
        </div>
        <form class="col-6 text-end" @submit.prevent="SubmitVolunteer">
          <button
            type="button"
            class="btn"
            style="
              color: aliceblue;
              background-color: blue;
              margin-top: 5px;
              float: right;
            "
            @click="$router.push('/become/volunteer/')"
          >
            New
          </button>
        </form>
      </div>
    </div>
  </div>

  <section class="px-5">
    <!-- <input class="form-control" v-model="search" placeholder="Search..." /> -->

    <!-- table -->
    <o-table
      :data="data"
      :loading="loading"
      paginated
      backend-pagination
      :total="total"
      :per-page="perPage"
      aria-next-label="Next page"
      aria-previous-label="Previous page"
      aria-page-label="Page"
      aria-current-label="Current page"
      backend-sorting
      :default-sort-direction="defaultSortOrder"
      :default-sort="[sortField, sortOrder]"
      @page-change="onPageChange"
      @sort="onSort"
      class="px-3"
    >
      <div class="col">
        <o-table-column v-slot="props" label="Volunteer Name">
          {{ props.row.volname }}
        </o-table-column>
      </div>

      <div class="col">
        <o-table-column v-slot="props" label="Email">
          {{ props.row.volemail }}
        </o-table-column>
      </div>
      <div class="col">
        <o-table-column v-slot="props" label="Contact">
          {{ props.row.volcontact }}
        </o-table-column>
      </div>

      <div class="col">
        <o-table-column v-slot="props" label="Action">
          <a
            :href="`/volunteer/${props.row._id}`"
            class="btn btn-outline-primary btn-sm mt-2 edit-btn"
            >Edit</a
          >
        </o-table-column>
      </div>
    </o-table>
  </section>
</template>
