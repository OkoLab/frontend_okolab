<script setup>
import MainNav from './MainNav.vue';
//import { useAuth } from '../composables/useAuth'
import { useAuthStore } from '../stores/AuthStore'

//const { user } = useAuth()
  const store = useAuthStore()

</script>
<template>
  <MainNav></MainNav>
  <div>Home</div>
  <div>{{ store.user }}</div>
</template>
