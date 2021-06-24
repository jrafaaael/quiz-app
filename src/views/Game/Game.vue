<template>
    <main>
        <form @submit.prevent="nextQuestion" ref="form">
            <time-bar :max="TIME" :value="timeToEnd" />
            <div class="question-container">
                <span>{{ QUESTION }}/{{ NUMBER_OF_QUESTIONS }}</span>
                <h3 v-if="null">
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
                <span v-if="QUESTIONS">{{
                    QUESTIONS[QUESTION - 1].category
                }}</span>
            </div>
            <div class="answer-container">
                <div v-if="QUESTIONS" class="wrapper">
                    <answer
                        v-for="(answer, i) in answers"
                        v-model:userAnswer="userAnswer"
                        :disabled="timeEnd"
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
                <button :disabled="!userAnswer && !timeEnd" v-wave>
                    Next Question
                    <span>
                        <icon name="long-arrow-right" />
                    </span>
                </button>
            </div>
        </form>
    </main>
</template>

<script>
import Answer from "./components/Answer.vue";
import TimeBar from "./components/TimeBar.vue";
import Icon from "@/components/Icon";

import { mapActions, mapState } from "vuex";

import "vue-skeletor/dist/vue-skeletor.css";
import { Skeletor } from "vue-skeletor";

import Parser from "../../utils/parser";

export default {
    components: {
        Answer,
        TimeBar,
        Icon,
        Skeletor,
    },
    data() {
        return {
            Parser: new Parser(),
            userAnswer: null,
            timeToEnd: null,
            timerID: null,
            timeEnd: false,
        };
    },
    methods: {
        ...mapActions("GAME", [
            "getQuestions",
            "setCurrentQuestionNumber",
            "increaseScore",
        ]),
        nextQuestion() {
            if (this.QUESTION < this.NUMBER_OF_QUESTIONS) {
                if (this.checkCorrectAnswer) this.increaseScore();
                this.setCurrentQuestionNumber(this.QUESTION + 1);
                this.userAnswer = null;
                this.timeToEnd = this.TIME;
                this.timeEnd = false;
                this.$refs.form.reset();
                clearInterval(this.timerID);
                this.timerID = setInterval(this.countdown, 1000);
            } else if (this.checkEndGame) {
                this.$router.push({
                    name: "Score",
                });
            }
        },
        countdown() {
            this.timeToEnd--;
        },
    },
    watch: {
        timeToEnd(n, o) {
            if (n <= 0) {
                clearInterval(this.timerID);
                this.timeEnd = true;
                this.userAnswer = null;
            }
        },
    },
    computed: {
        ...mapState("GAME_CONFIG", ["NUMBER_OF_QUESTIONS", "TIME"]),
        ...mapState("GAME", ["QUESTION", "QUESTIONS", "GAME_STATE"]),
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
    async created() {
        await this.getQuestions();
        this.timeToEnd = this.TIME;
        this.timerID = setInterval(this.countdown, 1000);
    },
};
</script>

<style scoped>
form {
    overflow: hidden;
}

.question-container {
    height: 200px;
    margin-top: auto;
    padding: 1rem;
    background-color: #9481ffbd;
    border-radius: 5px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}

.question-container > span {
    content: "";
    width: fit-content;
    padding: 0.25rem 0.75rem;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    font-weight: 700;
    position: absolute;
    left: 50%;
    transform: translateX(-50%) translateY(0);
}

.question-container > span:first-child {
    top: -15px;
}

.question-container > span:last-child {
    bottom: -15px;
}

.skeletons {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: start;
    gap: 1rem;
}

.answer-container .skeletons {
    gap: 2rem;
}

.vue-skeletor {
    width: 100%;
    background-color: rgba(0, 0, 0, 0.15);
}

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
    font-size: 1.2rem;
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
