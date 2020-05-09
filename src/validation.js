import { extend } from 'vee-validate';
import { required, is } from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: '{_field_} is required.',
});

extend('is', is);
