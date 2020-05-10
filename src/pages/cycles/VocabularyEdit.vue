<template>
  <div class="container-md py-3">
    <h1>{{ pageHeading }}</h1>
    <loading v-show="loading"></loading>
    <div class="content" v-show="!loading">
      <validation-observer v-slot="{ handleSubmit }">
        <b-form :novalidate="true" @submit.prevent="handleSubmit(onSubmit)">
          <validation-provider
            name="Vocabulary"
            rules="required"
            v-slot="{ errors, validated }"
          >
            <b-form-group
              label="Vocabulary*"
              label-for="input-vocabulary"
              :invalid-feedback="errors[0]"
              :state="validated ? !errors.length : null"
            >
              <b-form-input
                id="input-vocabulary"
                v-model="cycleData.vocabulary"
                :state="validated ? !errors.length : null"
                trim
              ></b-form-input>
            </b-form-group>
          </validation-provider>
          <b-form-group label="Description" label-for="input-desc">
            <quill-editor v-model="cycleData.description"></quill-editor>
          </b-form-group>
          <b-button type="submit" variant="primary">{{
            submittingText
          }}</b-button>
        </b-form>
      </validation-observer>
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
      isCreating: true,
      loading: false,
    };
  },
  computed: {
    pageHeading() {
      return this.isCreating ? 'Add Vocabulary' : 'Edit Vocabulary';
    },
    submittingText() {
      return this.isCreating ? 'Add' : 'Update';
    },
  },
  methods: {
    onSubmit() {
      const self = this;

      this.loading = true;
      this.$services()
        .addCycle(this.cycleData)
        .then((docId) => {
          self.$router.push(`/cycles/review-vocabulary/${docId}`);
        })
        .catch((error) => {
          alert('Something went wrong!');
        })
        .finally(() => {
          self.loading = false;
        });
    },
  },
  created() {
    const self = this;
    const vocabularyId = this.$route.params.id;

    this.$services()
      .authenticateUser()
      .then(() => {
        if (vocabularyId) {
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
        }
      })
      .catch((error) => {});
  },
};
</script>
