<template>
  <div>
    <input type="text" v-model="room_code"></input>
    <button>Rejoindre la partie</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room_code: "",
      //   socket: io("localhost:3000"),
    };
  },
};
</script>

<style>
</style>