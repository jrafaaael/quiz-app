// IMPORTS
import {
    changeCategory,
    changeDifficulty,
    changeQuestionsQuantity,
    changeTimeToResponse,
} from "./mutation-types";

// VARIABLES
const GAME_CONFIG = {
    namespaced: true,
    state: {
        CATEGORY: "",
        DIFFICULTY: "easy",
        NUMBER_OF_QUESTIONS: 10,
        TIME: 10,
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
        [changeTimeToResponse](state, payload) {
            state.TIME = payload;
        },
    },
    actions: {
        changeCategory({ commit }, payload) {
            commit("changeCategory", payload);
        },
        changeDifficulty({ commit }, payload) {
            commit("changeDifficulty", payload);
        },
        changeQuestionsQuantity({ commit }, payload) {
            commit("changeQuestionsQuantity", payload);
        },
        changeTimeToResponse({ commit }, payload) {
            commit("changeTimeToResponse", payload);
        },
    },
};

// EXPORTS
export default GAME_CONFIG;
