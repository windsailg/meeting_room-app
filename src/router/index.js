import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/room-detail/:id',
    name: 'room-detail',
    component: () => import('../views/RoomDetail.vue')
  },
  {
    path: '/reserve-list',
    name: 'reserve-list',
    component: () => import('../views/ReserveList.vue')
  },
  {
    path: '/admin/rooms',
    name: 'admin-rooms',
    component: () => import('../views/AdminRooms.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: Signin
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  try {
    // 取得瀏覽器中的token
    const tokenInLocal = window.localStorage.getItem('userObj')
    let isAuthenticated = store.state.isAuthenticated
    if (tokenInLocal) {
      // 重新做驗證
      isAuthenticated = await store.dispatch('fetchCurrentUser')
    }
    // 未通過驗證 並且 目前不待在目標路由
    if (!isAuthenticated && to.name !== 'sign-in') {
      // 強制導向登入頁
      next('/signin')
      return
    }

    // 通過驗證 並且 欲前往目標路由
    if (isAuthenticated && to.name === 'sign-in') {
      // 強制導向首頁以外的頁面
      next('/')
      return
    }
    next()
  } catch (error) {
    console.log(error)
  }
})

export default router
