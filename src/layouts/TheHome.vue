<script setup>
import MainNav from './MainNav.vue';
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()

</script>
<template>
  <MainNav></MainNav>
  <div>Home</div>
  <div>{{ user }}</div>
</template>
