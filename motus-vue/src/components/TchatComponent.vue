<template>
  <div id="tchat">
    <div id="tchatMessages">
      <div v-for="msg in this.$store.state.messages" v-bind:key="msg.id">
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
export default {
  data() {
    return {
      user: "",
      message: "",
      messages: [],
      socket: io("localhost:3000"),
    };
  },
  mounted() {
    this.socket.on("MESSAGE", () => {
      this.$store.dispatch("get_messages", {
        room_tchatId: this.$route.params.code,
      });
      // this.messages = [...this.messages, data];
      // // you can also do this.messages.push(data)
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