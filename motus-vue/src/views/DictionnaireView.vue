<template>
    
    <div id="container">
        <div id="words">

            <div class="wordBox"  v-for="word in words" :key="word.word">
                <span class="wordText">{{word}}</span>
                <div class="icons">
                    <img class="icon" src="@/assets/modify.png" alt="modify" @click="modifyWord($event)">
                    <img class="icon" src="@/assets/clear.png" alt="clear" @click="deleteWord($event)" >
                </div>

            </div>
                
            
        </div>

        <div id="letterBtn">
            <button class="btn" :class="{'btn-active' : this.letter =='6' }" @click="switchWords('6')">
                
                <span >6 lettres</span>
            </button>
            <button class="btn" :class="{'btn-active' : this.letter =='7' }" @click="switchWords('7')">
               
                <span >7 lettres</span>
            </button>
            <button class="btn" :class="{'btn-active' : this.letter =='8' }" @click="switchWords('8')">
                
                <span >8 lettres</span>
            </button>

        </div>
        

        <input class="inputText" type="text" v-model="wordInput" >
        <br>
        <button @click="ajouter" class="btn" :class="{'btn-active' : this.letter =='' }" :disabled="this.letter ==''">
            <span v-if="status == 'loading'"> Ajout en cour ...</span>
            <span v-else>Ajouter</span>
        </button>

        <!-- <button @click="sendModification" class="btn" :class="{'btn-active' : this.letter =='' }" :disabled="this.modifiedWord ==''">
            <span v-if="status == 'loading'"> Ajout en cour ...</span>
            <span v-else>Modifier</span>
        </button> -->
    </div>
   

</template>

    

<script>
import { mapState } from 'vuex'

export default{
    name: 'DicoView',
    data:function(){
           return{ 
            //    words:[],
               letter:'',
               wordInput:'',
               modifiedWord:''
           }
       },
    mounted: function(){
      
        if (this.$store.state.user.id == -1) {
            this.$router.push('/login')
            return;
        }
        
        this.$store.dispatch('getUserInfos');

        
    
    },
    computed: {
    
        ...mapState({
            user:'userInfos',
            words: 'words'
        }),
         ...mapState(['status']),
        
    },
    methods:{
        ajouter: function () {
            if(confirm("Voulez-vous vraiment ajouter ce mot ?")){
                this.$store.dispatch('addWord',{
                    word:this.wordInput,
                    letter: this.wordInput.length + ""
                }).then(function (response){
                    console.log(response);
                // self.words = response.data
                }).catch(function (error){
                    console.log(error);
                });
            }
            
        },
        deleteWord: function (box) {
       
            if(confirm("Do you really want to delete?")){  
                let word = box.target.parentNode.parentNode.childNodes[0].innerText;
                
                this.$store.dispatch('deleteWord', {
                word : word
                }).then(function (){
                }).catch(function (error){
                    console.log(error);
                });
            }

        },
        modifyWord: function () {
       
            // if(confirm("Do you really want to delete?")){  
            //     let word = box.target.parentNode.parentNode.childNodes[0].innerText;
                
            //     this.$store.dispatch('deleteWord', {
            //     word : word
            //     }).then(function (){
            //     }).catch(function (error){
            //         console.log(error);
            //     });
            // }

        },
        sendModification: function (box) {
       
            if(confirm("Do you really want to delete?")){  
                let word = box.target.parentNode.parentNode.childNodes[0].innerText;
                
                this.$store.dispatch('deleteWord', {
                word : word
                }).then(function (){
                }).catch(function (error){
                    console.log(error);
                });
            }

        },
        switchWords: function(letter){
           this.letter = letter;
           this.$store.dispatch('getDicoInfos', {
               letter : letter
           }).then(function (){
            }).catch(function (error){
                console.log(error);
            });
        },
    }
}
</script>

<style scoped>

    #letterBtn{
        margin-bottom:1vh;
    }
    #container{
        margin-top: 20vh;
        text-align: center;
        padding : auto;
    }
    #words{
            width: 800px;
            height: 300px;
            border: #3b5671 solid 1px;
            margin: 2vh auto 2vh auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            justify-content: center;
            align-items: center;
            text-align: center;
            grid-gap: 1rem;
            padding: 1rem 80px;
            font-size: 1.2rem;
            overflow-y: scroll;
    }
    .wordBox{
        font-family: "Montserrat", sans-serif;
        text-align: center;
        width: 150px;
    
        height: 75px;
        margin: 10px 10px 10px 10px;
    }

    .wordText{
        vertical-align: middle;
    }

    .icon{
        width:20px;
        margin : 10% 5% 0 5%;
        opacity: 0.5;
        cursor: pointer;
    }

    .icon:hover{
        opacity: 1;
    }
    
    .btn {
        padding: 5px 20px;
        border-radius: 10px;
        font-size: 15px;
        color: #ffffff;
        margin: 0 0.5vw;
        text-decoration: none;
        background-color: #476f96;
        border :none;
        border-bottom: 5px solid #3b5671;
        width: 100px;
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
        background-color: #6a91b7;
    }

    .btn:hover{
        background-color: #7593b1;
    }

    input{
        margin: 2vw 0 1vw 0;
    }
    .inputText{
        height: 30px;
        width: 200px;
        border-radius: 3px;
        background-color: #e7eff6;

    }
</style>