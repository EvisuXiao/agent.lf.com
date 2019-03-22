import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Team from '../views/Team'
import TeamDetail from '../views/Team/detail'
import TeamAdd from '../views/Team/add'
import DiamondCharge from '../views/Diamond/Charge'
import Notice from '../views/Notice'
import Help from '../views/Help'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/team',
      name: 'Team',
      component: Team
    },
    {
      path: '/team/detail',
      name: 'TeamDetail',
      component: TeamDetail
    },
    {
      path: '/team/add',
      name: 'TeamAdd',
      component: TeamAdd
    },
    {
      path: '/diamond/charge',
      name: 'DiamondCharge',
      component: DiamondCharge
    },
    {
      path: '/notice',
      name: 'Notice',
      component: Notice
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    }
  ]
})
