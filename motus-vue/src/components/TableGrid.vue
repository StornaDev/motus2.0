<template>
    <div id="container">
        {{table}}
    </div>
</template>

<script>
    export default {
        name: 'TableGrid',
        data:function(){
           return{
               table
           }
        },
        props: {
             mode: String,
             nbrLettre: Number
        },
        created: function (){
            // console.log(this.mode, this.nbrLettre);
            var container = document.getElementById("container");
            console.log(container);
            // creates a <table> element and a <tbody> element
            var tab = document.createElement("table");
            var tabBody = document.createElement("tbody");

            // creating all cells
            for (var i = 0; i < this.staticLettre; i++) {
                // creates a table row
                var row = document.createElement("tr");

                for (var j = 0; j < 7; j++) {
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
            
            
            }

        
    }
    
</script>




<style>


    table {
        border-spacing: 0;
        margin: auto;
        margin-top: 1%;
        border-style: solid;
        border-color: white;
        background-color: #5E83D1;
    }   
    td {
        border: 1px solid black;
        padding: 2px;
        width: 5vw;
        height: 5vw;
        text-align: center;
        font-family: "Poppins", sans-serif;
        border-style: solid;
        border-color: #DDD;
        color : white

    }
</style>