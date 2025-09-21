<script setup lang="js">
  import '../universal-card.css'
  const props = defineProps(['avatar', 'title', 'subtitle', 'description', 'from', 'repo', 'avatarShape'])
  const openGithub = (user, repo) => {
    window.open(`https://github.com/${user}/${repo}`, '_blank')
  }
</script>

<template>
  <el-card class="universal-card" :body-style="{ padding: '20px' }">
    <div class="card-content">
      <!-- 头像和基本信息 -->
      <div class="universal-header">
        <el-avatar :shape="avatarShape" :size="60" :src="avatar" class="universal-avatar"/>
        <div class="universal-info">
          <h3 class="universal-nickname">{{ subtitle }}</h3>
          <p class="universal-name">{{ title }}</p>
        </div>
      </div>
      <p class="universal-description">{{ description }}</p>
      <el-button @click="openGithub(from, repo)"class="github-btn"type="primary" round>
        查看 GitHub
      </el-button>
    </div>
  </el-card>
</template>