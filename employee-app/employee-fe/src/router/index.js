import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/login.vue';
import Dashboard from '../views/dashboard.vue';
import Employees from '../views/employees.vue';
import Register from '../views/register.vue'; 

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/employees', component: Employees, meta: { requiresAuth: true } }
];

const router = createRouter({ history: createWebHistory(), routes });

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) return next('/login');
  if ((to.path === '/login' || to.path === '/register') && token) return next('/dashboard');
  next();
});

export default router;
