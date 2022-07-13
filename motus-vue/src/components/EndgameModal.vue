<template>
  <div class="endGameModal">
    <div id="fermerModal">x</div>
    <h5>La partie est terminée</h5>
    <p v-if="win">Victoire, vous avez gagné</p>
    <p v-else>Défaite, vous avez perdu</p>
  </div>
</template>

<script>
export default {
  props: {
    win: Boolean,
  },
};
</script>

<style>
#fermerModal {
  position: absolute;
  top: 8px;
  left: 10px;
  cursor: pointer;
}

.endGameModal {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: white;
  border-radius: 5px;
  width: 250px;
  height: 150px;
  z-index: 999;
}
</style>