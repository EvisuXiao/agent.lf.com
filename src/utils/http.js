import axios from 'axios'
import Vue from 'vue';
import { ToastPlugin } from 'vux'

Vue.use(ToastPlugin);

const http = axios.create({
  timeout: 5000
});

http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  switch (response.data.err) {
    case 0:
      return response.data;
    case -1:
      this.$router.push({path: '/'});
      break;
    case -2:
      this.$vux.toast.show({
        type: 'cancel',
        text: '错误的请求，请刷新'
      });
      break;
    case -3:
      this.$vux.toast.show({
        type: 'cancel',
        text: '未知错误，请刷新'
      });
      break;
    case -4:
      this.$vux.toast.show({
        type: 'cancel',
        text: '输入错误，请检查'
      });
      break;
    case -5:
      this.$router.push({path: '/user/password'});
      break;
    case -6:
      this.$vux.toast.show({
        type: 'cancel',
        text: '缺少手机信息，请联系客服'
      });
      break;
    case -7:
      // window.location.href = '/getVerifyCode.html?phone=' + rtn.phone;
      break;
    case -8:
      this.$vux.toast.show({
        type: 'cancel',
        text: '权限错误'
      });
      break;
    case -9:
      this.$vux.toast.show({
        type: 'cancel',
        text: '通知游戏服务器失败，请联系客服'
      });
      break;
    case -10:
      this.$vux.toast.show({
        type: 'cancel',
        text: '短信验证服务未开启'
      });
      break;
    default:
      this.$vux.toast.show({
        type: 'cancel',
        text: '操作失败'
      });
      break;
  }
}, (error) => {
  // 对响应错误做点什么
  // console.log(error.response.status)
  return Promise.reject(error)
});

export default http
