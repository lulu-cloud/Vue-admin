/*
 * @Description: Stay hungry，Stay foolish 路由鉴权文件
 * 某个路由什么条件下可以访问
 * @Author: Huccct
 * @Date: 2023-05-22 22:06:16
 * @LastEditors: Huccct
 * @LastEditTime: 2023-06-02 10:45:52
 */
import router from '@/router'
import setting from './setting'
//进度条插件,以及样式
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
//获取小仓库先获取大仓库
import pinia from './store'
import useUserStore from './store/modules/user'

nprogress.configure({ showSpinner: false })
let userStore = useUserStore(pinia)
//全局守卫:项目中任意路由切换都会触发
// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  /**
   * 用户未登录,只能访问login路由,其余不能访问
   * 登录成功:能访问其余的有路由,但是不能访问登录路由
   * 根据token是否存在,判定是否登录成功
   */
  document.title = to.meta.title + ` | ${setting.title}`
  //进度条开始
  nprogress.start()
  let token = userStore.token
  let username = userStore.username
  if (token) {
    //用户登录

    //登录成功不能访问login
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      //要有用户信息才能访问
      if (username) {
        next()
      } else {
        try {
          //等待发请求获取路由信息
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    //用户未登录
    //如果去login,可以放行
    if (to.path == '/login') {
      next()
    } else {
      //否则指向login,登录成功直接跳转
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})
// 全局后置守卫

router.afterEach((route) => {
  nprogress.done()
})
