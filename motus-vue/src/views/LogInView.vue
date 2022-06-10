<template>
  <div id="container">
    <!-- <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Inscription</h1> -->
    <form>

      <div class="input" v-if="mode == 'create'">
        <h2>Pseudo</h2>
        <div class="user-box">
          <input class="input_login" type="text" v-model="pseudo" name="" />
        </div>
      </div>

      <div class="input">
        <h2>Email</h2>
        <div class="user-box">
          <input class="input_login" type="email" v-model="email" name="" />
        </div>
      </div>

      <div class="input">
        <h2>Mot de passe</h2>
        <div class="user-box">
          <input class="input_login" type="password" v-model="mdp" name="" />
        </div>
      </div>

      <div class="input" v-if="mode == 'create'"> 
        <h2>Confirmation</h2>
        <div class="user-box">
          <input class="input_login" type="password" v-model="confirm" name="" />
        </div>

      </div>


      <div class="switch">
        <span  v-if="mode =='login'">Pas encore de compte ? <span class="link_switch" @click="switchToCreateAcc"> Créer un compte</span></span>      
        <span  v-else> Vous avez déjà un compte ? <span class="link_switch" @click="switchToLogin"> Connexion</span></span>
      </div>

      <br />
      <div v-if="mode == 'login' && status == 'error_login'">
        Adresse email et/ou mot de passe invalide
      </div>
      <div v-if="mode == 'create' && status == 'error_create'">
        Adresse email déjà utilisée
      </div>
      <div v-if="error == 'confirm'">
        La confirmation doit être identique au mot de passe
      </div>

      <div v-if="mode=='login'">
          <button class="btn" :class="{'subLoading' :status == 'loading' }" type="submit" @click="sendAction">
            <span v-if="status == 'loading'"> Connexion en cour ...</span>
            <span v-else>Se connecter</span>
          </button>
      </div>

      <div v-else> 
          <button class="btn" :class="{'subLoading' :status == 'loading' }" type="submit" @click="sendAction">
            <span v-if="status == 'loading'"> Création en cour ...</span>
            <span v-else>S'inscrire</span>
          </button>
      </div>

    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'

    export default{
       name: 'LoginView',
       data:function(){
           return{
               mode:'login',
               pseudo:'',
               email:'',
               mdp:'',
               confirm:'',
               avatar:'',
               error:''
           }
       },

       computed:{
         ...mapState(['status'])
       },
        mounted: function(){
            
            if (this.$store.state.user.id != -1) {
                this.$router.push('/profil')
                return;
            }
        
    
        },
    
       
       methods:{
           switchToCreateAcc: function(){
               this.mode = "create"
           },
           switchToLogin: function(){
               this.mode = "login"
           },
           sendAction: function(){
             const self = this;
             if (this.mode =='login'){
               if(!(this.pseudo =='' && this.mdp=='')){
                  self.login();
               }else{
                 console.log("Un champ n'a pas été rempli");
               }
             }else{
                if(!(this.pseudo =='' && this.mdp=='' && this.email=='') && this.mdp == this.confirm){
                  self.createAccount();
                }else{
                  if (!this.mdp == this.confirm) {
                    this.error='confirm';
                  }
                  console.log("Un champ n'a pas été rempli");

                }

             }
           },
           createAccount : function(){
              const self = this;
              this.$store.dispatch('createAccount',{
                name: this.pseudo,
                email: this.email,
                password: this.mdp,
              }).then(function (){
                self.login();
              }).catch(function (error){
                  console.log(error);
              });

           },
           login : function(){
              const self = this;
              this.$store.dispatch('login',{
                email: this.email,
                password: this.mdp
              }).then(function (){
                self.$router.push('/profil')
              }).catch(function (error){
                  console.log(error);
              });
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

label {
  margin-top: 100px;
}

#container {
  text-align: center;
  width: 100%;
  height: 100%;
  margin-top: 20vh;
  font-family: "Montserrat", sans-serif;
}

h1 {
  font-size: 4em;
  color: rgb(17, 199, 138);
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


.subLoading {
  width: 250px important; 
}
#response{
  text-align: center;
}

.input_login {
  height: 30px;
  width: 250px;
}

.link_switch{
  text-decoration:underline;
  color: rgb(115, 173, 192);
  cursor: pointer;
}
.switch{
  margin-top: 30px;
}



</style>