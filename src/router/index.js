import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Login from '../views/User/login'
import User from '../views/User'
import UserMobile from '../views/User/mobile'
import UserAuth from '../views/User/auth'
import UserPassword from '../views/User/password'
import UserForget from '../views/User/forget'
import UserBank from '../views/User/bank'
import UserBankAdd from '../views/User/bankAdd'
import UserBankDetail from '../views/User/bankDetail'
import UserWithdraw from '../views/User/withdraw'
import Team from '../views/Team'
import TeamDetail from '../views/Team/detail'
import TeamAdd from '../views/Team/add'
import TeamApply from '../views/Team/apply'
import TeamUpgrade from '../views/Team/upgrade'
import TeamRebate from '../views/Team/rebate'
import Diamond from '../views/Diamond'
import DiamondDetail from '../views/Diamond/detail'
import DiamondCharge from '../views/Diamond/charge'
import DiamondSell from '../views/Diamond/sell'
import Fund from '../views/Fund'
import FundIncome from '../views/Fund/income'
import FundDetail from '../views/Fund/detail'
import FundStatDetail from '../views/Fund/statDetail'
import Notice from '../views/Notice'
import Help from '../views/Help'

Vue.use(Router);

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/user/mobile',
      name: 'UserMobile',
      component: UserMobile
    },
    {
      path: '/user/auth',
      name: 'UserAuth',
      component: UserAuth
    },
    {
      path: '/user/password',
      name: 'UserPassword',
      component: UserPassword
    },
    {
      path: '/user/forget',
      name: 'UserForget',
      component: UserForget
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
      path: '/team/upgrade',
      name: 'TeamUpgrade',
      component: TeamUpgrade
    },
    {
      path: '/team/rebate',
      name: 'TeamRebate',
      component: TeamRebate
    },
    {
      path: '/team/apply',
      name: 'TeamApply',
      component: TeamApply
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
      path: '/diamond/sell',
      name: 'DiamondSell',
      component: DiamondSell
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
      path: '/fund/statDetail',
      name: 'FundStatDetail',
      component: FundStatDetail
    },
    {
      path: '/fund/income',
      name: 'FundIncome',
      component: FundIncome
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
