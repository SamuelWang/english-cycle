<template>
  <div class="container-md py-3">
    <h1>{{ pageHeading }}</h1>
    <loading v-show="loading"></loading>
    <div class="content" v-show="!loading">
      <validation-observer v-slot="{ handleSubmit }">
        <b-form :novalidate="true" @submit.prevent="handleSubmit(onSubmit)">
          <validation-provider
            name="Sentence"
            rules="required"
            v-slot="{ errors, validated }"
          >
            <b-form-group
              label="Sentence*"
              label-for="input-sentence"
              :invalid-feedback="errors[0]"
              :state="validated ? !errors.length : null"
            >
              <b-form-input
                id="input-sentence"
                v-model="cycleData.sentence"
                :state="validated ? !errors.length : null"
                trim
              ></b-form-input>
            </b-form-group>
          </validation-provider>
          <validation-provider
            name="Translation"
            rules="required"
            v-slot="{ errors, validated }"
          >
            <b-form-group
              label="Translation*"
              label-for="input-translation"
              :invalid-feedback="errors[0]"
              :state="validated ? !errors.length : null"
            >
              <b-form-input
                id="input-translation"
                v-model="cycleData.translation"
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
      cycleData: new SentenceCycle(),
      isCreating: true,
      loading: false,
    };
  },
  computed: {
    pageHeading() {
      return this.isCreating ? 'Add Sentence' : 'Edit Sentence';
    },
    submittingText() {
      return this.isCreating ? 'Add' : 'Update';
    },
  },
  methods: {
    onSubmit() {
      const self = this;

      this.loading = true;

      if (this.isCreating) {
        this.$services()
          .addCycle(this.cycleData)
          .then((docId) => {
            self.$router.push(`/cycles/review-sentence/${docId}`);
          })
          .catch((error) => {
            alert('Something went wrong!');
          })
          .finally(() => {
            self.loading = false;
          });
      } else {
        this.$services()
          .updateCycle(this.cycleData)
          .then((docId) => {
            self.$router.push(`/cycles`);
          })
          .catch((error) => {
            alert('Something went wrong!');
          })
          .finally(() => {
            self.loading = false;
          });
      }
    },
  },
  created() {
    const self = this;
    const sentenceId = this.$route.params.id;

    this.$services()
      .authenticateUser()
      .then(() => {
        if (sentenceId) {
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
                console.warn(`The cycle ${vocabularyId} is not existing.`);
              } else {
                console.error(error.message, error);
              }

              self.$router.push('/cycles');
            });
        }
      })
      .catch((error) => {
        alert('Something went wrong.');
      });
  },
};
</script>
