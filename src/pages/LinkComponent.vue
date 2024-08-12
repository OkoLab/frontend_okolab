<script setup lang="ts">
import axios from 'axios';
import MainNav from '../layouts/MainNav.vue'

axios.get("/link");
</script>

<template>
  <MainNav></MainNav>
  <p>
    ТЕСТОВАЯ СТРАНИЦА
  </p>
</template>
