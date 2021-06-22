<template>
    <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Roboto:wght@100;300;400;500;700;900&display=swap');
*,
*::after,
*::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    font-family: 'Lato', sans-serif;
    letter-spacing: 0.125rem;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
    color: #333;
}

main {
    width: 100%;
    height: 100%;
    background-color: aliceblue;
    display: flex;
    justify-content: center;
    align-items: center;
}

main :is(form, section) {
    width: 100%;
    max-width: 625px;
    height: 100%;
    padding: 1.5rem 1rem;
    background-color: snow;
    border-radius: 10px;
    box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: center;
}

main :is(form, section) > *:not(:last-child) {
    margin-bottom: 2rem;
}

button {
    background-color: transparent;
    border: none;
}

svg {
    fill: currentColor;
}

.sr-only {
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

*:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

@media all and (min-width: 600px) {
    main :is(form, section) {
        height: fit-content;
        padding: 2rem 2.5rem;
        display: block;
        position: relative;
    }

    main :is(form, section) > *:not(:last-child) {
        margin-bottom: 1rem;
    }

    .user-container,
    .question-counter-container {
        position: absolute;
        left: 50%;
        transform: translateY(-50px) translateX(-50%);
    }
}
</style>
