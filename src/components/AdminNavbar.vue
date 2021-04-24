<template>
  <ul class="nav">
    <li class="nav-item">
      <router-link class="nav-link active" to="/admin/rooms">
        會議室管理
      </router-link>
    </li>
    <li class="nav-item">
      <router-link class="nav-link " to="/admin/users">使用者管理</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AdminNavbar',
}
</script>

