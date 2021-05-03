<template>
  <div class="home">
    <Navbar />

    <div class="py-5 container text-left">

      <AdminNavbar />
      
      <h1 class="mt-5 mb-4">使用者管理</h1>
      <div class="row col-md-6 mt-4 mb-4">

        <div>

            <div class="form-group">
              <label for="username">Username</label>
              <input type="name" class="form-control" v-model="newUsername" name="username" aria-describedby="emailHelp" placeholder="輸入使用者名稱">
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" class="form-control" v-model="newPassword" name="password" placeholder="輸入使用者密碼">
            </div>

            <button
              class="btn btn-info mr-2"
              @click.prevent.stop="createUser"
            >
              新增使用者
            </button>

        </div>

      </div>

      <div class="row card-deck">
        <div
          v-for="user in users"
          :key="user.id"
          class="col-md-3 mb-4"
        >
          <div
            class="card opacity__background"
          >
            <div class="card-body">
            
              <form>

                <div class="form-group ">
                  <label for="username">Username</label>
                  <h3 v-if="!user.isEditing" class="card-title">{{ user.username }}</h3>
                  <input v-else type="name" class="form-control" v-model="user.username" name="username" aria-describedby="emailHelp" placeholder="輸入使用者名稱">
                </div>

                <div class="form-group">
                  <label for="password">Password</label>
                  <h3 v-if="!user.isEditing" class="card-title">{{ user.password }}</h3>
                  <input v-else type="password" class="form-control" v-model="user.password" name="password" placeholder="輸入使用者密碼">
                </div>

                <button
                    v-if="!user.isEditing"
                    @click.prevent.stop="toggleEdit(user.id)"
                    class="btn btn-info btn-sm mr-2"
                >
                  修改
                </button>

                <button
                  v-else
                  class="btn btn-success btn-sm mr-2"
                  @click.prevent.stop="updateUser({ id: user.id, username: user.username, password: user.password })"
                >
                  儲存
                </button>

                <button
                  v-if="user.isEditing"
                  @click.prevent.stop="toggleCancel(user.id)"
                  class="btn btn-info btn-sm mr-2"
                >
                  取消
                </button>

                <button @click.prevent.stop="deleteUser(user.id)" class="btn btn-warning btn-sm">
                  刪除
                </button>

              </form>

            </div>
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
  name: 'AdminUsers',
  components: {
    Navbar,
    AdminNavbar
  },
  data() {
    return {
      users: {},
      newUsername: '',
      newPassword: ''
    }
  },
  methods: {
    async fetchData() {
      try {
        if (!this.currentUser) {
          console.log('name or password error')
          return
        }
        const res = await apis.getUsers()
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.users = res.data
        this.users = res.data.map(u => ({
          ...u,
          isEditing: false,
          nameCatched: '',
          passwordCatched: '',
        }))
      } catch (error) {
        console.log(error)
      }
    },
    toggleEdit(id) {
      this.users = this.users.map(u =>
        u.id === id ? {
          ...u,
          isEditing: !u.isEditing,
          nameCatched: u.username,
          passwordCatched: u.password
        } : u)
    },
    toggleCancel(id) {
      this.users = this.users.map(u =>
        u.id === id ? {
          ...u,
          username: u.nameCatched,
          password: u.passwordCatched,
          isEditing: false
        } : u)
    },
    async updateUser({id, username, password}) {
      try {
        if (!username.trim()) {
          return alert('名稱不得為空')
        }
        const res = await apis.updateUser({ id, username, password })
        if (res.status !== 200) {
          throw new Error(res.statusText)
        }
        this.users = this.users.map(u =>
          u.id === id ? { ...u, isEditing: false } : u,
        )
      } catch (error) {
        console.log(error)
      }
    },
    async createUser() {
      try {
        if (!this.newUsername.trim() || !this.newPassword.trim()) {
          return alert('名稱或密碼不得為空')
        }
        const resUser = await apis.getUser({ username: this.newUsername })
        if (resUser.data.length) {
          return alert('使用者名稱已被使用，請更換其他名稱')
        }
        const res = await apis.createUser({ username: this.newUsername, password: this.newPassword })
        if (res.status !== 201) {
          throw new Error(res.statusText)
        }
        this.newUsername = ''
        this.newPassword = ''
        this.fetchData()
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser(id) {
       try {
        if (!id) {
          return alert('操作錯誤')
        }
        const resReserve = await apis.getUserReserve({ UserId: id })
        if (resReserve.status !== 200) {
          throw new Error(resReserve.statusText)
        }
        if (resReserve.data.length) {
          return alert('該使用已建立預定資訊，無法刪除')
        }
        const resDelete = await apis.deleteUser({ id })
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
    this.newUsername = ''
    this.newPassword = ''
    this.fetchData()
  },
}
</script>
