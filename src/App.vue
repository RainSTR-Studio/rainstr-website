<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { RouterView } from 'vue-router'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>