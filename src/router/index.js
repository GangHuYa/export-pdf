import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/observe',
    component: () => import('../views/ObservePage.vue')
  },
  {
    path: '/newpage',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/tabpage',
    component: () => import('../views/TabPage.vue')
  },
  {
    path: '/chart',
    component: () => import('../components/pdf-components/EchartPage.vue')
  },
  {
    path: '/form',
    component: () => import('../views/FormPage.vue')
  },
  {
    path: '/line-page',
    name: 'LinePage',
    component: () => import('../views/LinePage.vue'),
    meta: {
      title: '折线图'
    }
  },
  {
    path: '/export-pdf',
    name: 'ExportPdf',
    component: () => import('../views/ExportPdf.vue'),
    meta: {
      title: 'exportPdf'
    }
  },
  {
    path: '/export-image',
    component: () => import('../views/ExportImage.vue')
  },
  {
    path: '/offset-top',
    name: 'OffsetTop',
    meta: {
      title: 'calculate offsetTop'
    },
    component: () => import('../views/OffsetTop.vue')
  },
  {
    path: '/sticky',
    name: 'sticky',
    meta: {
      title: 'calculate offsetTop'
    },
    component: () => import('../views/PageSticky.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
