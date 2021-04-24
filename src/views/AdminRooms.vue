<template>
  <div class="home">
    <Navbar />

    <div class="py-5 container text-left">

        <AdminNavbar />
      <h1 class="mt-5 mb-4">會議室管理</h1>
      <div class="row col-md-6 mt-4 mb-4">

        <form @submit.prevent.stop="createRoom"  class="input-group mb-3">
            <input
                type="text"
                class="form-control"
                v-model="newRoom"
                placeholder="新增會議室名稱"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
            >
            <div class="input-group-append">
                <button class="btn btn-info" type="submit" >新增會議室</button>
            </div>
        </form>

      </div>
      <div class="row">
        <div
          v-for="room in rooms"
          :key="room.id"
          class="card m-3"
          style="width: 18rem;"
        >
          <div class="card-body">
            <h3 v-if="!room.isEditing" class="card-title">{{ room.name }}</h3>
            <input v-else class="mb-3" v-model="room.name" />

            <button
              v-if="room.isEditing"
              @click.prevent.stop="updateRoom({ id: room.id, name: room.name })"
              class="btn btn-success mr-2"
            >
              儲存
            </button>

            <button
              v-if="!room.isEditing"
              @click.prevent.stop="toggleEdit(room.id)"
              class="btn btn-info mr-2"
            >
              修改
            </button>

            <button
              v-else
              @click.prevent.stop="toggleCancel(room.id)"
              class="btn btn-info mr-2"
            >
              取消
            </button>

            <button @click.prevent.stop="deleteRoom(room.id)" class="btn btn-warning">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AdminNavbar from '@/components/AdminNavbar.vue'

import apis from '../apis/apis'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser', 'isAuthenticated']),
  },
  name: 'AdminRooms',
  components: {
    Navbar,
    AdminNavbar
  },
  data() {
    return {
      rooms: {},
      newRoom: ''
    }
  },
  methods: {
    async fetchData() {
      try {
        if (!this.currentUser) {
          console.log('name or password error')
          return
        }
        const res = await apis.getRooms()
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.rooms = res.data
        this.rooms = res.data.map((r) => ({
          ...r,
          isEditing: false,
          nameCatched: '',
        }))
      } catch (error) {
        console.log(error)
      }
    },
    toggleEdit(id) {
      this.rooms = this.rooms.map((r) =>
        r.id === id
          ? { ...r, isEditing: !r.isEditing, nameCatched: r.name }
          : r,
      )
    },
    toggleCancel(id) {
      this.rooms = this.rooms.map((r) =>
        r.id === id ? { ...r, name: r.nameCatched, isEditing: false } : r,
      )
    },
    async updateRoom({ id, name }) {
      try {
        if (!name.trim()) {
          return alert('名稱不得為空')
        }
        const res = await apis.updateRoom({ id, name })
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.rooms = this.rooms.map((r) =>
          r.id === id ? { ...r, isEditing: false } : r,
        )
      } catch (error) {
        console.log(error)
      }
    },
    async createRoom() {
      try {
        if (!this.newRoom.trim()) {
          return alert('名稱不得為空')
        }
        const res = await apis.createRoom({ name: this.newRoom })
        if (res.status !== 201) {
          throw new Error(res.statusText)
        }
        this.newRoom = ''
        this.fetchData()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteRoom(id) {
       try {
        if (!id) {
          return alert('操作錯誤')
        }
        const resReserve = await apis.getRoomReserve({ RoomId: id })
        if (resReserve.status !== 200) {
          throw new Error(resReserve.statusText)
        }
        if (resReserve.data.length) {
          return alert('該會議室已有預定，無法刪除')
        }
        const resDelete = await apis.deleteRoom({ id })
        if (resDelete.status !== 200) {
          throw new Error(resDelete.statusText)
        }
        this.fetchData()
      } catch (error) {
        console.log(error)
      }
    },
  },
  created() {
    this.fetchData()
  },
}
</script>
