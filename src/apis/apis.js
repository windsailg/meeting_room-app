import { apiHelper } from '../utils/helpers'

export default {
  getUser ({ username, password }) {
    const searchParams = new URLSearchParams({ username, password })
    return apiHelper.get(`/users?${searchParams.toString()}`)
  },
  getRooms () {
    return apiHelper.get('/rooms')
  },
  getRoom ({ id }) {
    const searchParams = new URLSearchParams({ id })
    return apiHelper.get(`/rooms?${searchParams.toString()}`)
  },
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
  deleteReserve ({ id } ) {
    return apiHelper.delete(`/reserveList/${id}`)
  }
}
