<script setup lang="js">
import { ref } from 'vue'
import menuItems from '../menuItems.json'

const props = defineProps(['nav'])
const activeIndex = ref(props.nav)

const handleSelect = (key) => {
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
  <el-affix>
    <div v-if="isMobile">
      <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        :ellipsis="false"
      >
        <el-menu-item index="0">
          <RouterLink to="/"><h4>RainSTR Studio</h4></RouterLink>
        </el-menu-item>
        <el-sub-menu index="5">
          <template #title>菜单</template>
          <!-- 从 HTML 中解耦 -->
          <RouterLink v-for="item in menuItems" :to="item.url">
            <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
          </RouterLink>
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
        <!-- 从 HTML 中解耦 -->
        <RouterLink v-for="item in menuItems" :to="item.url">
          <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
        </RouterLink>
      </el-menu>
    </div>
  </el-affix>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  .el-menu {
    background-color: #242424;
  }
}
</style>