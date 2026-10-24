<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMenu, ElMenuItem, ElAffix, ElSubMenu } from 'element-plus'

// 菜单配置
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
        url: '/about.html'
    },
    {
        name: '联系我们',
        index: '4',
        url: '/contact.html'
    }
]

const props = defineProps({
    nav: {
        type: String,
        default: '0'
    }
})

// MPA：没有全局路由，激活项直接由各页面传入的 nav 决定
const activeIndex = ref(props.nav)
const isMobile = ref(false)

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
    checkDevice()
    window.addEventListener('resize', checkDevice)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', checkDevice)
})
</script>

<template>
    <el-affix>
        <el-menu :default-active="activeIndex" class="nav-menu" mode="horizontal" :ellipsis="false"
            @select="handleSelect">
            <!-- 通用 Logo 链接 -->
            <el-menu-item index="0" class="logo-item">
                <a href="/index.html">
                    <h3>RainSTR Studio</h3>
                </a>
            </el-menu-item>

            <!-- 移动端和桌面端的不同展示 -->
            <template v-if="isMobile">
                <el-sub-menu index="5">
	            <template #title>
		        <p>菜单</p>
		    </template>
                    <a v-for="item in MENU_ITEMS" :key="item.index" :href="item.url">
                        <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
                    </a>
                </el-sub-menu>
            </template>
            <template v-else>
                <a v-for="item in MENU_ITEMS" :key="item.index" :href="item.url">
                    <el-menu-item :index="item.index">{{ item.name }}</el-menu-item>
                </a>
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
