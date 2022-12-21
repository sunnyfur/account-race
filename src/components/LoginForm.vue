<template>
  <form @submit.prevent class="form">
    <h2>{{ title }}</h2>

    <common-input
      label="Логин"
      type="text"
      name="login"
      placeholder="email"
      v-model="v$.currUser.login.$model"
      :error="v$.currUser.login.$errors"
    />

    <common-input
      label="Пароль"
      type="password"
      name="password"
      v-model="v$.currUser.password.$model"
      :error="v$.currUser.password.$errors"
    />
    <common-button
      @click="$emit('submit', currUser)"
      :disabled="v$.currUser.$invalid"
      >{{ title }}</common-button
    >
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";

import { required, helpers } from "@vuelidate/validators";
export default {
  data() {
    return { currUser: {} };
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    return { v$: useValidate() };
  },
  mounted() {
    this.currUser = { ...this.user };
  },
  validations() {
    return {
      currUser: {
        login: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
        password: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
      },
    };
  },
};
</script>
