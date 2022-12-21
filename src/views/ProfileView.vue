<template>
  <div class="about">
    <form-view
      v-if="isAuth"
      :race="race"
      :title="titleSend"
      @submit="saveRace"
    />
    <login-form v-else :user="user" :title="titleLogin" @submit="loginUser" />
  </div>
</template>

<script>
import FormView from "@/components/FormView.vue";
import LoginForm from "@/components/LoginForm.vue";
import { mapActions, mapState } from "vuex";

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
  },
  computed: {
    ...mapState({
      isAuth: (state) => state.auth.isAuth,
      race: (state) => state.auth.race,
      user: (state) => state.auth.user,
    }),
  },
};
</script>
