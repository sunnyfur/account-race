<template>
  <div class="about">
    <form-view
      v-if="isAuth"
      :race="race"
      :title="titleSend"
      :isAuth="isAuth"
      @submit="saveRace"
    />
    <login-form v-else :user="user" :title="titleLogin" @submit="loginUser" />
    <common-dialog v-model:show="isError" @close="clearError">
      <p>{{ error }}</p>
    </common-dialog>
  </div>
</template>

<script>
import FormView from "@/components/FormView.vue";
import LoginForm from "@/components/LoginForm.vue";

import { mapActions, mapMutations, mapState } from "vuex";

export default {
  components: { FormView, LoginForm },
  data() {
    return {
      titleLogin: "Войти",
      titleSend: "Сохранить",
    };
  },
  methods: {
    ...mapActions({
      loginUser: "auth/loginUser",
      saveRace: "auth/saveRace",
    }),
    ...mapMutations({
      clearError: "clearError",
    }),
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.auth.isAuth,
      race: (state) => state.auth.race,
      user: (state) => state.auth.user,
      error: (state) => state.error,
    }),
    isError() {
      return Boolean(this.error);
    },
  },
};
</script>
