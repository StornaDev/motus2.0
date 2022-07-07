<template>
  <div id="tchat">
    <div id="tchatMessages">
      <div v-for="msg in messages" v-bind:key="msg.id">{{ msg.message }}</div>
    </div>
    <div id="tchatInput">
      <input type="text" name="" id="" v-model="message" />
      <button id="sendMessage" v-on:click="sendMessage"></button>
      <h3>{{ message }}</h3>
      <h2>{{ messages }}</h2>
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
    this.socket.on("MESSAGE", (data) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message,
      });
      this.message = "";
    },
  },
};
</script>

<style>
</style>