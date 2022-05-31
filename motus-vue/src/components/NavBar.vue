<template>
    <nav class="navbar">
        <ul class="navlinks">
          <li><router-link class="link" to="/"> Accueil </router-link></li>
          <li><router-link class="link" to="/register"> S'inscrire</router-link></li>
          <li><router-link class="link" to="/play"> Jouer</router-link></li>
        </ul>
        <router-link class="link" to="/login"> Se connecter</router-link>

      </nav>
      
      <router-view />
</template>

<script>
    export default {
    name: 'NavBar',
    }
</script>




<style>
    .navlinks, ul, li, li a{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    li, a{
        font-family: "Montserrat", sans-serif;
        font-weight: 500;
        font-size: 16px;
        color: #edf0f1;
        text-decoration: none;
    }

    .navbar{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 5%;
        padding-right: 10%;
        transition: all 0.3s ease 0s;
        z-index: 3;
        background-color: #2c3e50;
        position: fixed;
        height: 15vh;

    }
    .navlinks{
        list-style: none;
    }

    .navlinks li {
        display: inline-block;
        padding: 0px 20px;
        margin-right: 20px;
    }

    .navlinks li a{
        transition: all 0.3s ease 0s;
        font-size: 25px;
    }

    .navlinks li a:hover{
        color : #0088a9;
        
    }
</style>