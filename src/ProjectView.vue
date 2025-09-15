<script setup lang="ts">
import TitleBar from './components/TitleBar.vue'

const popularProjects = [
  {
    name: 'mcospkg',
    from: 'RainSTR-Studio',
    description: 'A package manager for Minecraft OS',
  },  
  {
    name: 'proka-kernel',
    from: 'RainSTR-Studio',
    description: 'A kernel for ProkaOS',
  },
  {
    name: 'proka-bootloader',
    from: 'RainSTR-Studio',
    description: 'A boot loader for Proka Kernel',
  },
]

const openGithub = (user: string, repo: string) => {
  window.open(`https://github.com/${user}/${repo}`, '_blank')
}
</script>

<template>
  <TitleBar nav="1" />
  <!--#1890ff-->
  <h1 class="cent">了解我们的<span style="color: #e6a165">项目</span></h1>
  <el-carousel :interval="4000" type="card" height="350px" style="margin-left: 8px; padding-left: 8px; margin-right: 8px; padding-right: 8px;">
    <el-carousel-item v-for="item in popularProjects" :key="item.name" style="border-radius: 5px; margin-bottom: 8px; margin-top: 8px;">
      <div class="carousel-background" style="background-image: url('https://cdn.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg'); filter: blur(5px); position: absolute; width: 100%; height: 100%; z-index: -1;"></div>
      <div style="color: white; position: relative; margin-left: 40px;">
        <h2>{{ item.name }}</h2>
        <p @click="openGithub(item.from, item.name)"><em>From</em> <u><b>{{ item.from }}/{{ item.name }}</b></u></p>
        <p>{{ item.description }}</p>
        <el-button type="plain" @click="openGithub(item.from, item.name)">View on GitHub</el-button>
      </div>
    </el-carousel-item>
  </el-carousel>
  <br/>
  <br/>
  <div class="cent">
    <el-button class="cent" type="primary" text @click="openGithub('orgs/RainSTR-Studio', 'repositories')">所有仓库</el-button>
  </div>
</template>