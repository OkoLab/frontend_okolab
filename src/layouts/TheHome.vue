<script setup>
import { useAuth } from '../composables/useAuth'

const { user } = useAuth()
</script>
<template>
  <div>Home</div>
  <div>{{ user }}</div>
</template>
