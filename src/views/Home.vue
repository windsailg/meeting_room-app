<template>
  <div class="home">
    <Navbar />

    <div class="py-5 container text-left">

      <div class=" mt-5 mb-5">
          <span class="">查詢空閒會議室</span>
          <datetime
            class="mb-3"
            type="datetime"
            v-model="searchDate"
            name="from"
            zone="Asia/Taipei"
            value-zone="Asia/Taipei"
            :min-datetime="fromMin"
            :minute-step="60"
            format="MM月dd日 HH:mm"
          />
          <button class="btn btn-info mr-2" @click.prevent.stop="searchReserveDate">查詢</button>
          <button class="btn btn-warning mr-2" @click.prevent.stop="clearSearch">清除</button>
      </div>


      <div v-show="!searchedRooms.length" class="row m-0 mt-5 ">
        <h2 class="mt-5 mb-4">所有會議室</h2>
      </div>
      
      <div v-show="!searchedRooms.length" class="row">

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


      <div v-show="searchedRooms.length" class="row m-0 mt-5">
        <h2  class="mt-5 mb-4">空閒的會議室</h2>
      </div>

      <div v-show="searchedRooms.length" class="row">
        
        <div v-for="searchedRoom in searchedRooms" :key="searchedRoom.id" class="card m-2" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title">{{searchedRoom.name}}</h3>
                <router-link 
                  :to="{
                    name: 'room-detail',
                    params: {
                      id: searchedRoom.id
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
import moment from '.../../moment'
import { mapState } from 'vuex'
import { Datetime } from 'vue-datetime'

const now = moment(new Date()).format('YYYY-MM-DDTHH')

export default {
  computed: {
    ...mapState([
      'currentUser',
      'isAuthenticated',
    ]),
  },
  name: 'Home',
  components: {
    Navbar,
    datetime: Datetime,
  },
  data() {
    return {
      rooms: [],
      searchedRooms: [],
      searchDate: '',
      fromMin: '',
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
    },
    async searchReserveDate() {
      try {
        if (!this.searchDate) return alert('請輸入時間')
        const res = await apis.getReserveList()
        const compareTime = (from, to) => {
            const dateSearch = Date.parse(this.searchDate)
            const dateFrom = Date.parse(from)
            const dateTo = Date.parse(to)
            
            if (dateFrom <= dateSearch && dateTo > dateSearch) return true
            return false
        }

        const serachResult = res.data.reduce((acc, r) => compareTime(r.from, r.to) ? [...acc, r.room] : acc, [])

        if (!serachResult.length) {
          this.searchedRooms = this.rooms
          return
        }
        
        this.searchedRooms = this.rooms.reduce((acc, r) => {
          return serachResult.map(sr => sr.id).includes(r.id) ? acc : [...acc, r]
        }, [])
      } catch (error) {
        console.log(error)
      }
    },
    clearSearch() {
      this.searchDate = ''
      this.searchedRooms = []
    }
  },
  created() {
    this.fromMin = now
    this.fetchData()
  }
}
</script>
