import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import MovieList from "../views/MovieList.vue";
import MovieDetail from "../views/MovieDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/detail/:id", component: MovieDetail },
  { path: "/now_playing", component: MovieList },
  { path: "/popular", component: MovieList },
  { path: "/top_rated", component: MovieList },
  { path: "/upcoming", component: MovieList },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
