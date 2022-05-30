<template>
  <div id="container">
    <div id="content">
      <!-- <Grid 
             v-bind:mode="mode"
             v-bind:nbrLettre="nbrLettre"/> -->
      <button class="btn" @click="start($event)">lancer la partie</button>
    </div>
  </div>
</template>

<script>
// import Grid from '../components/TableGrid.vue'



export default {


    data:function(){
           return{
                nbrLettre : '',
                mode : '',
                container:'',
                grille:[],
                currentRowContent: '',
                currentRow:0,
                currentColumn: 0,           
           }
    },
    // components: {
    //     Grid
    // },
    methods:{
        start: function (child) {
            if (!this.gameStarted) {
                var container = child.target.parentNode;
                this.container = child.target.parentNode;
                child.target.style.display = "none";

                var tab = document.createElement("table");
                var tabBody = document.createElement("tbody");

                for (var i = 0; i < 6; i++) {
                    let tab = new Array();
                    this.grille.push(tab)
                
                    var row = document.createElement("tr");

                for (var j = 0; j < this.nbrLettre; j++) {
                    
                    var cell = document.createElement("td");

                    row.appendChild(cell);
                }
                tabBody.appendChild(row);
                }
                
                tab.appendChild(tabBody);
                container.appendChild(tab);
                this.gameStarted = true;
            }
        },
        printLetter: function(code){
            
            this.currentRowContent= code[3];
            
            this.refreshGrid()
            this.currentColumn++;
        },
        refreshGrid: function() { 
            this.container.children[1].children[0].children[this.currentRow].children[this.currentColumn].innerHTML = this.currentRowContent

        }
  },  
    mounted : function() {
        if(this.$store.state.gameInfos.nbrLettre =='' ||  this.$store.state.gameInfos.mode ==''){
            this.$router.push('/play');
            return;
        }
        this.nbrLettre = this.$store.state.gameInfos.nbrLettre;
        this.mode = this.$store.state.gameInfos.mode;
        
        // appeller la bdd et récupérer un mot
        window.addEventListener("keypress", e => {
            this.printLetter(e.code)
        });
    }
}
</script>





<style>
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
        border :none;
        border-bottom: 5px solid #3b5671;
        width: 200px;
        transition: all 0.1s;
        -webkit-transition: all 0.1s;
        cursor: pointer;
    }

    .btn:active {
        transform: translate(0px,5px);
        -webkit-transform: translate(0px,5px);
        border-bottom: 2px solid #3b5671;
    }

    .btn:hover{
        background-color: #7593b1;
    }
</style>