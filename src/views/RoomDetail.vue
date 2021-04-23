<template>
  <div class="home">
    <Navbar />

    <div class="py-5 container text-left">
      <h2 class="mt-5 mb-4">會議室 {{ room.name }}</h2>

      <form class="row" @submit.prevent.stop="handleSubmit">
        <div class="card p-3 pb-4 shadow col-6" >
          <div class="card-body">
            <h3 class="card-title"></h3>
            <h5 class="card-text mt-4">選擇時段:</h5>

            <span class="">From</span>
            <datetime
              class="mb-3"
              type="datetime"
              v-model="from"
              name="from"
              zone="Asia/Taipei"
              value-zone="Asia/Taipei"
              :min-datetime="fromMin"
              :minute-step="60"
              format="MM月dd日 HH:mm"
            />

            <span v-show="from">To</span>
            <datetime
              v-show="from"
              class="mb-3"
              type="datetime"
              v-model="to"
              zone="Asia/Taipei"
              value-zone="Asia/Taipei"
              :min-datetime="toMin"
              :minute-step="60"
              format="MM月dd日 HH:mm"
            />
            <button type="submit" class="btn btn-info mt-2" :disabled="!from">預約</button>
          </div>
        </div>
      </form>

    </div>

    <div class="mt-0 mb-5 container text-left">

        <h4 class="mt-5 mb-4">已被預約的時段</h4>
        
        <div class="row">

            <div v-for="reserve in reserveList" :key="reserve.id" class="card m-2 shadow-sm" style="width: 18rem;">
                <div class="card-body">
                    <span class="">From</span>
                    <input href="#" class="btn-gray btn-block mt-1 mb-3" :value="reserve.from | time" disabled>
                    <span class="">To</span>
                    <input href="#" class="btn-gray btn-block mt-1 mb-3" :value="reserve.to | time" disabled>
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
import { Datetime } from 'vue-datetime'

import moment from '.../../moment'
import { Settings } from 'luxon'
Settings.defaultLocale = 'zh-TW'

export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
  name: 'RoomDetail',
  components: {
    Navbar,
    datetime: Datetime,
  },
  data() {
    return {
      reserveList: {},
      room: {},
      from: '',
      to: '',
      fromMin: '',
      toMin: '',
    }
  },
  methods: {
    async fetchData(id) {
      try {
        const resRoom = await apis.getRoom({ id })
        const resReserve = await apis.getRoomReserve({ RoomId: id })
        if (resRoom.status !== 200) {
          throw new Error(resRoom.statusText)
        }
        this.reserveList = resReserve.data
        this.room = resRoom.data[0]
      } catch (error) {
        console.log(error)
      }
    },
    async handleSubmit() {
      try {
        if(!this.from || !this.to) {
          console.log("time doesn't exist")
          return
        }
        const payLoad = {
          UserId: this.currentUser.id,
          RoomId: this.room.id,
          from: this.from,
          to: this.to,
          room: {
            id: this.room.id,
            name:this.room.name,
          },
        }
        const res = await apis.createReserve(payLoad)
        this.reserveList.push(res.data)
        this.from = ''
        this.to = ''
      } catch (error) {
        console.log(error)
      }
    },
  },
  filters: {
    time(date) {
      if (!date) return
      return `${moment(date).format('MM月DD日 HH' + ':00')}`
    },
  },
  created() {
    const now = moment(new Date()).format('YYYY-MM-DDTHH')
    this.fromMin = now
    const { id } = this.$route.params
    this.fetchData(id)
  },
  watch: {
    from(newValue) {
      const toMin = new Date(newValue)
      this.toMin = moment(toMin.setHours(toMin.getHours() + 1)).format('YYYY-MM-DDTHH')
      this.to = ''
    },
  },
}
</script>
