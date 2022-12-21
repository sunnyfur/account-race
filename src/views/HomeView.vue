<template>
  <div class="container">
    <login-form
      v-if="isAgree"
      :user="user"
      :title="titleLogin"
      @submit="registerUser"
    />
    <form-view v-else :race="race" @submit="registerRace" :title="titleSend" />
  </div>
</template>

<script>
import FormView from "@/components/FormView.vue";
import LoginForm from "@/components/LoginForm.vue";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      titleLogin: "Зарегистрироваться",
      titleSend: "Отправить заявку",
    };
  },
  components: {
    FormView,
    LoginForm,
  },
  methods: {
    ...mapActions({
      registerUser: "auth/registerUser",
      registerRace: "auth/registerRace",
    }),
  },

  computed: {
    ...mapState({
      isAgree: (state) => state.auth.isAgree,
      race: (state) => state.auth.race,
      user: (state) => state.auth.user,
    }),
  },
};
</script>

<style lang="scss">
.container {
  max-width: $desktop;
}
</style>
