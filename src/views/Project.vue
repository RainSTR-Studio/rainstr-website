<script setup lang="ts">
import MenuBar from '../components/MenuBar.vue'
import Title from '../components/Title.vue'
import '../assets/universal-card.css'
import GitHubCard from '../components/GitHubCard.vue'
import { ElButton } from 'element-plus'
const projects = [
    {
        "name": "mcospkg",
        "from": "RainSTR-Studio",
	"webdir": "mcospkg",
        "description": "A package manager for Minecraft OS"
    },
    {
        "name": "proka-kernel",
        "from": "RainSTR-Studio",
	"webdir": "proka-kernel",
        "description": "A kernel for ProkaOS"
    },
    {
        "name": "proka-bootloader",
        "from": "RainSTR-Studio",
	"webdir": "proka-bootloader",
        "description": "A boot loader for Proka Kernel"
    }
]

const openGithub = (user: string, repo: string) => {
    window.open(`https://github.com/${user}/${repo}`, '_blank')
}
</script>

<template>
    <MenuBar nav="1" />
    <div class="container">
        <!-- 标题部分 -->
        <Title>了解我们的<span class="highlight">项目</span></Title>

        <!-- 项目卡片网格 -->
        <div class="universal-grid">
            <GitHubCard
              v-for="item in projects"
              :key="`${item.from}/${item.name}`"
	      avatar="https://avatars.githubusercontent.com/u/205417930?s=48&v=4"
	      :title="item.from"
	      :subtitle="item.name"
	      :description="item.description"
	      :from="item.from"
	      :repo="item.name"
	      :webdir="item.webdir"
	      avatarShape="square"
	    />


        </div>

        <!-- 底部按钮 -->
        <div class="footer-section">
            <el-button type="primary" @click="openGithub('orgs/RainSTR-Studio', 'repositories')"
                class="all-universal-btn" size="large" text>
                查看所有项目
            </el-button>
        </div>
    </div>
</template>

<style scoped>
.highlight {
    color: #e6a165;
    background: linear-gradient(135deg, #e6a165, #e62165);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>
