import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default,
      redirect: '/findMusic/personlize',
      children: [
        {
          path: '/findMusic',
          name: 'find-music',
          component: require('@/components/FindMusic').default,
          children: [
            {
              path: '/findMusic/personlize',
              name: '个性推荐',
              component: require('@/components/Personlize').default
            },
            {
              path: '/findMusic/list',
              name: '歌单',
              component: require('@/components/List').default
            },
            {
              path: '/findMusic/singer',
              name: '歌手',
              component: require('@/components/Singer').default
            },
            {
              path: '*',
              redirect: '/findMusic/personlize'
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
        },
        {
          path: '/personlize/fm',
          name: 'FM',
          component: require('@/components/personlize/fm').default
        },
        {
          path: '/personlize/list',
          component: require('@/components/personlize/list').default
        },
        {
          path: '/personlize/rankList',
          component: require('@/components/personlize/rankList').default
        }
      ]
    },
    {
      path: '*',
      redirect: '/findMusic/personlize'
    }
  ]
})
