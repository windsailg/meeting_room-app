<template>
    
  <div class="about">
    <Navbar />

    <div class="container">

      <div class="row justify-content-center ">
        <div class="card col-lg-5 p-5 shadow mt-5 signin__board opacity__background">

          <div class="row logo flex justify-content-center mt-2">
            <h3 class="col-lg-12 text-center mb-3 font-weight-normal mt-2">
              Signin
            </h3>
          </div>

          <form class="w-100" @submit.prevent.stop="handleSubmit">

            <div class="form-label-group mb-2">
              <label for="name">Email</label>
              <input
                id="name"
                name="username"
                type="username"
                class="form-control"
                placeholder="username"
                autocomplete="username"
                required
                autofocus
                v-model="username"
              />
            </div>

            <div class="form-label-group mb-3">
              <label for="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                class="form-control"
                placeholder="Password"
                autocomplete="current-password"
                required
                v-model="password"
              />
            </div>

            <button
              type="submit"
              class="mt-3 btn btn-info btn-block"
              :disabled="isProcessing"
            >
              {{isProcessing ? '登入中...' : '登入'}}
            </button>

          </form>

        </div>
      </div>

    </div>
    
  </div>
</template>


<script>
import apis from '../apis/apis'
import Navbar from '@/components/Navbar.vue'
import { iziToast } from '../utils/helpers'

export default {
  name: 'Signin',
  components: {
    Navbar
  },
  data() {
    return {
      username: '',
      password: '',
      isProcessing: false,
      user: {
        id: -1,
        username: '',
      }
    }
  },
  methods: {
    async handleSubmit() {
      try{
        this.isProcessing = true
        if(!this.username || !this.password) {
          console.log('username or password error')
          this.isProcessing = false
          return 
        }
        const username = this.username
        const password = this.password
        const payLoad = {
          username: this.username,
          password: this.password
        }
        const res = await apis.getUser(payLoad)
        this.user = res.data[0]
        if (res.status !== 200 || !res.data[0] ) {
          throw new Error(res.statusText)
        }
        this.$store.commit('setCurrentUser', this.user)
        const userObj = { username, password }
        window.localStorage.setItem('userObj',JSON.stringify(userObj))
        this.$router.push('/').catch(err => {err})
        this.$toast.show(' ', '成功登入.', iziToast.options.success)
      } catch (error) {
        this.$toast.error(' ', '登入失敗，請確認輸入的使用者資訊是否正確', iziToast.options.error)
        this.isProcessing = false
        console.log(error)
      }
    }
  }
}
</script>
