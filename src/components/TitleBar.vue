<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ nav: string }>()
const activeIndex = ref(props.nav)

const handleSelect = (key: string) => {
  activeIndex.value = key
}

const isMobile = ref(false)

if (window.innerWidth < 494) {
  isMobile.value = true
}

window.addEventListener('resize', () => {
  isMobile.value = window.innerWidth < 494
})

</script>

<template>
  <div v-if="isMobile">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
    >
      <el-menu-item index="0">
        <RouterLink to="/"><h4>RainSTR Studio</h4></RouterLink>
      </el-menu-item>
      <el-sub-menu index="5">
        <template #title>菜单</template>
        <RouterLink to="/projects"><el-menu-item index="1">项目</el-menu-item></RouterLink>
        <RouterLink to="/members"><el-menu-item index="2">成员</el-menu-item></RouterLink>
        <RouterLink to="/about"><el-menu-item index="3">关于我们</el-menu-item></RouterLink>
        <RouterLink to="/contact"><el-menu-item index="4">联系我们</el-menu-item></RouterLink>
      </el-sub-menu>
    </el-menu>
  </div>
  <div v-else>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <RouterLink to="/"><h3>RainSTR Studio</h3></RouterLink>
      </el-menu-item>
      <RouterLink to="/projects"><el-menu-item index="1">项目</el-menu-item></RouterLink>
      <RouterLink to="/members"><el-menu-item index="2">成员</el-menu-item></RouterLink>
      <RouterLink to="/about"><el-menu-item index="3">关于我们</el-menu-item></RouterLink>
      <RouterLink to="/contact"><el-menu-item index="4">联系我们</el-menu-item></RouterLink>
    </el-menu>
  </div>
</template>