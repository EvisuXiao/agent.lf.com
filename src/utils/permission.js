import router from '../router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import { getSessionId } from './index' // 验权
import { storeMyInfo } from '../api'

const whiteList = ['/login', '/user/forget', '/404']; // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getSessionId()) { // 判断是否有token
    if (to.path === '/404') {
      next()
    } else {
      storeMyInfo().then(); // 获取用户信息
      if (to.path === '/login') {
        next({path: '/'})
      } else {
        next()
      }
      // store.dispatch('generateRoutes').then(() => { // 根据roles权限生成可访问的路由表
      //   if (to.path === '/login') {
      //     next({path: '/'})
      //   } else if (store.getters.userInfo.role === 'admin' || store.getters.userMenu.indexOf(to.path) > -1) {
      //     next()
      //   } else {
      //     next({path: '/404'})
      //   }
      // }).catch(() => {
      //   next({path: '/login'})
      // })
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next({path: '/login'}); // 否则全部重定向到登录页
    }
  }
});

router.afterEach(() => {
  NProgress.done() // 结束Progress
});
