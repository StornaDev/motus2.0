<template>
  <div id="container">
    <div id="content">
      <GridComponent v-if="gameStarted" />
      <h3 v-if="this.$store.state.gameInfos.win">Victoire !</h3>
      <h2 v-if="this.$store.state.gameInfos.gameEnd">La partie est terminée</h2>
      <TchatComponent v-if="gameStarted"></TchatComponent>
      <!-- <Grid 
             v-bind:mode="mode"
             v-bind:nbrLettre="nbrLettre"/> -->
      <button v-if="!gameStarted" class="btn" @click="start($event)">
        lancer la partie
      </button>
    </div>
  </div>
</template>

<script>
// import Grid from '../components/TableGrid.vue'
import GridComponent from "../components/GridComponent.vue";
import TchatComponent from "../components/TchatComponent.vue";

export default {
  data: function () {
    return {
      gameStarted: false,
    };
  },
  components: {
    GridComponent,
    TchatComponent,
  },

  mounted() {
    if (
      this.$store.state.gameInfos.nbrLettre == "" ||
      this.$store.state.gameInfos.mode == ""
    ) {
      this.$store.dispatch("getGameInfosFromBdd", {
        room_code: this.$route.params.code,
      });
      // this.$router.push("/play");
      // return;
    }

    const roomInfos = {
      name: this.$store.state.userInfos.name,
      room_code: this.$route.params.code,
      nbrLettre: this.$store.state.gameInfos.nbrLettre,
      mode: this.$store.state.gameInfos.mode,
    };

    this.$store.dispatch("create_room", roomInfos);
    this.$store.dispatch("updateUserRoom", roomInfos);
  },
  methods: {
    start: function () {
      this.gameStarted = true;
    },
  },
};
</script>






<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

#container {
  text-align: center;
  width: 100%;
  height: 100%;
  font-family: "Montserrat", sans-serif;
}

#content {
  margin-top: 20vh;
  display: flex;
  justify-content: center;
}

table {
  border-spacing: 0;
  margin: auto;
  margin-top: 1%;
  border-style: solid;
  border-color: white;
  background-color: #5e83d1;
}
td {
  border: 1px solid black;
  padding: 2px;
  width: 3.5vw;
  height: 3.5vw;
  text-align: center;
  font-family: "Poppins", sans-serif;
  border-style: solid;
  border-color: #ddd;
  color: white;
}

.btn {
  padding: 10px 40px;
  border-radius: 10px;
  font-size: 25px;
  color: #ffffff;
  text-decoration: none;
  background-color: #476f96;
  border: none;
  border-bottom: 5px solid #3b5671;
  width: 200px;
  transition: all 0.1s;
  -webkit-transition: all 0.1s;
  cursor: pointer;
}

.btn:active {
  transform: translate(0px, 5px);
  -webkit-transform: translate(0px, 5px);
  border-bottom: 2px solid #3b5671;
}

.btn:hover {
  background-color: #7593b1;
}
</style>