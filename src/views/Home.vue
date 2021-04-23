<template>
  <div class="home">
    <Navbar />

    <div class="py-5 container text-left">

      <h2 class="mt-5 mb-4">所有會議室</h2>
      <div class="row">

        <div v-for="room in rooms" :key="room.id" class="card m-2" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title">{{room.name}}</h3>
                <router-link 
                  :to="{
                    name: 'room-detail',
                    params: {
                      id: room.id
                    }
                  }"
                  class="btn btn-info"
                >預約
                </router-link>
            </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>

import Navbar from '@/components/Navbar.vue'
import apis from '../apis/apis'
import { mapState } from 'vuex'

import { Settings } from 'luxon'
Settings.defaultLocale = 'zh-TW'
export default {
  computed: {
    ...mapState([
      'currentUser',
      'isAuthenticated',
    ]),
  },
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      rooms: {},
    }
  },
  methods: {
    async fetchData() {
      try{
        if(!this.currentUser) {
          console.log('name or password error')
          return
        }
        const res = await apis.getRooms()
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.rooms = res.data
      } catch (error) {
        console.log(error)
      }
    }
  },
  created() {
    this.fetchData()
  }
}
</script>
