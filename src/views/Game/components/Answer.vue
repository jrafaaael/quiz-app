<template>
    <div class="option">
        <input
            :value="answer"
            :id="id"
            class="sr-only"
            type="radio"
            name="card"
            :disabled="disabled"
            @change="$emit('update:userAnswer', $event.target.value)"
        />
        <label :for="id">
            <span>
                {{ Parser.parse(answer, "text/html") }}
            </span>
        </label>
    </div>
</template>

<script>
import Parser from "../../../utils/parser";

export default {
    name: "Answer",
    props: ["answer", "id", "disabled"],
    data() {
        return {
            Parser: new Parser(),
        };
    },
    emits: ["update:userAnswer"],
};
</script>

<style scoped>
[type="radio"]:checked ~ label {
    border-color: #3182ce;
    background-color: rgba(97, 154, 234, 0.16);
    color: #333;
}

label {
    position: relative;
    display: grid;
    align-items: center;
    grid-gap: 20px;
    height: 55px;
    padding: 0 20px;
    border-radius: 6px;
    border: 2px solid transparent;
    background-color: transparent;
    transition: all 300ms ease-in;
}

input:focus-visible + label {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}

label:hover {
    border-color: #3182ce;
}

input + label span {
    padding-left: 22px;
    display: block;
    position: relative;
}
label span:not(:empty) {
    padding-left: 30px;
}
input + label span:before,
input + label span:after {
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    border-radius: 50%;
    left: 0;
    top: 0;
    position: absolute;
}
label span:before {
    background: #d1d7e3;
    transition: background 0.2s ease,
        transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 2);
}
label span:after {
    background: #fff;
    transform: scale(0.78);
    transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.4);
}
input:checked + label span:before {
    transform: scale(1.04);
    background: #3182ce;
}
input:checked + label span:after {
    transform: scale(0.4);
    transition: transform 0.3s ease;
}
input + label:hover span:before {
    transform: scale(0.92);
}
input + label:hover span:after {
    transform: scale(0.74);
}
input:checked + label:hover span:after {
    transform: scale(0.4);
}

.option:not(:last-child) {
    margin-bottom: 7px;
}

input:disabled + label {
    cursor: not-allowed;
    border-color: transparent;
    opacity: 0.5;
    transition: none;
}
</style>
