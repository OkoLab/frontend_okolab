<template>
  <div>
    <ul v-for="(validationErrors, index) in props.errors" :key="index">
      <li class="text-red-500" v-for="(error, index) in validationErrors" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup>

const props = define({
  errors: {
    type: Object,
    required: false,
    default: null
  }
})
</script>
