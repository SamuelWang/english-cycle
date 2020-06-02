<template>
  <div class="container-md py-3">
    <h1>Review Sentence</h1>
    <b-button variant="outline-primary" :to="{ path: '/cycles' }"
      >Back to List</b-button
    >
    <loading :show="loading"></loading>
    <div class="content my-5" v-show="!loading">
      <b-card v-if="showAnswer">
        <h4>Sentence</h4>
        <p>{{ cycleData.sentence }}</p>
        <h4>Translation</h4>
        <p>{{ cycleData.translation }}</p>
        <h4>Description</h4>
        <p v-html="cycleData.description"></p>
      </b-card>

      <div class="mt-5">
        <b-card title="Test">
          <validation-observer v-slot="{ handleSubmit }">
            <b-form
              :novalidate="true"
              @submit.prevent="handleSubmit(onSubmit)"
              autocomplete="off"
            >
              <p>{{ cycleData.translation }}</p>
              <validation-provider
                :name="'Sentence'"
                :rules="'required|is:' + cycleData.sentence"
                v-slot="{ errors, validated }"
              >
                <b-form-group
                  :invalid-feedback="errors[0]"
                  :state="validated ? !errors.length : null"
                >
                  <b-form-input
                    v-model="answer"
                    :state="validated ? !errors.length : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation-provider>
              <b-button
                type="button"
                variant="outline-primary"
                @click="viewAnswer()"
                >View</b-button
              >
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </validation-observer>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { SentenceCycle } from './../../models/cycles/Cycle';
import Loading from './../../components/Loading.vue';

export default {
  components: {
    Loading,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      answer: '',
      cycleData: new SentenceCycle(),
      loading: false,
      showAnswer: false,
    };
  },
  methods: {
    onSubmit() {
      const self = this;

      this.questions = [];
      this.loading = true;
      this.$services()
        .addCycleReviewLog(this.cycleData)
        .then(() => {
          self.loading = false;
          self.showAnswer = true;
        })
        .catch((error) => {
          alert('Something went wrong!');
        });
    },
    viewAnswer() {
      this.showAnswer = true;
    },
  },
  created() {
    const self = this;
    const sentenceId = this.$route.params.id;

    this.$services()
      .authenticateUser()
      .then(() => {
        self.loading = true;
        self.isCreating = false;
        self
          .$services()
          .getCycleById(sentenceId)
          .then((cycle) => {
            self.loading = false;
            self.cycleData = cycle;
          })
          .catch((error) => {
            if (error.code === 'not-found') {
              console.warn(`The cycle ${sentenceId} is not existing.`);
            } else {
              console.error(error.message, error);
            }

            self.$router.push('/cycles');
          });
      })
      .catch((error) => {});
  },
};
</script>
