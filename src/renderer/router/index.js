import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      children: [
        {
          path: '/',
          name: 'find-music',
          component: require('@/components/FindMusic').default,
          children: [
            {
              path: '/personlize',
              name: '个性推荐',
              component: require('@/components/Personlize').default
            },
            {
              path: '/list',
              name: '歌单',
              component: require('@/components/List').default
            },
            {
              path: '/singer',
              name: '歌手',
              component: require('@/components/Singer').default
            },
            {
              path: '*',
              redirect: '/personlize'
            }
          ]
        },
        {
          path: '/search',
          name: 'search',
          component: require('@/components/Search').default
        },
        {
          path: '/MV',
          name: 'MV',
          component: require('@/components/MV').default
        },
        {
          path: '/mine',
          name: 'mine',
          component: require('@/components/Mine').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
