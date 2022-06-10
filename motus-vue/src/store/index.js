
import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

let user = localStorage.getItem('user');
if (!user) {
  user = {
    id:-1,
    token: '',
  };
}else{
  try{
    user = JSON.parse(user);
    instance.defaults.headers.common['authorization'] = user;
  }catch(ex){
    user = {
      id:-1,
      token: '',
    };

  }
  

}

const store = createStore({
  state:{
    status:'',
    user: user,
    userInfos:{
      name: '',
      email: '',
      role:''
    },
    gameInfos:{
      nbrLettre:'',
      mode:''
    },
    words:[]
  },
  
  mutations:{
    setStatus: function(state,status){
      state.status = status;
    },
    logUser: function(state, user){
      
      instance.defaults.headers.common['authorization'] = user;
      localStorage.setItem('user',JSON.stringify(user));
      state.user = user;
    },
    userInfos: function(state, userInfos){
      state.userInfos.email = userInfos.email;
      state.userInfos.name = userInfos.name;
      state.userInfos.role = userInfos.role;
    },
    setGameInfos: function(state, gameInfos){
      state.gameInfos.nbrLettre = gameInfos.nbrLettre;
      state.gameInfos.mode = gameInfos.mode; 
    },
    dicoInfos: function(state, words){
      // state.words = [];
      for (let i = 0; i < words.length; i++) {
        state.words.push(words[i].word);
      }
      
    },
    deconnection:function(state){
      state.userInfos.email = "";
      state.userInfos.name = "";
      state.userInfos.role = "";

      state.user = {
        id:-1,
        token: '',
      };
      instance.defaults.headers.common['authorization'] = '';
    }
  },
  actions:{
    createAccount:({commit}, userInfos) =>{
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) =>{
        instance.post('api/user/register', userInfos)
        .then(function (response){
          commit('setStatus','');
          resolve(response);
        })
        .catch(function (error){
          commit('setStatus','error_create');
          reject(error );
        });

      });
      
    },

    login:({commit}, userInfos) =>{
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) =>{
        instance.post('api/user/login', userInfos)
        .then(function (response){
          commit('setStatus','');
          commit('logUser', response.data);
          resolve(response);
        })
        .catch(function (error){
          commit('setStatus','error_login');
          reject(error);
        });

      });
    },
    getUserInfos: ({commit})=>{
      instance.get('api/infos')
      .then(function (response){
        commit('userInfos', response.data);
      })
      .catch(function (error){
        console.log(error);
      });
      
    },
    moveToGame:({commit}, gameInfos)=>{
      commit('setGameInfos', gameInfos);
    },
    deconnectUser:({commit})=>{
      commit('deconnection');
    },
    getDicoInfos: ({commit}, letter)=>{
      
      instance.post('api/words',letter)
      .then(function (response){
        console.log(response);
        commit('dicoInfos', response.data);
      })
      .catch(function (error){
        console.log(error);
      })
      
    },
    addWord:({commit}, wordInfos) =>{
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) =>{
        instance.post('words/add', wordInfos)
        .then(function (response){
          commit('setStatus','');
          resolve(response);
        })
        .catch(function (error){
          commit('setStatus','error_adding');
          reject(error );
        });

      });
      
    },

  }
})

export default store;