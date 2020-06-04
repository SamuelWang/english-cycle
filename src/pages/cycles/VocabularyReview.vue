<template>
  <div class="container-md py-3">
    <h1>Review Vocabulary</h1>
    <b-button variant="outline-primary" :to="{ path: '/cycles' }"
      >Back to List</b-button
    >
    <loading :show="loading"></loading>
    <div class="content my-5" v-show="!loading">
      <h3>Vocabulary</h3>
      <p>{{ cycleData.vocabulary }}</p>
      <h3>Translation</h3>
      <p>{{ cycleData.translation }}</p>
      <h3>Description</h3>
      <p v-html="cycleData.description"></p>

      <div class="mt-5">
        <b-button variant="primary" v-show="!reviewing" @click="review"
          >Review</b-button
        >
        <b-card title="Review" v-if="reviewing">
          <validation-observer v-slot="{ handleSubmit }">
            <b-form
              :novalidate="true"
              @submit.prevent="handleSubmit(onSubmit)"
              autocomplete="off"
            >
              <div class="mb-2">
                Type this vocabulary 5 times for reviewing vocabulary.
              </div>
              <validation-provider
                :name="'Vocabulary ' + (index + 1)"
                :rules="'required|is:' + cycleData.vocabulary"
                v-slot="{ errors, validated }"
                v-for="(question, index) in questions"
                :key="index"
              >
                <b-form-group
                  :label-for="'input-vocabulary' + index"
                  :invalid-feedback="errors[0]"
                  :state="validated ? !errors.length : null"
                >
                  <b-form-input
                    :id="'input-vocabulary' + index"
                    v-model="question.vocabulary"
                    :state="validated ? !errors.length : null"
                    trim
                  ></b-form-input>
                </b-form-group>
              </validation-provider>
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

import { VocabularyCycle } from './../../models/cycles/Cycle';
import Loading from './../../components/Loading.vue';

export default {
  components: {
    Loading,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      cycleData: new VocabularyCycle(),
      questions: [],
      loading: false,
      reviewing: false,
    };
  },
  methods: {
    review() {
      for (let i = 0; i < 5; i++) {
        this.questions.push(new VocabularyCycle());
      }

      this.reviewing = true;
    },
    onSubmit() {
      const self = this;

      this.questions = [];
      this.loading = true;
      this.$services()
        .addCycleReviewLog(this.cycleData)
        .then(() => {
          self.loading = false;
          self.reviewing = false;
        })
        .catch((error) => {
          console.log(error);
          alert('Something went wrong!');
        });
    },
  },
  created() {
    const self = this;
    const vocabularyId = this.$route.params.id;

    this.$services()
      .authenticateUser()
      .then(() => {
        self.loading = true;
        self.isCreating = false;
        self
          .$services()
          .getCycleById(vocabularyId)
          .then((cycle) => {
            self.loading = false;
            self.cycleData = cycle;
          })
          .catch((error) => {
            if (error.code === 'not-found') {
              console.warn(`The cycle ${vocabularyId} is not existing.`);
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
