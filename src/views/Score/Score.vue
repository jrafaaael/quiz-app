<template>
    <main>
        <section>
            <h1>Congratulations!</h1>
            <h3>You score is {{ SCORE }}/{{ NUMBER_OF_QUESTIONS }}</h3>
            <img :src="imageToLoad.path" :alt="imageToLoad.description" />
            <button v-wave>
                <router-link :to="{ name: 'Home' }">
                    Play Again!
                </router-link>
            </button>
        </section>
        <confetti :config="confettiConfig" />
    </main>
</template>

<script>
import Confetti from "@/components/Confetti";

import { mapState } from "vuex";

export default {
    components: {
        Confetti,
    },
    data() {
        return {
            confettiConfig: {
                angle: 90,
                spread: 100,
                startVelocity: 50,
                elementCount: 100,
                dragFriction: 0.11,
                duration: 10000,
                stagger: 26,
                width: "15px",
                height: "15px",
                colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
            },
        };
    },
    computed: {
        ...mapState("GAME", ["SCORE"]),
        ...mapState("GAME_CONFIG", ["NUMBER_OF_QUESTIONS"]),
        imageToLoad() {
            const image =
                this.SCORE > this.NUMBER_OF_QUESTIONS / 2
                    ? "Succes"
                    : "Failure";
            return {
                path: require(`@/assets/images/${image}.png`),
                description: image,
            };
        },
    },
};
</script>

<style scoped>
section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

img {
    width: 200px;
}

button {
    padding: 0.5rem 1rem;
    background-color: #3182ce;
    border-radius: 5px;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
        0 3px 1px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

a {
    text-decoration: none;
    color: snow;
    font-size: 1.2rem;
    text-transform: capitalize;
    font-weight: 700;
}
</style>
