import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/event',
      name: 'event',
      component: () => import('../views/AllEvent.vue')
    },
  
    {
      path: '/event/new',
      name: 'eventform',
      component: () => import('../views/EventEdit.vue')
    },
    
    {
      path: '/event/detail/:id',
      name: 'eventdetail',
      component: () => import ('../views/EventDetail.vue')
    },
    {
      path: '/event/edit/:id',
      name: 'eventedit',
      component: () => import('../views/EventEdit.vue')
    },
    {
      path: '/become/volunteer',
      name: 'newvolunteer',
      component: () => import('../views/VolunteerPage.vue')
    },
    {
      path: '/volunteer/:id',
      name: 'editvolunteer',
      component: () => import('../views/VolunteerPage.vue')
    },
    {
      path: '/volunteers',
      name: 'volunteers',
      component: () => import('../views/AllVolunteer.vue')
    },
    {
      path: '/search/:keyword',
      name: 'search',
      component: () => import('../views/SearchPage.vue')
      // props: (route) => {{title: route.query.title}},
    },
    {
    path: '/notification',
    name: 'noti',
    component: () => import('../views/NotificationPage.vue')
    },
  ]
})

export default router
