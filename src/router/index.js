import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../store/auth'

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
  { path: '/', name: 'dashboard', meta: { requiresAuth: true }, component: () => import('../views/DashboardView.vue') },
  { path: '/trainees', name: 'trainees', meta: { requiresAuth: true, roles: ['trainer','admin'] }, component: () => import('../views/TraineesList.vue') },
  { path: '/trainees/:id', name: 'trainee-detail', meta: { requiresAuth: true, roles: ['trainer','admin'] }, component: () => import('../views/TraineeDetail.vue') },
  { path: '/tasks', name: 'tasks', meta: { requiresAuth: true }, component: () => import('../views/TasksView.vue') },
  { path: '/calendar', name: 'calendar', meta: { requiresAuth: true }, component: () => import('../views/CalendarView.vue') },
  { path: '/documents', name: 'documents', meta: { requiresAuth: true }, component: () => import('../views/DocumentsView.vue') },
  { path: '/feedback', name: 'feedback', meta: { requiresAuth: true }, component: () => import('../views/FeedbackView.vue') },
  { path: '/profile', name: 'profile', meta: { requiresAuth: true }, component: () => import('../views/ProfileView.vue') },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const auth = useAuth()
  if (to.meta.requiresAuth && !auth.isAuthenticated) return next({ name: 'login' })
  if (to.meta.roles && !to.meta.roles.includes(auth.user?.role)) return next({ name: 'dashboard' })
  next()
})

export default router
