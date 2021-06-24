<template>
    <div class="input-number">
        <button
            class="minus"
            :disabled="globalDisabled || isLessThan"
            @click.prevent="subtract"
        >
            <icon name="minus" />
        </button>
        <input
            type="number"
            :id="id"
            :disabled="globalDisabled"
            :min="min"
            :max="max"
            :step="step"
            v-model="value"
            @keyup="checkValue"
        />
        <button
            class="plus"
            :disabled="globalDisabled || isGreaterThan"
            @click.prevent="add"
        >
            <icon name="plus" />
        </button>
    </div>
</template>

<script>
import Icon from "@/components/Icon";

export default {
    name: "CINumber",
    components: {
        Icon,
    },
    props: {
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
        step: {
            type: Number,
            default: 1,
        },
        globalDisabled: {
            type: Boolean,
            default: false,
        },
        id: String,
        currentValue: Number
    },
    data() {
        return {
            value: this.currentValue ?? this.min,
        };
    },
    methods: {
        subtract() {
            this.value -= +this.step;
            this.emitNewValue();

        },
        add() {
            this.value += +this.step;
            this.emitNewValue();
        },
        checkValue() {
            if(this.value > this.max) this.value = this.max;
            else if(this.value < this.min) this.value = this.min;
            this.emitNewValue();
        },
        emitNewValue() {
            this.$emit('new-value', this.value);
        },
    },
    emits: ['new-value'],
    computed: {
        isLessThan() {
            return this.value <= this.min;
        },
        isGreaterThan() {
            return this.value >= this.max;
        },
    },
};
</script>

<style scoped>
.input-number {
    width: fit-content;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
}

input[type="number"] {
    -moz-appearance: textfield;
    border: none;

    font-weight: 700;
    text-align: center;
    outline: none;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}
input[type="number"]:hover::-webkit-inner-spin-button,
input[type="number"]:hover::-webkit-outer-spin-button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

button {
    padding: 0.215rem;
    background-color: rgb(230, 230, 230);
    border-radius: 4.9px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
}

svg {
    width: 13px;
    height: 13px;
    transition: transform ease 250ms;
}

button:focus-visible svg {
    transform: scale(1.3);
    fill: #3182ce;
}

button:active svg {
    transform: scale(1.3);
}

button:hover svg {
    fill: #3182ce;
}
</style>
