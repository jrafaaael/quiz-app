<template>
    <div class="radio">
        <label class="radio-wrapper">
            <input
                v-model="category"
                :value="id"
                type="radio"
                name="category"
                class="radio-input"
                @change="$emit('change-category', +$event.target.value)"
            />
            <span class="radio-tile">
                <span class="radio-icon">
                    <icon :name="iconName" />
                </span>
                <span class="radio-label">
                    {{ name }}
                </span>
            </span>
        </label>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Icon from "@/components/Icon.vue";

export default {
    name: "Category",
    components: {
        Icon,
    },
    data() {
        return {
            category: null,
        };
    },
    props: ["iconName", "name", "id"],
    emits: ["change-category"],
    mounted() {
        this.category = this.CATEGORY;
    },
    computed: {
        ...mapState("GAME_CONFIG", ["CATEGORY"]),
    },
};
</script>

<style scoped>
.radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
}
.radio-input:checked + .radio-tile {
    border-color: #3182ce;
    color: #3182ce;
}
.radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #3182ce;
    border-color: #3182ce;
}
.radio-input:checked + .radio-tile .radio-icon,
.radio-input:checked + .radio-tile .radio-label {
    color: #3182ce;
}
.radio-input:focus + .radio-tile {
    border-color: #3182ce;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 0 0 4px #b5c9fc;
}
.radio-input:focus + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
}

.radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 7rem;
    min-height: 7rem;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
}
.radio-tile:before {
    content: "";
    position: absolute;
    display: block;
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192' fill='%23FFFFFF' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72.005 104 184 48 128.005' fill='none' stroke='%23FFFFFF' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'%3E%3C/polyline%3E%3C/svg%3E");
    background-size: 12px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
.radio-tile:hover {
    border-color: #3182ce;
}
.radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
}

.radio-icon {
    transition: 0.375s ease;
    color: #494949;
}
.radio-icon svg {
    width: 3rem;
    height: 3rem;
    fill: currentColor;
}

.radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
}
</style>
