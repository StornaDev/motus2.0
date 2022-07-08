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
      <button id="sendMessage" v-on:click="sendMessage"></button>
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
      console.log("bonsoir");
      this.$store
        .dispatch("get_messages", {
          room_tchatId: this.$route.params.code,
        })
        .then(function () {
          const objDiv = document.getElementById("tchatMessages");
          const lastChild = objDiv.lastElementChild;
          console.log(lastChild);
          objDiv.scrollTop = objDiv.scrollHeight;
        });
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
  width: 30%;
  position: relative;
  height: 500px;
}

#tchatMessages {
  width: 100%;
  height: 400px;
  position: absolute;
  overflow: hidden;
  text-align: left;
}

#tchatInput {
  position: absolute;
  height: 100px;
  bottom: 0;
}

.message {
  overflow: hidden;
}

.tchatUser {
  font-weight: bold;
}
</style>