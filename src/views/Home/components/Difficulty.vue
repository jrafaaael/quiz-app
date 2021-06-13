<template>
    <div class="options-wrapper">
        <ul
            class="options"
            :style="{
                '--width': `${tabStyle.width}px`,
                '--left': `${tabStyle.left}px`,
            }"
        >
            <li
                v-for="(option, i) in options"
                :key="i"
                class="difficulty-option"
            >
                <input
                    v-model="difficulty"
                    :id="option"
                    :value="option"
                    type="radio"
                    name="difficulty"
                    @change="changeOption"
                />
                <label :for="option">
                    {{ option }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Difficulty",
    props: ["options"],
    data() {
        return {
            difficulty: null,
            current: null,
        };
    },
    methods: {
        changeOption(e) {
            this.$emit("change-difficulty", e.target.value);
            this.current = e.target.nextElementSibling;
        },
    },
    emits: ["change-difficulty"],
    mounted() {
        this.difficulty = this.DIFFICULTY;
        this.current = document.querySelector(
            `input[type="radio"] + label[for="${this.options[0]}"]`
        );
    },
    computed: {
        ...mapState("GAME_CONFIG", ["DIFFICULTY"]),
        tabStyle() {
            return {
                width: this.current?.clientWidth,
                left: this.current?.offsetLeft,
            };
        },
    },
};
</script>

<style scoped>
.options {
    background-color: #edf2f7;
    padding: 5px 10px;
    border-radius: 4px;
    color: #718096;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
    position: relative;
    list-style: none;
}

.options::after {
    content: "";
    width: var(--width);
    height: calc(100% - 10px);
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
    position: absolute;
    top: 50%;
    left: var(--left);
    transform: translateY(-50%);
    z-index: 1;
    transition: all ease 250ms;
}

input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
}

label {
    padding: 5px 7px;
    line-height: 1;
    border-radius: 4px;
    text-transform: capitalize;
    cursor: pointer;
    display: inline-block;
    position: relative;
    z-index: 2;
}

input:checked + label {
    color: #3182ce;
    text-shadow: 0 0 0.65px #333, 0 0 0.65px #333;
}

input:focus-visible + label {
    outline: 1px solid black;
}
</style>
