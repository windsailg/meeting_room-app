<template>
  <div class="home">
    <Navbar />

    <div class="py-5 container text-left">
      <h2 class="mt-5 mb-4">我的預約</h2>
      <div class="row card-deck">
        <div
          v-for="reserve in reserveList"
          :key="reserve.id"
          class="col-md-4 mb-4"
        >
          <div
            class="card opacity__background"
          >
            <div class="card-body">
              <h5 class="card-title">{{ reserve.room.name }}</h5>
              <p class="card-text">預約的時段.</p>
              <span class="">From</span>
              <input
                href="#"
                class="btn-gray btn-block mt-1 mb-3"
                :value="reserve.from | time"
                disabled
              />
              <span class="">To</span>
              <input
                href="#"
                class="btn-gray btn-block mt-1 mb-3"
                :value="reserve.to | time"
                disabled
              />
              
              <button
                class="btn btn-warning" 
                @click.prevent.stop="deleteReserve({ time: reserve.from, id: reserve.id})"
                :disabled="isProcessing"
              >
                {{ isProcessing ?  '處理中...' : '取消預約' }}
              </button>
            </div>

          </div>
        </div>
      </div>
      <div class="row">
        <h5 v-show="!reserveList.length" class="p-3 card-text">尚未預約任何時段.</h5>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import apis from '../apis/apis'
import { mapState } from 'vuex'
import { iziToast } from '../utils/helpers'
import moment from '.../../moment'

import { Settings } from 'luxon'
Settings.defaultLocale = 'zh-TW'
export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
  name: 'Home',
  components: {
    Navbar,
  },
  data() {
    return {
      reserveList: {},
      rooms: {},
      isProcessing: false
    }
  },
  methods: {
    async fetchData() {
      try {
        if (!this.currentUser) {
          console.log('name or password error')
          return
        }
        const res = await apis.getUserReserve({ UserId: this.currentUser.id })
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.reserveList = res.data
      } catch (error) {
        console.log(error)
      }
    },
    async deleteReserve(payLoad) {
      try {
        this.isProcessing = true
        const now = new Date()
        if ((Date.parse(payLoad.time)).valueOf() < (Date.parse(now)).valueOf()) {
          this.isProcessing = false
          return this.$toast.error(' ', '已開始的時段無法取消', iziToast.options.error)
        }
        const res = await apis.deleteReserve({ id: payLoad.id })
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.fetchData()
        this.$toast.show(' ', '成功取消預約', iziToast.options.success)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log(error)
      }
    }
  },
  filters: {
    time(date) {
      if (!date) return
      return `${moment(date).format('MM月DD日 HH' + ':00')}`
    }
  },
  created() {
    this.fetchData()
  },
}
</script>
