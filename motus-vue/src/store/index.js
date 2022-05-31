
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
      avatar:''
    },
    gameInfos:{
      nbrLettre:'',
      mode:''
    }
  },
  mutations:{
    setStatus: function(state,status){
      state.status = status;
    },
    logUser: function(state, user){
      console.log(user);
      instance.defaults.headers.common['authorization'] = user;
      localStorage.setItem('user',JSON.stringify(user));
      state.user = user;
    },
    userInfos: function(state, userInfos){
      state.userInfos.email = userInfos.email;
      state.userInfos.name = userInfos.name;
      state.userInfos.avatar = userInfos.avatar;
    },
    setGameInfos: function(state, gameInfos){
      state.gameInfos.nbrLettre = gameInfos.nbrLettre;
      state.gameInfos.mode = gameInfos.mode;
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
    }
  }
})

export default store;