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
body {
    width: 100%;
    min-height: 100vh;
    color: #333;
}

button {
    background-color: transparent;
    border: none;
}
</style>
