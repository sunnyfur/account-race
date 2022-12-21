import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ParticipantsView from "../views/RacesView.vue";
import ProfileView from "../views/ProfileView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/participants",
    name: "participants",
    component: ParticipantsView,
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
