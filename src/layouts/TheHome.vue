<script setup>
import axios from 'axios'
import { ref } from 'vue'
import MainNav from './MainNav.vue';

const user = ref()

const getUser = async () => {
  try {
    await axios.get('/user').then((res) => {
      console.log('dsadsadsadsa')
      console.log(res.data)
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
