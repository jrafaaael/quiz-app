import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Game from "../views/Game/Game.vue";
import Score from "../views/Score/Score.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/game',
    name: 'Game',
    component: Game,
    params: true
  },
  {
    path: '/score',
    name: 'Score',
    component: Score
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if(to.path.includes('game') && from.path.includes('score')) {
    return {
      name: "Home",
    };
  }
})

export default router
