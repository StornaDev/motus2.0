<template>
  <div id="gridContainer">
    <table id="grid"></table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      currentRow: 0,
      currentColumn: 0,
      gameEnd: false,
    };
  },
  // computed: {
  //   ...mapState({
  //     word: "word",
  //   }),
  // },
  props: {
    nbrLettres: Number,
  },
  computed: mapState({
    // map this.count to store.state.count
    gameInfos: "gameInfos",
    word: "word",
  }),
  methods: {
    initGrid() {
      let grid = document.getElementById("grid");
      let nbrLettres = this.gameInfos.nbrLettre;
      for (let j = 0; j < 7; j++) {
        const row = document.createElement("tr");
        row.classList.add("row");
        grid.append(row);
        for (let i = 0; i < nbrLettres; i++) {
          let column = document.createElement("td");
          row.append(column);
        }
      }
    },

    printLetter: function (keyPressed) {
      if (!this.$store.state.gameInfos.gameEnd) {
        let nbrOfRows = document.getElementsByClassName("row").length;
        let rows = document.getElementsByClassName("row");
        if (
          this.currentColumn < this.gameInfos.nbrLettre &&
          this.currentRow < nbrOfRows &&
          keyPressed.keyCode >= 97 &&
          keyPressed.keyCode <= 122
        ) {
          // Replace 6 by the number of columns

          rows[this.currentRow].childNodes[this.currentColumn].innerText =
            keyPressed.key.toUpperCase();
          rows[this.currentRow].childNodes[this.currentColumn].classList.add(
            "writtendTd"
          );
          this.currentColumn += 1;
          // let row =
        }
      }
    },
    validateWord() {
      //Permet de valider un mot
      if (!this.$store.state.gameInfos.gameEnd) {
        let proposedWord = this.getProposedWord(); //On récupère la proposition
        let rows = document.getElementsByClassName("row");
        let nbrLigneMax = 6;
        if (this.currentColumn == this.gameInfos.nbrLettre) {
          //Si il y a le bon nombre de lettres
          this.testWord(proposedWord); //Alors on test la proposition
          this.currentColumn = 0; //On remet la colonne à zéro
          this.currentRow++; //On passe à la ligne suivante
          if (this.currentRow > nbrLigneMax) {
            this.$store.dispatch("gameEnd");
          } else {
            rows[this.currentRow].childNodes[this.currentColumn].innerText = //Et la premiere case de la ligne suivante est remplie avec la première lettre
              rows[this.currentRow - 1].childNodes[
                this.currentColumn
              ].innerText;
          }
        }
      }
    },
    getProposedWord: function () {
      //Permet de récupérer le mot proposé
      let rows = document.getElementsByClassName("row");
      let word = "";
      let columns = rows[this.currentRow].childNodes;
      for (let i = 0; i < columns.length; i++) {
        word += columns[i].innerText;
      }
      return word;
    },
    testWord: function (proposition) {
      let rows = document.getElementsByClassName("row");
      let columns = rows[this.currentRow].childNodes;
      let victoire = true;

      for (let i = 0; i < proposition.length; i++) {
        let nbrOccurence = 0;
        let niemeOccurence = 1;
        //Pour chaque lettre de la proposition

        for (let j = 0; j < proposition.length; j++) {
          //On compte le nombre d'occurence de la lettre dans le mot à trouver
          if (proposition[i] == this.word[j].toUpperCase()) {
            nbrOccurence++;
          }
        }

        for (let h = 0; h < i; h++) {
          //On calcul la nieme occurence de cette lettre dans la proposition
          if (proposition[i] == proposition[h].toUpperCase()) {
            niemeOccurence++;
          }
        }
        if (
          //Si la lettre est bien positionnée
          proposition[i] == this.word[i].toUpperCase() &&
          niemeOccurence <= nbrOccurence
        ) {
          columns[i].style.backgroundColor = "#43aa8b";
          columns[i].style.color = "white";
          columns[i].style.border = "none";
        } else if (
          //Si la lettre est comprise dans le mot à trouver mais qu'elle n'est pas bien positionnée :
          this.word.toUpperCase().includes(proposition[i]) &&
          niemeOccurence <= nbrOccurence
        ) {
          columns[i].style.backgroundColor = "#f9c74f";
          columns[i].style.color = "white";
          victoire = false;
        } else {
          victoire = false;
        }
      }

      //Si le mot est trouvé alors on modifie la victoire  à true dans le store
      if (victoire) {
        this.$store.dispatch("changeWin");
        this.$store.dispatch("gameEnd");
      }
    },
  },
  beforeCreate: function () {
    let wordInfos = {
      Length: this.$store.state.gameInfos.nbrLettre,
      room_code: this.$route.params.code,
    };
    this.$store.dispatch("getWord", wordInfos);
  },
  mounted: function () {
    this.initGrid();
    //Ajout de l'écouteur d'évènement clavier
    window.addEventListener("keypress", (e) => {
      console.log(this.$store.state.tchatFocus);
      if (!this.$store.state.tchatFocus) {
        this.printLetter(e);
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.key == "Enter") {
        this.validateWord();
      }
    });
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

.writtenTd {
  border: 5px solid black !important;
}

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
  border-spacing: 10px;
  height: 100%;
  width: 100%;
}
td {
  border: 1px solid black;
  padding: 2px;
  width: 65px;
  height: 65px;
  text-align: center;
  font-family: "Poppins", sans-serif;
  border-style: solid;
  border-color: #ddd;
  color: black;
  border-radius: 5px;
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
.caseGood {
  background-color: #f20544;
}
.caseYellow {
  background: #ffd500;
  border-radius: 50%;
  height: 3.8vw;
  width: 3.8vw;
  align-items: center;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 65px;
}
</style>
