<template>
  <div id="app">
    <router-view />
  </div>
</template>
.

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default {
  name: 'App',
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }
  #nav a.router-link-exact-active {
    color: #42b983;
  }
  .opacity__background{
    background-color: #ffffffcc;
    box-sizing: border-box;
  }
  .card-deck .card{
    flex: unset;
  }
  body{
    position: relative;
    overflow-x: hidden;
  }
  body::before{
    content: '';
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-image: url('/images/0.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    filter: blur(3px);
    opacity:.6;
    pointer-events: none;

    z-index: -1;
  }

</style>
