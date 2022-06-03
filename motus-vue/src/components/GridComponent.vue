<template>
  <div id="gridContainer">
    <table id="grid"></table>
    <h1>Bonsoir</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: function () {
    return {
      currentRow: 0,
      currentColumn: 0,
      word: "alpaga",
    };
  },
  props: {
    nbrLettres: Number,
  },
  computed: mapState([
    // map this.count to store.state.count
    "gameInfos",
  ]),
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
      let nbrOfRows = document.getElementsByClassName("row").length;
      let rows = document.getElementsByClassName("row");
      if (
        this.currentColumn < this.gameInfos.nbrLettre &&
        this.currentRow < nbrOfRows &&
        keyPressed.keyCode >= 97 &&
        keyPressed.keyCode <= 122
      ) {
        // Replace 6 by the number of columns

        console.log(rows[this.currentRow]);
        rows[this.currentRow].childNodes[this.currentColumn].innerText =
          keyPressed.key.toUpperCase();
        rows[this.currentRow].childNodes[this.currentColumn].classList.add(
          "writtendTd"
        );
        this.currentColumn += 1;
        // let row =
      }
    },
    validateWord() {
      //Permet de valider un mot
      let proposedWord = this.getProposedWord(); //On récupère la proposition
      let rows = document.getElementsByClassName("row");
      if (this.currentColumn == this.gameInfos.nbrLettre) {
        //Si il y a le bon nombre de lettres
        this.testWord(proposedWord); //Alors on test la proposition
        this.currentColumn = 0; //On remet la colonne à zéro
        this.currentRow++; //On passe à la ligne suivante
        rows[this.currentRow].childNodes[this.currentColumn].innerText = //Et la premiere case de la ligne suivante est remplie avec la première lettre
          rows[this.currentRow - 1].childNodes[this.currentColumn].innerText;
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
      console.log("Propal : " + proposition);
      //Permet de tester un mot
      let rows = document.getElementsByClassName("row");
      let columns = rows[this.currentRow].childNodes;
      for (let i = 0; i < this.word.length; i++) {
        let cont = 0;
        let niemeOccurence = 0;
        // let niemeOccurence = 0;
        for (let j = 0; j < this.word.length; j++) {
          // console.log(this.word[j]);
          // on compte le nombre d'occurence de la lettre dans le mot
          if (this.word[j].toUpperCase() == proposition[i]) {
            cont++;
            cont;
          }
        }

        for (let h = 0; h <= i; h++) {
          // console.log("lettre du mot :" + this.word[h].toUpperCase());
          // console.log("lettre de la propistion : " + proposition[h]);
          if (this.word[h].toUpperCase() == proposition[i]) {
            niemeOccurence++;
            console.log(
              "La lettre " +
                proposition[i] +
                " en position " +
                i +
                " est l'occurence " +
                niemeOccurence +
                " du mot " +
                this.word
            );
          }
        }

        // console.log("Nombre de lettres " + cont);
        if (proposition[i] == this.word[i].toUpperCase()) {
          columns[i].style.backgroundColor = "#2a9d8f";
          columns[i].style.color = "white";
        } else if (this.word.toUpperCase().includes(proposition[i])) {
          columns[i].style.backgroundColor = "#e9c46a";
          columns[i].style.color = "white";
        }
      }
    },
  },

  mounted: function () {
    this.initGrid();
    //Ajout de l'écouteur d'évènement clavier
    window.addEventListener("keypress", (e) => {
      this.printLetter(e);
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
}
td {
  border: 1px solid black;
  padding: 2px;
  width: 4vw;
  height: 4vw;
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
