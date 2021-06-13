import { createStore } from 'vuex'
import GAME_CONFIG from "./modules/game-config/game-config";
import GAME from "./modules/game/game";

export default createStore({
  modules: {
    GAME_CONFIG,
    GAME
  }
})
