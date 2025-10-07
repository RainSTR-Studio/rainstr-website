<script setup lang="ts">
import '../assets/universal-card.css';
import { ElAvatar, ElButton, ElCard } from 'element-plus';

interface CardProps {
    avatar: string
    title: string
    subtitle: string
    description: string
    from: string
    repo: string
    avatarShape?: 'circle' | 'square'
}
const props = defineProps<CardProps>();

const openGithub = (user: string, repo: string) => {
    window.open(`https://github.com/${user}/${repo}`, '_blank')
}

const openHomepage = (user: string) => {
    window.open(`https://www.rainstr-studio.top/members/${user}`, '_blank')
}
</script>

<template>
    <el-card class="universal-card" :body-style="{ padding: '20px' }">
        <div class="card-content">
            <!-- 头像和基本信息 -->
            <div class="universal-header">
                <el-avatar :shape="avatarShape" :size="60" :src="avatar" class="universal-avatar" />
                <div class="universal-info">
                    <h3 class="universal-nickname">{{ subtitle }}</h3>
                    <p class="universal-name">{{ title }}</p>
                </div>
            </div>
            <p class="universal-description">{{ description }}</p>
            <el-button @click="openHomepage(from)" class="github-btn" type="primary" round>
                查看个人主页
            </el-button>
            <div>
                <!-- 预留空间 (去掉会发生奇怪的事情) -->
            </div>
            <el-button @click="openGithub(from, repo)" class="github-btn" type="default" style="margin-top: 5px" round>
                查看 GitHub
            </el-button>
        </div>
    </el-card>
</template>
