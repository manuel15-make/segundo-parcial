import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'
import TiendaView from '../views/TiendaView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'productos',
        name: 'Productos',
        component: ProductView
      }
    ]
  },
  {
    path: '/tienda',
    name: 'Tienda',
    component: TiendaView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const usuario = localStorage.getItem('usuarioGym')
  if (to.meta.requiresAuth && !usuario) {
    next('/login')
  } else {
    next()
  }
})

export default router