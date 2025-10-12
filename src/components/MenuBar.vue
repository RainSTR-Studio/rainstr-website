<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMenu, ElMenuItem, ElAffix, ElSubMenu } from 'element-plus'

// 菜单配置移到单独的常量，方便维护
const MENU_ITEMS = [
    {
        name: '项目',
        index: '1',
        url: '/projects'
    },
    {
        name: '成员',
        index: '2',
        url: '/members'
    },
    {
        name: '关于我们',
        index: '3',
        url: '/about'
    },
    {
        name: '联系我们',
        index: '4',
        url: '/contact'
    }
]

const props = defineProps({
    nav: {
        type: String,
        default: '0'
    }
})

const route = useRoute()
const activeIndex = ref(props.nav)
const isMobile = ref(false)

// 自动根据当前路由设置激活菜单
const setActiveIndexFromRoute = () => {
    const matchedItem = MENU_ITEMS.find(item => item.url === route.path)
    if (matchedItem) {
        activeIndex.value = matchedItem.index
    }
}

// 处理菜单选择
const handleSelect = (key: string) => {
    activeIndex.value = key
}

// 检查设备类型
const checkDevice = () => {
    isMobile.value = window.innerWidth < 494
}

// 生命周期钩子
onMounted(() => {
    setActiveIndexFromRoute()
    checkDevice()
    window.addEventListener('resize', checkDevice)
})

// 监听路由变化
watch(
    () => route.path,
    () => setActiveIndexFromRoute()
)

// 组件卸载时移除事件监听
window.addEventListener('beforeunload', () => {
    window.removeEventListener('resize', checkDevice)
})
</script>

<template>
    <el-affix>
        <el-menu :default-active="activeIndex" class="nav-menu" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <!-- 通用 Logo 链接 -->
            <el-menu-item index="0" class="logo-item">
                <RouterLink to="/">
                    <h3>RainSTR Studio</h3>
                </RouterLink>
            </el-menu-item>

            <!-- 移动端和桌面端的不同展示 -->
            <template v-if="isMobile">
                <el-sub-menu index="5">
	            <template #title>
		        <p>菜单</p>
		    </template>
                    <RouterLink v-for="item in MENU_ITEMS" :key="item.index" :to="item.url">
                        <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
                    </RouterLink>
                </el-sub-menu>
            </template>
            <template v-else>
                <RouterLink v-for="item in MENU_ITEMS" :key="item.index" :to="item.url">
                    <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
                </RouterLink>
            </template>
        </el-menu>
    </el-affix>
</template>

<style scoped>
.nav-menu {
    background-color: var(--el-menu-bg-color, #fff);
}

.logo-item {
    font-weight: 600;
    --el-menu-item-hover-tint-percent: 0%;
}

@media (prefers-color-scheme: dark) {
    .nav-menu {
        background-color: #242424;
    }
}
</style>
