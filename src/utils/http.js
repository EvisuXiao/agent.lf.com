import app from '../main'
import axios from 'axios'
import { clearSessionId } from './index'

const http = axios.create({
  // baseURL: 'host',
  method: 'POST',
  timeout: 5000
});

http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const errCode = response.data.er;
  switch (errCode) {
    case 0:
      return response.data;
    case -1:
      clearSessionId();
      app.$router.push({path: '/login'});
      break;
    case -2:
      app.errMsg('错误的请求,请刷新');
      break;
    case -3:
      app.errMsg('未知错误,请刷新');
      break;
    case -4:
      app.errMsg('输入错误,请检查');
      break;
    case -5:
      app.$router.push({ path: '/user/password' });
      break;
    case -6:
      app.errMsg('缺少手机信息,请联系客服');
      break;
    case -7:
      app.$router.push({ path: '/user/auth' });
      break;
    case -8:
      app.errMsg('权限错误');
      break;
    case -9:
      app.errMsg('通知游戏服务器失败,请联系客服');
      break;
    case -10:
      app.errMsg('短信验证服务未开启');
      break;
    default:
      app.errMsg('操作失败, 错误码: ' + errCode);
      break;
  }
  return Promise.reject(response.data.er)
}, (error) => {
  // 对响应错误做点什么
  // console.log(error.response.status)
  app.errMsg('系统异常');
  return Promise.reject(error)
});

export default http
