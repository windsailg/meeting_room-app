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
    background-color: #ffffff79;
    
  }
  .frosted__glass{
    backdrop-filter: blur(10px);
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
    background-image: url('https://windsailg.github.io/meeting_room/images/0.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    filter: blur(0px);
    opacity:1;
    pointer-events: none;
    transform: scale(1.05);
    z-index: -1;
  }

</style>
