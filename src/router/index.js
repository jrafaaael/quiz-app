import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Game from "../views/Game/Game.vue";

import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/question/:id',
    name: 'Game',
    component: Game,
    params: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach(async (to, from) => {
  if(to.path.includes('question')) {
    if (to.params.id === "1") await store.dispatch("GAME/getQuestions");
    else document.querySelector("input:checked").checked = false;
  }
});

router.beforeEach((to, from) => {
  if(to.path.includes('question') && to.params.id != store._state.data.GAME.QUESTION) {
    return {
        name: "Game",
        params: {
            id: store._state.data.GAME.QUESTION,
        },
    };
  }
})

export default router
