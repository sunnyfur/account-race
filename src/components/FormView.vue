<template>
  <form @submit.prevent class="form">
    <common-field label="ФИО" name="name" :error="v$.race.name.$errors"
      ><common-input
        name="name"
        v-model="v$.race.name.$model"
        type="text"
        placeholder="Фамилия Имя Отчество"
      />
    </common-field>

    <common-field
      label="Дата рождения"
      name="birthday"
      :error="v$.race.birthday.$errors"
    >
      <common-input
        name="birthday"
        v-model="v$.race.birthday.$model"
        type="date"
        :max="maxDate"
    /></common-field>

    <common-field label="Email" name="email" :error="v$.race.email.$errors"
      ><common-input
        name="email"
        v-model="v$.race.email.$model"
        type="email"
        placeholder="email"
      />
    </common-field>
    <common-field label="Телефон" name="phone" :error="v$.race.phone.$errors">
      <common-input
        name="phone"
        v-model="v$.race.phone.$model"
        type="tel"
        placeholder="+7 XXX XXX XX XX"
        v-phone
      />
    </common-field>

    <common-field
      label="Дистанция"
      name="distance"
      :error="v$.race.distance.$errors"
      ><common-select
        v-model="v$.race.distance.$model"
        :options="optionsDistances"
      />
    </common-field>

    <common-field
      label="Сумма взноса, руб."
      name="payment"
      :error="v$.race.payment.$errors"
    >
      <common-input
        name="payment"
        v-model="v$.race.payment.$model"
        type="number"
        min="10"
        max="10000"
    /></common-field>

    <label v-if="!isAuth">
      <input type="checkbox" v-model="isAgree" />Согласие на создание профиля
    </label>

    <common-button
      :disabled="v$.race.$invalid"
      @click="$emit('submit', { race: race, isAgree })"
      >{{ title }}</common-button
    >
  </form>
</template>

<script>
import useValidate from "@vuelidate/core";
import {
  required,
  email,
  minValue,
  maxValue,
  helpers,
} from "@vuelidate/validators";
const maxDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);

  return date.toISOString().split("T")[0];
};
const isValidAge = (value) => {
  return (
    new Date(new Date().setFullYear(new Date().getFullYear() - 14)) >=
    new Date(value)
  );
};
export default {
  data() {
    return {
      currRace: { ...this.race },
      optionsDistances: [
        { value: 3, name: "3 км" },
        { value: 5, name: "5 км" },
        { value: 10, name: "10 км" },
      ],
      isAgree: false,
      maxDate: maxDate(),
    };
  },
  props: {
    race: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isAuth: {
      type: Boolean,
    },
  },
  setup() {
    return { v$: useValidate() };
  },

  validations() {
    return {
      race: {
        name: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
        birthday: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
          maxValue: helpers.withMessage(
            "Регистрация возможна с 14 лет",
            isValidAge
          ),
        },
        email: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
          email: helpers.withMessage("Введите корректный email", email),
        },
        phone: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
        distance: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
        },
        payment: {
          required: helpers.withMessage(
            "Поле обязательно для заполнения",
            required
          ),
          minValue: helpers.withMessage(
            "Минимальное значение 10",
            minValue(10)
          ),
          maxValue: helpers.withMessage(
            "Максимальное значение 10 000",
            maxValue(10000)
          ),
        },
      },
    };
  },
};
</script>

<style lang="scss">
.form {
  padding: 1rem;
  background-color: $light-gray;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 15px;
  min-width: 340px;
}
</style>
