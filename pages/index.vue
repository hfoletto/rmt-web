<template>
  <h2>{{ store.user?.name }}</h2>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
const store = useUserStore()
</script>
