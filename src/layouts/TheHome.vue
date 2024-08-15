<script setup>
import MainNav from './MainNav.vue';
//import { useAuth } from '../composables/useAuth'
import { useUserStore } from '../stores/AuthStore'

//const { user } = useAuth()
  const store = useUserStore()

</script>
<template>
  <MainNav></MainNav>
  <div>Home</div>
  <div>{{ store.user }}</div>
</template>
