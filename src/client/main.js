import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import './style.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import menuItems from './menuItems.json'
import App from './App.vue'
import MainView from './MainView.vue'
import ProjectView from './ProjectView.vue'
import MemberView from './MemberView.vue'
import AboutView from './AboutView.vue'
import ContactView from './ContactView.vue'

import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: MainView },
  { path: '/projects', component: ProjectView },
  { path: '/members', component: MemberView },
  { path: '/about', component: AboutView },
  { path: '/contact', component: ContactView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')
