<template>
    <div id="container">
        <div id="content">
            {{nbrLettre}}
            {{mode}}
        </div>
        

    </div>
</template>

<script>

//  import { mapState } from 'vuex'


export default {

    data:function(){
           return{
                nbrLettre : '',
                mode : ''               
           }
       },

    mounted : function() {


        if(this.$store.state.gameInfos.nbrLettre =='' ||  this.$store.state.gameInfos.mode ==''){
            this.$router.push('/play');
            return;
        }

        this.nbrLettre = this.$store.state.gameInfos.nbrLettre;
        this.mode = this.$store.state.gameInfos.mode;

        console.log(this.$store.state.gameInfos);

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

    

   

  
            
        


</style>