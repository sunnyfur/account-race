<template>
  <div class="container">
    <login-form
      v-if="isAgree"
      :user="user"
      :title="titleLogin"
      @submit="registerUser"
    />
    <form-view v-else :race="race" @submit="registerRace" :title="titleSend" />
    <common-dialog v-model:show="error" @close="clearError">
      <p>{{ error }}</p>
    </common-dialog>
  </div>
</template>

<script>
import FormView from "@/components/FormView.vue";
import LoginForm from "@/components/LoginForm.vue";
import { mapActions, mapMutations, mapState } from "vuex";

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
    ...mapMutations({
      clearError: "clearError",
    }),
  },

  computed: {
    ...mapState({
      isAgree: (state) => state.auth.isAgree,
      race: (state) => state.auth.race,
      user: (state) => state.auth.user,
      error: (state) => state.error,
    }),
  },
};
</script>

<style lang="scss">
.container {
  max-width: $desktop;
}
</style>
