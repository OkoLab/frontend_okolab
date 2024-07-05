<script setup>
import axios from 'axios'
import { ref } from 'vue'
import MainNav from './MainNav.vue';

const user = ref()

const getUser = async () => {
  try {
    axios.get('/user').then((res) => {
      user.value = res.data
    })
  } catch (error) {
    console.log(error)
  }
}

getUser()

</script>
<template>
  <MainNav></MainNav>
  <div>Home</div>
  <div>{{ user }}</div>
</template>
