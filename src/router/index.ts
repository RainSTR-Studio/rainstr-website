import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/Main.vue';
import AboutView from '@/views/About.vue';
import Project from '@/views/Project.vue';
import Member from '@/views/Member.vue';
import Contact from '@/views/Contact.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/members',
      name: 'member',
      component: Member,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/projects',
      name: 'project',
      component: Project,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
  ],
})

export default router
