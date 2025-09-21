<script setup lang="js">
  import MenuBar from './components/MenuBar.vue'
</script>

<template>
  <MenuBar nav="0" />
  <el-carousel height="200px" style="background-color: #555555; color: white;" class="cent">
    <el-carousel-item>
      <h3 class="small justify-center" text="2xl">RainSTR Studio 官网网站使用 Vue3 + Element Plus 重构</h3>
    </el-carousel-item>
    <el-carousel-item>
      <h3 class="small justify-center" text="2xl">RainSTR Studio 官网编写完成！使用 React + Ant Design!(过时)</h3>
    </el-carousel-item>
  </el-carousel>
  <br/>
  <br/>
  <main>
    <RouterView />
  </main>
  <div class="cent">
    <h2>RainSTR Studio - 致力于制作快速、安全、现代的软件</h2>
    <p>自 2025 年 3 月 29 日以来，我们一直为此而努力着。</p>
    <RouterLink to="/about"><el-button type="primary" text>关于我们</el-button></RouterLink>
  </div>
</template>