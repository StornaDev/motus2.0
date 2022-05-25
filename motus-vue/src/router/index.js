import { createRouter, createWebHashHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Profil from "@/views/Porfil.vue";
import Game from "@/views/Game.vue";
import Register from "@/views/Register.vue";

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home
    },
    {
        path: '/profil',
        name: "Profil",
        component: Profil
    },
    {
        path: '/register',
        name: "Register",
        component: Register
    },
    {
        path: '/game',
        name: "Game",
        component: Game
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;