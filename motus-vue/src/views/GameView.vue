<template>
  <div id="container">
    <div id="content">
      <GridComponent v-if="gameStarted" />
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

export default {
  data: function () {
    return {
      gameStarted: false,
      //   nbrLettre: "",
      //   mode: "",
      //   container: "",
      //   grille: [],
      //   currentLetter: "",
      //   currentRowContent: [],
      //   currentRow: 0,
      //   currentColumn: 0,
      //   mot: "alpaga",
    };
  },
  components: {
    GridComponent,
  },
  mounted() {
    if (
      this.$store.state.gameInfos.nbrLettre == "" ||
      this.$store.state.gameInfos.mode == ""
    ) {
      this.$router.push("/play");
      return;
    }
  },
  methods: {
    start: function () {
      this.gameStarted = true;
      //   if (!this.gameStarted) {
      //     var container = child.target.parentNode;
      //     this.container = child.target.parentNode;
      //     child.target.style.display = "none";

      //     var tab = document.createElement("table");
      //     var tabBody = document.createElement("tbody");

      //     // 6 : number of rows
      //     for (var i = 0; i < 6; i++) {
      //       let tab = new Array();
      //       this.grille.push(tab);

      //       var row = document.createElement("tr");

      //       for (var j = 0; j < this.nbrLettre; j++) {
      //         var cell = document.createElement("td");

      //         row.appendChild(cell);
      //       }
      //       tabBody.appendChild(row);
      //     }
      //     for (let j = 0; j < this.nbrLettre; j++) {
      //       this.currentRowContent.push("");
      //     }
      //     tab.appendChild(tabBody);
      //     container.appendChild(tab);
      //     this.gameStarted = true;
      //   }
    },

    //     printLetter: function (keyPressed) {
    //       //checking if it is a letter using the keyCode
    //       if (
    //         this.currentColumn < this.nbrLettre &&
    //         keyPressed.keyCode >= 97 &&
    //         keyPressed.keyCode <= 122
    //       ) {
    //         // Replace 6 by the number of columns

    //         this.currentRowContent[this.currentColumn] = keyPressed.key;
    //         this.currentLetter = keyPressed.key.toUpperCase();
    //         this.refreshGrid("add");
    //         this.currentColumn++;
    //       }
    //     },
    //     compareWords: function () {
    //       for (let i = 0; i < this.nbrLettre; i++) {
    //         let currentCell =
    //           this.container.children[1].children[0].children[this.currentRow]
    //             .children[i];

    //         if (this.mot.indexOf(this.currentRowContent[i]) == -1) {
    //           console.log(this.currentRowContent[i] + " n'est pas dans le mot");
    //         } else if (this.currentRowContent[i] == this.mot[i]) {
    //           currentCell.classList.add("caseGood");
    //         } else {
    //           let currentLetter = this.currentRowContent[i];
    //           let counter = 0;

    //           for (let j = 0; j < this.mot.length; j++) {
    //             // on compte le nbr d'occurence de la lettre dans le mot
    //             if (this.mot[j] == currentLetter) {
    //               counter++;
    //             }
    //           }

    //           console.log(counter);

    //           //on retire 1 a cont pour chaque occurence de la lettre avant la position de la case qu'on compare
    //           for (let k = 0; k < this.currentColumn - 1; k++) {
    //             if (this.currentRowContent[k] == currentLetter) {
    //               counter = counter - 1;
    //             }
    //           }

    //           if (this.currentColumn - this.nbrlettre > 0) {
    //             for (let k = this.currentColumn + 1; k < this.nbrlettre; k++) {
    //               if (this.currentRowContent[k] == currentLetter) {
    //                 counter = counter - 1;
    //               }
    //             }
    //           }

    //           // si il reste une occurence dans cont on change la couleur de la case de cases
    //           if (counter > 0) {
    //             currentCell.classList.add("caseYellow");
    //           }
    //         }
    //       }
    //       this.currentColumn = 0;
    //       this.currentRow = this.currentRow + 1;
    //       this.currentRowContent = [];
    //     },

    //     refreshGrid: function (action) {
    //       if (action == "add") {
    //         // If currentColumn is not the last row
    //         this.container.children[1].children[0].children[
    //           this.currentRow
    //         ].children[this.currentColumn].innerHTML = this.currentLetter;
    //       } else {
    //         if (this.currentColumn >= 1) {
    //           this.container.children[1].children[0].children[
    //             this.currentRow
    //           ].children[this.currentColumn - 1].innerHTML = "";
    //           this.currentColumn = this.currentColumn - 1;
    //         }
    //       }
    //     },
    //   },
    //   mounted: function () {
    //     if (
    //       this.$store.state.gameInfos.nbrLettre == "" ||
    //       this.$store.state.gameInfos.mode == ""
    //     ) {
    //       this.$router.push("/play");
    //       return;
    //     }
    //     this.nbrLettre = this.$store.state.gameInfos.nbrLettre;
    //     this.mode = this.$store.state.gameInfos.mode;

    //     // appeller la bdd et récupérer un mot
    //     window.addEventListener("keypress", (e) => {
    //       this.printLetter(e);
    //     });
    //     window.addEventListener("keyup", (e) => {
    //       if (e.key == "Backspace") {
    //         this.refreshGrid("remove");
    //       } else if (e.key == "Enter") {
    //         this.compareWords();
    //       }
    //     });
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