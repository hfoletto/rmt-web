<template>
  <h2>{{ store.user?.name }}</h2>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/store/auth'
const store = useAuthStore()
</script>
