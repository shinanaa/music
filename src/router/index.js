import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: () => import('@/components/recommend/recommend'),
      children: [
        {
          path: ':id',
          component: () => import('@/components/disc/disc')
        }
      ]
    }, {
      path: '/singer',
      name: 'Singer',
      component: () => import('@/components/singer/singer'),
      children: [
        {
          path: ':id',
          component: () => import('@/components/singer-detail/singer-detail')
        }
      ]
    }, {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/components/rank/rank'),
      children: [
        {
          path: ':id',
          component: () => import('@/components/topList/topList')
        }
      ]
    }, {
      path: '/search',
      name: 'Search',
      component: () => import('@/components/search/search'),
      children: [
        {
          path: ':id',
          component: () => import('@/components/singer-detail/singer-detail')
        }
      ]
    }, {
      path: '/user',
      name: 'User',
      component: () => import('@/components/user-center/user-center')
    }
  ]
})
