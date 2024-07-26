<script setup>
    import axios from 'axios'
    import { useRouter } from 'vue-router';

    const router = useRouter()

    const logout = async () =>{
        await axios.post('/logout')
        router.push({ name: 'login' })      
    }

    logout()
 </script>

<template>
    <div>Logging Out...</div>
</template>