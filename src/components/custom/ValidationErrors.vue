<script setup>
  import { defineProps } from 'vue'
  const props = defineProps(['errors'])
  
</script>

<template>
  <div>
    <ul>
      <li class="text-red-500" v-for="[index, error] of Object.entries(props.errors)" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>