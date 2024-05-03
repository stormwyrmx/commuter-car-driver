import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from "@/views/Layout.vue";
import TaskManage from "@/views/task/TaskManage.vue";
import RouteManage from "@/views/route/RouteManage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      component: Layout,
      redirect: '/task/manage',
      children: [
          {
            path: '/task/manage',
            component: TaskManage
          },
          {
            path: '/route/manage/:id',
            component: RouteManage
          }
      ]
    }
  ]
})

export default router
