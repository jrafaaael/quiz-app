// IMPORTS
import axios from "axios";

import {
    setCurrentQuestionNumber,
    setQuestions,
    setGameState,
    increaseScore,
    resetScore,
} from "./mutation-types";

// VARIABLES
const GAME = {
    namespaced: true,
    state: {
        QUESTION: 1,
        QUESTIONS: null,
        GAME_STATE: "finished",
        SCORE: 0,
    },
    mutations: {
        [setCurrentQuestionNumber](state, payload) {
            state.QUESTION = payload;
        },
        [setQuestions](state, payload) {
            state.QUESTIONS = payload;
        },
        [setGameState](state, payload) {
            state.GAME_STATE = payload;
        },
        [increaseScore](state, payload) {
            state.SCORE = payload;
        },
        [resetScore](state, payload) {
            state.SCORE = payload;
        }
    },
    actions: {
        async getQuestions({ rootState, dispatch, commit }) {
            try {
                const res = await axios.get("https://opentdb.com/api.php?", {
                    params: {
                        amount: rootState.GAME_CONFIG.NUMBER_OF_QUESTIONS,
                        category: rootState.GAME_CONFIG.CATEGORY,
                        difficulty: rootState.GAME_CONFIG.DIFFICULTY,
                        type: "multiple",
                    },
                });
                const data = await res.data;
                dispatch("setQuestions", data.results);
                commit("setGameState", "playing");
            } catch (error) {
                console.log(error);
            }
        },
        setQuestions({ commit }, payload) {
            commit("setQuestions", payload);
        },
        setCurrentQuestionNumber({ commit }, payload) {
            commit("setCurrentQuestionNumber", payload);
        },
        setGameState({ commit }, payload) {
            commit("setGameState", payload);
        },
        increaseScore({ commit, state }) {
            commit("increaseScore", state.SCORE + 1);
        },
        resetScore({ commit }) {
            commit("resetScore", 0);
        },
    },
};

// EXPORTS
export default GAME;
