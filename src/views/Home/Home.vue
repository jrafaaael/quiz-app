<template>
    <main>
        <form @submit.prevent="handleSubmit">
            <div class="user-container">
                <h1>Hi, <span>User</span>!</h1>
            </div>
            <fieldset class="basic-setup">
                <legend>Basic setup</legend>
                <div class="questions">
                    <label for="questions">
                        <h4>Number of Questions</h4>
                    </label>
                    <c-i-number
                        :min="10"
                        :max="25"
                        :step="5"
                        id="questions"
                        @new-value="changeQuestionsQuantity($event)"
                    />
                </div>
                <div class="time">
                    <label for="time">
                        <h4>Time</h4>
                    </label>
                    <c-i-number
                        :min="10"
                        :max="25"
                        :step="5"
                        id="time"
                        :globalDisabled="true"
                    />
                </div>
                <div class="difficulty">
                    <h4>Difficulty</h4>
                    <difficulty
                        :options="['easy', 'medium', 'hard']"
                        @change-difficulty="changeDifficulty($event)"
                    />
                </div>
            </fieldset>
            <fieldset class="categories">
                <legend>Choose a Category</legend>
                <div class="categories-container">
                    <category
                        v-for="(category, i) in categories"
                        :key="i"
                        :name="category.name"
                        :iconName="category.iconName"
                        :id="category.id"
                        @change-category="changeCategory($event)"
                    />
                </div>
            </fieldset>
            <fieldset class="submit">
                <button v-wave>
                    Start game
                </button>
            </fieldset>
        </form>
    </main>
</template>

<script>
import CINumber from "./components/CINumber";
import Difficulty from "./components/Difficulty";
import Category from "./components/Category";

import { mapActions } from "vuex";

import CATEGORIES from "@/utils/categories";

export default {
    name: "Home",
    components: {
        CINumber,
        Difficulty,
        Category,
    },
    data() {
        return {
            categories: CATEGORIES,
        };
    },
    methods: {
        ...mapActions("GAME_CONFIG", [
            "changeQuestionsQuantity",
            "changeDifficulty",
            "changeCategory",
        ]),
        ...mapActions("GAME", ["resetScore", "setGameState", "setQuestions", "setCurrentQuestionNumber"]),
        handleSubmit() {
            this.$router.push({
                name: "Game",
            });
        },
        resetGame() {
            this.setGameState("finished");
            this.setCurrentQuestionNumber(1);
            this.setQuestions(null);
            this.resetScore();
        },
    },
    mounted() {
        this.resetGame();
    },
};
</script>

<style scoped>
h1,
h1 > span {
    font-family: "Roboto", sans-serif;
    text-align: center;
    font-size: 2.15rem;
}

h1 > span {
    font-style: italic;
}

fieldset {
    border: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.categories-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem 0;
}

legend {
    margin-bottom: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
}

.basic-setup > div {
    height: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.submit {
    margin-top: auto;
    justify-content: center;
    align-items: center;
}

.submit button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
}
</style>
