import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import View from '../views/Students/View.vue'
import CreateView from '../views/Students/CreateView.vue'
import AboutView from '../views/AboutView.vue'
import TodoList from '@/components/TodoList.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/students',
      name: 'students',
      component: View,
    },
    {
      path: '/a-propos',
      name: 'a-propos',
      component: AboutView,
    },
    {
      path: '/students/create',
      name: 'studentCreate',
      component: CreateView,
    },
    {
      path: '/todos',
      name: 'TodoList',
      component: TodoList,
    },
    {
      path:'/produits',
      name:'produits',
      component: () => import('../views/Produits/View.vue')
    },
    {
      path:'/produits/create',
      name:'CreateProduct',
      component: () => import('../views/Produits/CreateView.vue')
    }
  ],
})

export default router
