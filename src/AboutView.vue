<script setup lang="ts">
  import TitleBar from './components/TitleBar.vue'
  const openGithub = () => {
    window.open('github.com/RainSTR-Studio', '_blank')
  }
</script>

<template>
  <TitleBar nav="3" />
  <h1 class="cent">关于我们</h1>
  <el-tabs style="margin: 8px; padding: 8px;" tab-position="left" :model-value="'first'">
    <el-tab-pane label="关于 RainSTR Studio" name="first">
      <p>RainSTR Studio 成立于 2025 年 3 月 29 日，是一家软件开发工作室，致力于开发出快速，安全的软件产品。</p>
      <p>RainSTR Studio 专攻计算机底层开发，主要开发方向为操作系统，软件包管理器等。</p>
      <el-button @click="openGithub" type="primary" text>GitHub</el-button>
    </el-tab-pane>
    <el-tab-pane label="成员" name="second">
      <p>RainSTR Studio 的成员大多是初中生，他们的共同点是对计算机有很强的兴趣。</p>
      <p>你可以点击下方的链接来访问成员列表:D</p>
      <RouterLink to="/members"><el-button type="primary" text>成员列表</el-button></RouterLink>
    </el-tab-pane>
    <el-tab-pane label="联系我们" name="third">
      <p>如果您想吐槽bug，分享想法，亦或是想加入我们，请联系我们。</p>
      <p>您可以提交 Issues 或 Pull Request 来帮助我们改进项目:D</p>
    </el-tab-pane>
  </el-tabs>
</template>