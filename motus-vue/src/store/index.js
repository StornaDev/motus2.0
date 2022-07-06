
import { createStore } from 'vuex';

const axios = require('axios');

const instance = axios.create({
  baseURL: 'http://localhost:3000'
});

let user = localStorage.getItem('user');
let userInfos = localStorage.getItem("userInfos");




if (!user) {
  user = {
    id: -1,
    token: '',
  };
} else {
  try {
    user = JSON.parse(user);
    instance.defaults.headers.common['authorization'] = user;
  } catch (ex) {
    user = {
      id: -1,
      token: '',
    };

  }
}

if (!userInfos) {
  userInfos = {
    name: '',
    email: '',
    role: ''
  }
} else {
  userInfos = JSON.parse(userInfos)
}

const store = createStore({
  state: {
    status: '',
    user: user,
    userInfos: {
      name: '',
      email: '',
      role: ''
    },
    gameInfos: {
      nbrLettre: '',
      mode: '',
      win: false,
      gameEnd: false
    },
    words: [],
    word: ""
  },

  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {

      instance.defaults.headers.common['authorization'] = user;
      localStorage.setItem('user', JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos.email = userInfos.email;
      state.userInfos.name = userInfos.name;
      state.userInfos.role = userInfos.role;
      console.log("fsf")
      localStorage.setItem('userInfos', JSON.stringify(userInfos));
    },
    setGameInfos: function (state, gameInfos) {
      state.gameInfos.nbrLettre = gameInfos.nbrLettre;

      state.gameInfos.mode = gameInfos.mode;
    },
    dicoInfos: function (state, words) {
      state.words = [];
      for (let i = 0; i < words.length; i++) {
        state.words.push(words[i].word);
      }

    },
    removeWord: function (state, word) {

      for (let i = 0; i < state.words.length; i++) {
        if (state.words[i] == word) {
          // state.words.splice(i,i);
          console.log(state.words.splice(i, 1));
          console.log(state.words);
        }
      }
    },
    addWord: function (state, word) {

      state.words.push(word.word)
    },
    deconnection: function (state) {
      state.userInfos.email = "";
      state.userInfos.name = "";
      state.userInfos.role = "";

      state.user = {
        id: -1,
        token: '',
      };
      instance.defaults.headers.common['authorization'] = '';
      localStorage.removeItem("user");
      localStorage.removeItem("userInfos");
    },

    CHANGE_WIN: function (state) {
      state.gameInfos.win = true;
      state.gameInfos.gameEnd = true;
    },

    GAME_END: function (state) {
      state.gameInfos.gameEnd = true;
    },
    SET_WORD: function (state, word) {
      state.word = word
    },
    DELETE_GAME_INFOS: function (state) {
      state.gameInfos = {
        nbrLettre: '',
        mode: '',
        win: false,
        gameEnd: false
      }
    },
  },
  actions: {
    createAccount: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('api/user/register', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_create');
            reject(error);
          });

      });

    },

    login: ({ commit }, userInfos) => {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('api/user/login', userInfos)
          .then(function (response) {
            commit('setStatus', '');
            commit('logUser', response.data);
            console.log(response.data)
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_login');
            reject(error);
          });

      });
    },
    getUserInfos: ({ commit }) => {
      instance.get('api/infos')
        .then(function (response) {
          commit('userInfos', response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    },
    moveToGame: ({ commit }, gameInfos) => {
      commit('setGameInfos', gameInfos);
    },
    deconnectUser: ({ commit }) => {
      commit('deconnection');
    },
    getDicoInfos: ({ commit }, letter) => {

      instance.post('api/words', letter)
        .then(function (response) {
          console.log(response);
          commit('dicoInfos', response.data);
        })
        .catch(function (error) {
          console.log(error);
        })

    },

    deleteWord: ({ commit }, word) => {
      let strWord = word.word;
      commit('removeWord', strWord);
      instance.delete('api/words/delete', {
        data: {
          word
        }
      })
        .then(function (response) {
          console.log(response);

        })
        .catch(function (error) {
          console.log(error);
        });

    },


    addWord: ({ commit }, wordInfos) => {
      commit('setStatus', 'loading');
      commit('addWord', wordInfos);

      return new Promise((resolve, reject) => {
        instance.post('api/words/add', wordInfos)
          .then(function (response) {
            commit('setStatus', '');
            resolve(response);
          })
          .catch(function (error) {
            commit('setStatus', 'error_adding');
            reject(error);
          });

      });

    },
    getWord: ({ commit }, wordInfos) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.post("api/words/get_word", wordInfos)
          .then(function (response) {
            commit("SET_WORD", response.data)
            resolve(response)
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
    },
    create_room: ({ commit }, roomInfos) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.post("api/rooms/add", roomInfos)
          .then(function (response) {
            // commit("SET_WORD", response.data)
            resolve(response)
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
      // console.log(roomInfos);
    },
    updateUserRoom: ({ commit }, roomInfos) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.post("api/user/add_room", roomInfos)
          .then(function (response) {
            // commit("SET_WORD", response.data)
            resolve(response)
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
          })
      })
      // console.log(roomInfos);
    },
    deleteGameInfos: ({ commit }) => {
      commit('DELETE_GAME_INFOS')
    },

    changeWin: ({ commit }) => {
      commit("CHANGE_WIN");
    },

    gameEnd: ({ commit }) => {
      commit("GAME_END");
    }

  }
})

export default store;