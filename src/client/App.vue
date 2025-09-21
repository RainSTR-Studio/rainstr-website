<script setup lang="js">
  import { useDark, useToggle } from '@vueuse/core'

  const isDark = useDark()
  const toggleDark = useToggle(isDark)
</script>

<template>
  <main>
    <RouterView />
  </main>
</template>