<script setup lang="ts">
import Title from '../components/Title.vue';
import MenuBar from '../components/MenuBar.vue';
import '../assets/universal-card.css';
import GitHubCard from '../components/GitHubCard.vue';
import { ref } from 'vue';

const member = [
    {
        "name": "zhangxuan2011",
        "nickname": "zhangxuan",
        "description": "zhangxuan2011",
        "url": "https://space.bilibili.com/1076425555",
        "avatar": "https://avatars.githubusercontent.com/u/114813512?v=4"
    },
    {
        "name": "moyanj",
        "nickname": "MoYan",
        "description": "前进，不择手段的前进。",
        "url": "https://blog.moyanjdc.top",
        "avatar": "https://avatars.githubusercontent.com/u/88998238?v=4"
    },
    {
        "name": "TMXQWQ",
        "nickname": "TMXQWQ",
        "description": "TMXQWQ",
        "url": "about:blank",
        "avatar": "https://avatars.githubusercontent.com/u/122204742?v=4"
    },
    {
        "name": "RainyHowCool",
        "nickname": "xiaokuai",
        "description": "xiaokuai",
        "url": "about:blank",
        "avatar": "https://avatars.githubusercontent.com/u/116129827?v=4"
    }
];

const openGithub = (user: string, repo: string) => {
    window.open(`https://github.com/${user}/${repo}`, '_blank')
}

const fullUrl = window.location.href;
const name = ref(window.location.pathname.split('/')[2]);
</script>

<template>
    <MenuBar nav="2" />
    <div class="container">
        <Title>{{ name }}</Title>
    </div>
</template>

<style scoped>
.highlight {
    color: #1890ff;
    background: linear-gradient(135deg, #1890ff, #36cfc9);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>