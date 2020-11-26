<template>
  <div id="app">
    <contactos></contactos>
  </div>
</template>

<script>
import Contactos from './views/Contactos.vue';

export default {
  name: "App",
  components: {
    Contactos,
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
