<template>
  <form @submit.prevent class="form">
    <common-field label="ФИО" name="name" :error="v$.currRace.name.$errors"
      ><common-input
        name="name"
        v-model="v$.currRace.name.$model"
        type="text"
        placeholder="Фамилия Имя Отчество"
      />
    </common-field>

    <common-field
      label="Дата рождения"
      name="birthday"
      :error="v$.currRace.birthday.$errors"
    >
      <common-input
        name="birthday"
        v-model="v$.currRace.birthday.$model"
        type="date"
        :max="maxDate"
    /></common-field>

    <common-field label="Email" name="email" :error="v$.currRace.email.$errors"
      ><common-input
        name="email"
        v-model="v$.currRace.email.$model"
        type="email"
        placeholder="email"
      />
    </common-field>
    <common-field
      label="Телефон"
      name="phone"
      :error="v$.currRace.phone.$errors"
    >
      <common-input
        name="phone"
        v-model="v$.currRace.phone.$model"
        type="tel"
        placeholder="+7 XXX XXX XX XX"
        @keyup="toMask"
      />
    </common-field>

    <common-field
      label="Дистанция"
      name="distance"
      :error="v$.currRace.distance.$errors"
      ><common-select
        v-model="v$.currRace.distance.$model"
        :options="optionsDistances"
      />
    </common-field>

    <common-field
      label="Сумма взноса, руб."
      name="payment"
      :error="v$.currRace.payment.$errors"
    >
      <common-input
        name="payment"
        v-model="v$.currRace.payment.$model"
        type="number"
        min="10"
        max="10000"
    /></common-field>

    <label v-if="!isAuth">
      <input type="checkbox" v-model="isAgree" />Согласие на создание профиля
    </label>

    <common-button
      :disabled="v$.currRace.$invalid"
      @click="$emit('submit', { race: currRace, isAgree })"
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
      currRace: {},
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
  mounted() {
    this.currRace = { ...this.race };
  },

  methods: {
    toMask(e) {
      let value = e.target.value;
      const x = value
        .replace(/\D/gi, "")
        .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

      if (!x[2] && x[1] !== "") {
        this.currRace.phone =
          x[1] === "7" || x[1] === "8" ? "+7 " : "+7 " + x[1];
      } else {
        this.currRace.phone =
          "+7 " +
          x[2] +
          (x[3] ? " " + x[3] : "") +
          (x[4] ? " " + x[4] : "") +
          (x[5] ? " " + x[5] : "");
      }
    },
  },
  validations() {
    return {
      currRace: {
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
