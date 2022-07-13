<template>
  <div id="tchat">
    <div id="tchatMessages">
      <div class="message" v-for="msg in messages" v-bind:key="msg.id">
        <div class="tchatUser">{{ msg.user }} :</div>
        <div class="tchatMessage">{{ msg.message }}</div>
      </div>
    </div>
    <div id="tchatInput">
      <input
        @focus="setTchatFocus(true)"
        @blur="setTchatFocus(false)"
        type="text"
        name=""
        id=""
        v-model="message"
      />
      <button id="sendMessage" v-on:click="sendMessage">Envoyer</button>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: "",
      message: "",
      socket: io("localhost:3000"),
    };
  },
  computed: mapState({
    messages: "messages",
  }),
  beforeCreate() {
    //On charge les messages du tchat avant que la vue ne soit créée
    this.$store.dispatch("get_messages", {
      room_tchatId: this.$route.params.code,
    });
  },
  beforeMount() {
    this.socket.on("MESSAGE", () => {
      this.$store
        .dispatch("get_messages", {
          room_tchatId: this.$route.params.code,
        })
        .then(function () {
          const objDiv = document.getElementById("tchatMessages");
          objDiv.scrollTop = objDiv.scrollHeight;
        });
    });
  },
  mounted: function () {
    const objDiv = document.getElementById("tchatMessages");
    objDiv.scrollTop = objDiv.scrollHeight;
    console.log(objDiv);
    window.addEventListener("keyup", (e) => {
      if (
        e.key == "Enter" &&
        this.$store.state.tchatFocus &&
        this.message != ""
      ) {
        this.sendMessage(e);
      }
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.$store.state.userInfos.name,
        message: this.message,
        room_tchatId: this.$route.params.code,
      });
      this.message = "";
    },
    setTchatFocus(tchatFocus) {
      this.$store.dispatch("setTchatFocus", {
        tchatFocus: tchatFocus,
      });
    },
  },
};
</script>

<style>
#tchat {
  width: 25%;
  position: relative;
  height: 555px;
  background-color: rgb(31, 31, 29);
  border-radius: 10px;
  color: white;
}

#tchatMessages {
  height: 470px;
  position: absolute;
  overflow: hidden;
  text-align: left;
  padding: 18px 18px 0px 18px;
}

#tchatInput {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 15px;
  width: 100%;
}

#tchatInput input {
  width: 90%;
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  height: 43px;
  padding: 5px;
  font-family: "Montserrat", sans-serif;
}
#tchatInput input:focus {
  outline: none;
}

.message {
  overflow: hidden;
  margin-bottom: 10px;
}

.tchatUser {
  font-weight: bold;
}

#sendMessage {
  cursor: pointer;
  position: absolute;
  right: 25px;
  bottom: 4px;
  /* height: 25px; */
  border-radius: 5px;
  /* width: 30px; */
  padding: 10px;
  border: none;
  background-color: #f24405;
  color: white;
}
</style>