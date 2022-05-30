<template>
  <div id="container">
    <button @click="start($event)">lancer la partie</button>
    <!-- {{table}} -->
  </div>
</template>

<script>
export default {
  name: "TableGrid",
  data: function () {
    return {
      gameStarted: false,
    };
  },
  props: {
    mode: String,
    nbrLettre: Number,
  },
  methods: {
    start: function (child) {
      if (!this.gameStarted) {
        var container = child.target.parentNode;
        child.target.style.display = "none";

        var tab = document.createElement("table");
        var tabBody = document.createElement("tbody");

        // creating all cells
        for (var i = 0; i < 7; i++) {
          // creates a table row
          var row = document.createElement("tr");

          for (var j = 0; j < this.nbrLettre; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");

            row.appendChild(cell);
          }

          // add the row to the end of the table body
          tabBody.appendChild(row);
        }

        // put the <tbody> in the <table>
        tab.appendChild(tabBody);
        // appends <table> into <body>
        container.appendChild(tab);



        this.gameStarted = true;
      }
    },
  },
};
</script>




<style>
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
  width: 5vw;
  height: 5vw;
  text-align: center;
  font-family: "Poppins", sans-serif;
  border-style: solid;
  border-color: #ddd;
  color: white;
}
</style>