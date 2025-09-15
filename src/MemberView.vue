<script setup lang="ts">
import TitleBar from './components/TitleBar.vue'

const members = [
  {
    name: 'zhangxuan2011',
    nickname: 'zhangxuan',
    description: 'zhangxuan2011',
    url: 'https://space.bilibili.com/1076425555',
    avatar: 'https://avatars.githubusercontent.com/u/114813512?v=4',
  },
  {
    name: 'moyanj',
    nickname: 'MoYan',
    description: '前进，不择手段的前进。',
    url: 'https://blog.moyanjdc.top',
    avatar: 'https://avatars.githubusercontent.com/u/88998238?v=4',
  },
  {
    name: 'TMXQWQ',
    nickname: 'TMXQWQ',
    description: 'TMXQWQ',
    url: 'about:blank',
    avatar: 'https://avatars.githubusercontent.com/u/122204742?v=4',
  },
  {
    name: 'RainyHowCool',
    nickname: 'xiaokuai',
    description: 'xiaokuai',
    url: 'about:blank',
    avatar: 'https://avatars.githubusercontent.com/u/116129827?v=4',
  },
]

const openGithub = (user: string, repo: string) => {
  window.open(`https://github.com/${user}/${repo}`, '_blank')
}
</script>

<template>
  <TitleBar nav="2" />
  <!--#1890ff-->
  <h1 class="cent">了解我们的<span style="color: #1890ff">成员</span></h1>
  <el-scrollbar class="cent">
    <div class="scrollbar-flex-content cent">
      <el-card v-for="item in members" :key="item" class="scrollbar-demo-item cent" style="width: 260px; height: 220px;margin: 10px;padding:10px;">
        <el-space direction="vertical">
          <el-space direction="horizontal">
            <el-avatar shape="circle" :size="35" :src="item.avatar" />
              <p>{{ item.nickname }}<em style="font-size: 12px; color: #888;">({{item.name}})</em></p>
          </el-space>
          <p style="font-size: 14px; color: #888;">{{ item.description }}</p>
          <el-button
            @click="openGithub(item.name, '')"
            style="width: 100%"
          >
            查看Github
          </el-button>
        </el-space>

      </el-card>
    </div>
  </el-scrollbar>

  <br/>
  <br/>
  <div class="cent">
    <el-button class="cent" type="primary" text @click="openGithub('orgs/RainSTR-Studio', 'people')">所有成员</el-button>
  </div>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
  width: fit-content;
}
.scrollbar-demo-item {
  flex-shrink: 0;
  display: flex;
}
</style>