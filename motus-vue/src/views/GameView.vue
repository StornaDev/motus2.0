<template>
  <div id="container">
    <div id="content">
      <h1 class="gameTitle" v-if="gameStarted">AlphaBee</h1>
      <GridComponent v-if="gameStarted" />
      <!-- <h3 v-if="this.$store.state.gameInfos.win">Victoire !</h3>
      <h2 v-if="this.$store.state.gameInfos.gameEnd">La partie est terminée</h2> -->
      <EndgameModal
        v-if="this.$store.state.gameInfos.gameEnd"
        :win="this.$store.state.gameInfos.win"
      ></EndgameModal>
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
import EndgameModal from "@/components/EndgameModal.vue";
export default {
  data: function () {
    return {
      gameStarted: false,
    };
  },
  components: {
    GridComponent,
    TchatComponent,
    EndgameModal,
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
@import url("https://fonts.googleapis.com/css2?family=Molle&family=Pacifico&display=swap");

#container {
  box-sizing: border-box;
  text-align: center;
  width: 100vw;
  height: 100vh;
  font-family: "Montserrat", sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #dbdbd7;
}

#content {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 13vh;
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

.gameTitle {
  font-family: "Pacifico", cursive;
  font-style: italic;
  font-weight: 600;
  width: 100%;
  font-size: 2.5rem;
}
</style>