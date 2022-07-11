
<template>
  <div>
    <NavBar />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");

body {
  margin: 0;
}
/* #app {
 
  text-align: center;
  background-color: #2c3e50;
  height: 100%;
} */

.navbar,
.navlinks,
ul,
li,
li a {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

li,
a {
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 16px;
  color: #edf0f1;
  text-decoration: none;
}

.navbar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 10%;
  transition: all 0.3s ease 0s;
  z-index: 3;
  background-color: #2c3e50;
  position: fixed;
  height: 15vh;
}
.navlinks {
  list-style: none;
}

.navlinks li {
  display: inline-block;
  padding: 0px 20px;
  margin-right: 20px;
}

.navlinks li a {
  transition: all 0.3s ease 0s;
  font-size: 25px;
}

.navlinks li a:hover {
  color: #0088a9;
}
</style>
