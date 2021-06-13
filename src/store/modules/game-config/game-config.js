// IMPORTS
import {
    changeCategory,
    changeDifficulty,
    changeQuestionsQuantity
} from "./mutation-types";

// VARIABLES
const GAME_CONFIG = {
    namespaced: true,
    state: {
        CATEGORY: '',
        DIFFICULTY: 'easy',
        NUMBER_OF_QUESTIONS: 10,
    },
    mutations: {
        [changeCategory](state, payload) {
            state.CATEGORY = payload;
        },
        [changeDifficulty](state, payload) {
            state.DIFFICULTY = payload;
        },
        [changeQuestionsQuantity](state, payload) {
            state.NUMBER_OF_QUESTIONS = payload;
        },
    },
    actions: {
        changeCategory({ commit }, payload) {
            commit('changeCategory', payload);
        },
        changeDifficulty({ commit }, payload) {
            commit('changeDifficulty', payload);
        },
        changeQuestionsQuantity({ commit }, payload) {
            commit('changeQuestionsQuantity', payload);
        },
    },
}

// EXPORTS
export default GAME_CONFIG;