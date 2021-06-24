<template>
    <progress
        :max="max"
        :value="value"
        :style="{ '--w': width, '--h': height, '--c': color }"
    ></progress>
</template>

<script>
export default {
    name: "TimeBar",
    props: {
        width: {
            default: "100%",
        },
        height: {
            default: "5px",
        },
        color: {
            default: "#b5c9fc",
        },
        value: Number,
        max: Number,
    },
};
</script>

<style scoped>
progress {
    width: var(--w);
    height: var(--h);
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
}

::-webkit-progress-bar {
    background-color: white;
}

::-webkit-progress-value {
    background-color: var(--c);
    transition: width 1s;
}
</style>
