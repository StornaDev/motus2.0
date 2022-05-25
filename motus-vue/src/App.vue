<template>
  <div>
      <nav>
        <router-link class="link" to="/"> Accueil </router-link> |
        <router-link class="link" to="/login"> Se connecter</router-link> |
        <router-link class="link" to="/register"> S'inscrire</router-link>
      </nav>
      <router-view />

  </div>
  
</template>

<script>


export default {
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
