<script setup lang="ts">
import { useAuth } from '../composables/useAuth'
const { logout } = useAuth();
</script>

<template>
  <ul class="flex">
    <li class="mr-6">
      <button class="text-blue-500 hover:text-blue-800" @click.prevent="logout">Logout</button>
    </li>
    <li class="mr-6">
      <router-link class="text-blue-500 hover:text-blue-800" :to="{ name: `home` }" replace>User</router-link>
    </li>
    <li class="mr-6">
      <router-link class="text-blue-500 hover:text-blue-800" :to="{ name: `link` }" replace>Link</router-link>
    </li>
    <li class="mr-6">
      <router-link class="text-blue-500 hover:text-blue-800" :to="{ name: `stock` }" replace>Stock Update</router-link>
    </li>
  </ul>
</template>
