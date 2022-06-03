<template>
    <div id="container">
        <div class="textPrimary"> Vous etes sur le point de créer une partie</div>
        <div class="textSecondary">Veuillez choisir quel type de partie vous voulez créer</div>
        <div id="btns">
            <button class="btn "  :class="{'btn-active' : this.mode =='solo' }" id="solo" @click="switchToSolo">Solo</button>
            <button class="btn" :class="{'btn-active' : this.mode =='multi' }" id="multi" @click="switchToMulti">Multijoueur</button>
        </div>
        <div id="selectLetter">
            <label for="selecter">Choose a number of letter:</label><br>
            <select name="letterSelecter" v-model="nbrLettre" id="selecter">
                <option value="6" selected>6 lettres</option>
                <option value="7">7 lettres</option>
                <option value="8">8 lettres</option>
            </select>
        </div>
        <button class="btn btn-send"  id="send" @click="envoyer">Démarrer</button>

    </div>
</template>

<script>


export default {
    data:function(){
           return{
               mode:'solo',
               nbrLettre:'6'
           }
    },

    methods:{
        
        switchToSolo: function(){
            this.mode = 'solo' 
        },
        
        switchToMulti: function(){
            this.mode = 'multi'
        },
        
        envoyer: function(){
            const self = this;
            this.$store.dispatch("moveToGame",{
                mode: this.mode,
                nbrLettre: this.nbrLettre
            }).then(function (){
                // console.log('affichage du contenu du store dans playview : ' +this.$store.state.gameInfo);
                self.$router.push('/game');
            }).catch(function (err){
                console.log(err);
            })              

        }
    }
    

}
</script>
<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap');

    #container{
        text-align: center;
        width: 100%;
        height: 100%;
        font-family: "Montserrat", sans-serif;

    }

    .textPrimary{
        font-size: 1.75em ;
        text-align: center;
        margin-top: 20vh;
    }
    .textSecondary {
        font-size: 1.5em ;
        text-align: center;
        margin-top: 1vh;

    }

    #btns{
        width: 100%;
        text-align: center;
        margin-top: 15vh;
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

    .btn-active {
        border-bottom: 2px solid #3b5671;
        background-color: #7593b1;
    }

    .btn:hover{
        background-color: #7593b1;
    }

    .btn-send {
        margin-top: 7vh;
        background-color: #414950;
        border-bottom: 5px solid #262c32;
    }
    .btn-send:hover {
        background-color: #686f76;
    }

    .btn-send :active {
        transform: translate(0px,5px);
        -webkit-transform: translate(0px,5px);
        border-bottom: 2px solid #262c32;
    }


    #multi{
        margin-left: 10vh;
    }

    #selectLetter{
        margin-top: 5vh;
    }
    
    #selecter{
        margin-top: 5vh;
        height: 40px;
        width: 200px;
    }


  
            
        


</style>