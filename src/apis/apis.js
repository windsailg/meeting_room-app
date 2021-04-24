import { apiHelper } from '../utils/helpers'

export default {
  // users
  getUsers () {
    return apiHelper.get('/users')
  },
  getUser (payLoad) {
    const searchParams = new URLSearchParams(payLoad)
    return apiHelper.get(`/users?${searchParams.toString()}`)
  },
  createUser ({ username, password }) {
    return apiHelper.post('/users/', { username, password, isAdmin: false })
  },
  updateUser ({ id, username, password }) {
    return apiHelper.put(`/users/${id}`, { username, password })
  },
  deleteUser ({ id }) {
    return apiHelper.delete(`/users/${id}`)
  },
  // rooms
  getRooms () {
    return apiHelper.get('/rooms')
  },
  getRoom ({ id }) {
    const searchParams = new URLSearchParams({ id })
    return apiHelper.get(`/rooms?${searchParams.toString()}`)
  },
  createRoom ({ name }) {
    return apiHelper.post('/rooms', { name })
  },
  updateRoom ({ id, name }) {
    return apiHelper.put(`/rooms/${id}`, { name })
  },
  deleteRoom ({ id }) {
    return apiHelper.delete(`/rooms/${id}`)
  },
  // reserve list
  getRoomReserve ({ RoomId }) {
    const searchParams = new URLSearchParams({ RoomId })
    return apiHelper.get(`/reserveList?${searchParams.toString()}`)
  },
  getUserReserve ({ UserId }) {
    const searchParams = new URLSearchParams({ UserId })
    return apiHelper.get(`/reserveList?${searchParams.toString()}`)
  },
  createReserve (payLoad ) {
    return apiHelper.post('/reserveList', payLoad)
  },
  deleteReserve ({ id }) {
    return apiHelper.delete(`/reserveList/${id}`)
  }
}
