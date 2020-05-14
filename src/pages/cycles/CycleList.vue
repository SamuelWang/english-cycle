<template>
  <div class="container-md py-3">
    <h1>Cycles</h1>
    <loading v-show="loading"></loading>
    <div class="content" v-show="!loading">
      <b-dropdown text="Add" variant="primary" class="my-2">
        <b-dropdown-item :to="{ path: '/cycles/edit-vocabulary' }"
          >Vocabulary</b-dropdown-item
        >
        <b-dropdown-item :to="{ path: '/cycles/edit-sentence' }"
          >Sentence</b-dropdown-item
        >
      </b-dropdown>

      <b-list-group class="mt-3" v-show="cycles.length">
        <b-list-group-item v-for="cycle in cycles" :key="cycle.id">
          <h3>{{ getCycleTitle(cycle) }}</h3>
          <div class="mb-1" v-show="cycle.lastReviewDate">
            {{
              cycle.lastReviewDate ? cycle.lastReviewDate.toLocaleString() : ''
            }}
          </div>
          <b-badge variant="dark">{{ cycle.type }}</b-badge>
          <b-badge variant="warning" v-show="isWaitForReview(cycle)"
            >Waiting for review</b-badge
          >
          <div class="mt-3">
            <b-dropdown text="Actions" variant="outline-primary">
              <b-dropdown-item href="#" @click="reviewCycle(cycle)"
                >Review</b-dropdown-item
              >
              <b-dropdown-item href="#" @click="editCycle(cycle)"
                >Edit</b-dropdown-item
              >
              <b-dropdown-item
                href="#"
                variant="danger"
                @click="deletingCycle(cycle)"
                v-b-modal.modal-delete
                >Delete</b-dropdown-item
              >
            </b-dropdown>
          </div>
        </b-list-group-item>
      </b-list-group>

      <div class="my-5 text-center" v-show="!cycles.length">
        <h3>There is no cycles.</h3>
      </div>

      <b-modal
        id="modal-delete"
        title="Delete Cycle"
        @ok="deleteCycle()"
        @cancel="cancelDelete()"
      >
        <p class="my-4 text-danger">Do you really delete this cycle?</p>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Loading from './../../components/Loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      cycles: [],
      deletingCycleId: '',
      loading: false,
    };
  },
  methods: {
    cancelDelete() {
      this.deletingCycleId = '';
    },
    deleteCycle(cycle) {
      const self = this;

      this.loading = true;
      this.$services()
        .deleteCycleById(this.deletingCycleId)
        .then(() => {
          alert('Delete successful');
          self.getCycleList();
        })
        .catch(() => {
          self.loading = false;
          alert('Delete failed');
        });
    },
    deletingCycle(cycle) {
      this.deletingCycleId = cycle.id;
    },
    editCycle(cycle) {
      switch (cycle.type.toLowerCase()) {
        case 'vocabulary':
          this.$router.push(`/cycles/edit-vocabulary/${cycle.id}`);
          break;
        case 'sentence':
          this.$router.push(`/cycles/edit-sentence/${cycle.id}`);
          break;
      }
    },
    getCycleList() {
      const self = this;

      this.loading = true;
      this.$services()
        .getCycleList()
        .then((cycles) => {
          self.loading = false;
          self.cycles = cycles;
        })
        .catch((error) => {
          console.error(error.message, error);
        });
    },
    getCycleTitle(cycle) {
      switch (cycle.type.toLowerCase()) {
        case 'vocabulary':
          return cycle.vocabulary;
        case 'sentence':
          return cycle.sentence;
      }

      return '';
    },
    isWaitForReview(cycle) {
      const shortDate = new Date(
        cycle.nextReviewDate.getFullYear(),
        cycle.nextReviewDate.getMonth(),
        cycle.nextReviewDate.getDate()
      );
      return Date.now() >= shortDate;
    },
    reviewCycle(cycle) {
      switch (cycle.type.toLowerCase()) {
        case 'vocabulary':
          this.$router.push(`/cycles/review-vocabulary/${cycle.id}`);
          break;
        case 'sentence':
          this.$router.push(`/cycles/review-sentence/${cycle.id}`);
          break;
      }
    },
  },
  created() {
    const self = this;

    this.$services()
      .authenticateUser()
      .then(() => {
        self.getCycleList();
      })
      .catch((error) => {});
  },
};
</script>
