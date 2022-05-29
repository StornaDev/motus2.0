<template>
    <div id="container">
        <div id="content">
            <p>{{nbrLettre}}</p>
            <p>{{mode}}</p>
            <Grid 
             v-bind:mode="mode"
             v-bind:nbrLettre="nbrLettre"/>
        </div>
        

    </div>
</template>

<script>
import Grid from '../components/TableGrid.vue'



export default {


    data:function(){
           return{
                nbrLettre : '',
                mode : ''               
           }
    },
    components: {
        Grid
    },

    mounted : function() {


        if(this.$store.state.gameInfos.nbrLettre =='' ||  this.$store.state.gameInfos.mode ==''){
            this.$router.push('/play');
            return;
        }

        this.nbrLettre = this.$store.state.gameInfos.nbrLettre;
        this.mode = this.$store.state.gameInfos.mode;

        console.log(this.nbrLettre);
        console.log(this.mode);


        // appeller la bdd et récupérer un mot
    
    }
}
</script>
<style>

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

    #container{
        text-align: center;
        width: 100%;
        height: 100%;
        font-family: "Montserrat", sans-serif;

    }

    #content{
        margin-top: 20vh;
    }

    

   

  
            
        


</style>