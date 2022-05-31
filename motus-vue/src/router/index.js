import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import ProfilView from "@/views/ProfilView.vue";
import GameView from "@/views/GameView.vue";
import RegisterView from "@/views/RegisterView.vue";
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
        path: '/register',
        name: "Register",
        component: RegisterView
    },
    {
        path: '/game',
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