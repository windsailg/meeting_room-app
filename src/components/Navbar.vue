<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <router-link to="/" class="navbar-brand">Meeting rooms</router-link>

     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <span class="navbar-text mr-auto"></span>

        <ul class="navbar-nav">

          <li v-if="!isAuthenticated" class="nav-item">
            <router-link class="nav-link" to="signin">登入</router-link>
          </li>

          <li v-if="isAuthenticated" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Hi {{currentUser.username}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/reserve-list" class="dropdown-item text-dark" >我的預約</router-link>
              <div class="dropdown-item" @click.prevent.stop="logout">登出</div>
            </div>
          </li>

        </ul>

      </div>

</nav>


</template>

<script>

import { mapState } from 'vuex'



export default {
  computed: {
    ...mapState([
      'currentUser',
      'isAuthenticated',
    ]),
  },
  name: 'Navbar',
  methods:{
    logout() {
      this.$store.commit('revokeAuthentication')
      this.$router.push('/signin')
    }
  }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
