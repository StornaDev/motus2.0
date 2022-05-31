<template>
  <body class="home">
      <h1>Bienvenue sur AlphaB</h1>

      <p>Nous vous proposons de jouer avec vos amis, en temps réel ou différé, au jeu du MOTUS revisité.</p>
      <p>Afin de sauvegarder votre progression et de vous faire des amis, vous pouvez vous <router-link class="link" to="/register">créer un compte</router-link>.</p>
  </body>
</template>

<style>
    body {
        /* width: 100%; */
        height: 100%;
        font-family: "Montserrat", sans-serif;
        padding-left: 10px;
        margin: 0;
        margin-top: 20vh;
    }

    .home .link {
        color: #acacac;
    }

    .home .link:hover {
        text-decoration: underline;
    }
</style>

<script>

</script>