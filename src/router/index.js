import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import User from '../views/User'
import UserMobile from '../views/User/mobile'
import UserPassword from '../views/User/password'
import UserBank from '../views/User/bank'
import UserBankAdd from '../views/User/bankAdd'
import UserBankDetail from '../views/User/bankDetail'
import UserWithdraw from '../views/User/withdraw'
import Team from '../views/Team'
import TeamDetail from '../views/Team/detail'
import TeamAdd from '../views/Team/add'
import Diamond from '../views/Diamond'
import DiamondDetail from '../views/Diamond/detail'
import DiamondCharge from '../views/Diamond/Charge'
import Fund from '../views/Fund'
import FundDetail from '../views/Fund/detail'
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
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/user/mobile',
      name: 'UserMobile',
      component: UserMobile
    },
    {
      path: '/user/password',
      name: 'UserPassword',
      component: UserPassword
    },
    {
      path: '/user/bank',
      name: 'UserBank',
      component: UserBank
    },
    {
      path: '/user/bankAdd',
      name: 'UserBankAdd',
      component: UserBankAdd
    },
    {
      path: '/user/bankDetail',
      name: 'UserBankDetail',
      component: UserBankDetail
    },
    {
      path: '/user/withdraw',
      name: 'UserWithdraw',
      component: UserWithdraw
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
      path: '/diamond',
      name: 'Diamond',
      component: Diamond
    },
    {
      path: '/diamond/detail',
      name: 'DiamondDetail',
      component: DiamondDetail
    },
    {
      path: '/diamond/charge',
      name: 'DiamondCharge',
      component: DiamondCharge
    },
    {
      path: '/fund',
      name: 'Fund',
      component: Fund
    },
    {
      path: '/fund/detail',
      name: 'FundDetail',
      component: FundDetail
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
