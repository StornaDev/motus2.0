<template>
  <div>
    <h1>Mon profil</h1>
    <div id="content">


        <div v-if="user.role == 'admin'" id="btnDico"><button> <router-link class="link" to="/dico"> Dictionnaire </router-link></button></div>
        <div id="title">
            
            connecté en tant que : <span id="name"> {{user.name}}</span>
            <br>
            votre rôle est : <span id="role"> {{user.role}}</span>
        </div>

        <div id="deconnection"><button class="btn" @click="deconnect">Deconnexion</button></div>
    </div>

    
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default{
    name: 'ProfilView',
    mounted: function(){
        // console.log(this.$store.state.user);
        if (this.$store.state.user.id == -1) {
            this.$router.push('/login')
            return;
        }
        this.$store.dispatch('getUserInfos');
    
    },
    computed: {
    
        ...mapState({
            user:'userInfos',
        }),
        
    },
    methods:{
        deconnect:function(){
            this.$store.dispatch('deconnectUser');
            this.$router.push('/login')
        }
    }
}
</script>




<style scoped>

    html {
        height: 100%;
    }
    body {
        margin: 0;
        padding: 0;
        font-family: sans-serif;
    }

    label{
        margin-top: 100px;
    }

    h1{
        font-size: 4em;
        color: rgb(17, 199, 138);
    }
    #content{
        text-align: center;
    }
    #name{
        font-weight: bold;
    }
    #avatar{
        width: 50%;
    }

    #deconnection{
        margin-top:30vh;
    }
    .btn {
        padding: 10px 40px;
        border-radius: 10px;
        font-size: 25px;
        color: #ffffff;
        text-decoration: none;
        text-align: center;
        background-color: #476f96;
        border :none;
        border-bottom: 5px solid #3b5671;
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


