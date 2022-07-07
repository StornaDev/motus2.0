<template>
  <div id="tchat">
    <div id="tchatMessages">
      <div v-for="msg in messages" v-bind:key="msg.id">
        <div>User: {{ msg.user }}</div>
        {{ msg.message }}
      </div>
    </div>
    <div id="tchatInput">
      <input type="text" name="" id="" v-model="message" />
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
  mounted() {
    this.socket.on("MESSAGE", () => {
      console.log("message");
      this.$store.dispatch("get_messages", {
        room_tchatId: this.$route.params.code,
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
  },
};
</script>

<style>
</style>