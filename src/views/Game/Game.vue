<template>
    <main>
        <section>
            <div class="question-counter-container">
                <p class="question-counter">
                    <span>Question {{ QUESTION }}</span
                    >/{{ NUMBER_OF_QUESTIONS }}
                </p>
            </div>
            <div class="category-container">
                <p v-if="QUESTIONS" class="category">
                    {{ QUESTIONS[QUESTION - 1].category }}
                </p>
                <skeletor v-else width="50%" />
            </div>
            <div class="question-container">
                <h3 v-if="QUESTIONS">
                    {{
                        Parser.parse(
                            QUESTIONS[QUESTION - 1].question,
                            "text/html"
                        )
                    }}
                </h3>
                <div v-else class="skeletons">
                    <skeletor />
                    <skeletor width="50%" />
                </div>
            </div>
            <div class="answer-container">
                <div v-if="QUESTIONS" class="wrapper">
                    <answer
                        v-for="(answer, i) in answers"
                        v-model:userAnswer="userAnswer"
                        :key="i"
                        :answer="answer"
                        :id="`a${QUESTION}${i}`"
                    />
                </div>
                <div v-else class="skeletons">
                    <skeletor v-for="i in 5" :key="i" />
                </div>
            </div>
            <div class="next-question-container">
                <button @click="nextQuestion" :disabled="!userAnswer">
                    Next Question
                    <span>
                        <icon name="long-arrow-right" />
                    </span>
                </button>
            </div>
        </section>
        {{ SCORE }}
    </main>
</template>

<script>
import Answer from "./components/Answer.vue";
import Icon from "@/components/Icon";

import { mapActions, mapState } from "vuex";

import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

import Parser from "../../utils/parser";

export default {
    components: {
        Answer,
        Icon,
        Skeletor,
    },
    data() {
        return {
            Parser: new Parser(),
            userAnswer: null,
        };
    },
    methods: {
        ...mapActions("GAME", [
            "setCurrentQuestionNumber",
            "setGameState",
            "setQuestions",
            "increaseScore",
            "resetScore"
        ]),
        nextQuestion() {
            if (this.QUESTION < this.NUMBER_OF_QUESTIONS) {
                if (this.checkCorrectAnswer) this.increaseScore();
                this.setCurrentQuestionNumber(this.QUESTION + 1);
                this.userAnswer = null;
                this.$router.push({
                    name: "Game",
                    params: {
                        id: this.QUESTION,
                    },
                });
            } else if (this.checkEndGame) {
                this.resetGame();
            }
        },
        resetGame() {
            this.setGameState("finished");
            this.setCurrentQuestionNumber(1);
            this.setQuestions(null);
            this.resetScore();
            this.$router.push({
                name: "Home",
            });
        },
    },
    computed: {
        ...mapState("GAME_CONFIG", ["NUMBER_OF_QUESTIONS"]),
        ...mapState("GAME", ["QUESTION", "QUESTIONS", "GAME_STATE", "SCORE"]),
        answers() {
            if (this.GAME_STATE !== "finished") {
                return [
                    ...this.QUESTIONS[this.QUESTION - 1].incorrect_answers,
                    this.QUESTIONS[this.QUESTION - 1].correct_answer,
                ].sort();
            }
        },
        checkEndGame() {
            return (
                this.QUESTION === this.NUMBER_OF_QUESTIONS &&
                this.GAME_STATE === "playing"
            );
        },
        checkCorrectAnswer() {
            return (
                this.userAnswer ===
                this.QUESTIONS[this.QUESTION - 1].correct_answer
            );
        },
    },
};
</script>

<style scoped>
.question-counter-container {
    width: fit-content;
    margin: auto;
    margin-bottom: 1rem;
    padding: 0.55rem 1.15rem;
    background-color: #3182ce;
    border-radius: 50px;
    color: snow;
    font-weight: 700;
}

.question-counter {
    color: rgba(255, 250, 250, 0.75);
    font-size: 1rem;
    font-weight: 400;
}

.question-counter span {
    color: snow;
    font-size: 1.25rem;
    font-weight: 700;
}

.category {
    font-weight: 700;
    color: rgba(51, 51, 51, 0.75);
}

.answer-container .skeletons {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 2rem;
}

.next-question-container {
    width: fit-content;
    margin-top: auto;
    margin-left: auto;
}

button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    color: snow;
    text-transform: capitalize;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

button span,
svg {
    width: 20px;
    height: 20px;
}
</style>
