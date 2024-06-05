<script setup lang="ts">
import { ref } from 'vue'
import MainNav from '../components/MainNav.vue'
import { useAuth } from '../composables/useAuth'

const { getUser } = useAuth()
const user = ref()
user.value = getUser
</script>

<template>
  <MainNav></MainNav>
  {{ user }}
  <p>РАССЧЕТ СТОИМОСТИ ДОСТАВКИ</p>
</template>
