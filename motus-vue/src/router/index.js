import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ProfilView from "@/views/ProfilView.vue";
import GameView from "@/views/GameView.vue";
import DicoView from "@/views/DictionnaireView.vue";
import PlayView from "@/views/PlayView.vue";
import LogInView from "@/views/LogInView.vue";

const routes = [
    {
        path: '/',
        name: "Home",
        component: HomeView
    },
    {
        path: '/play',
        name: "Play",
        component: PlayView
    },
    {
        path: '/profil',
        name: "Profil",
        component: ProfilView
    },
    {
        path: '/dico',
        name: "Dictionnaire",
        component: DicoView
    },
    {
        path: '/game/:code',
        name: "Game",
        component: GameView
    },
    {
        path: '/login',
        name: "LogIn",
        component: LogInView
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;