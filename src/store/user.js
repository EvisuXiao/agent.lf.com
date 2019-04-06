const user = {
  state: {
    info: {
      mid: 0, // 代理ID
      level: 3, // 代理等级
      name: '王小二', // 微信昵称,名字,需要unescape
      headimgurl: '', // 头像url
      money: 110, // 钻石余额
      phone: '13800138000', // 手机号
      loginTime: 0, // 本次登录时间，时间单位都是毫秒
      lastLoginTime: 0, // 上次登录时间
      dlTime: 0, // 成为代理的时间
      sysMode: 1, // 系统模式：1普通模式，2返利模式
      // 普通模式下:
      todaySell: 30, // 当日售出的钻石
      // 代理返利模式下:
      rebate: 20, // 可提现金额
      todayRebate: 50, // 今日收益
      rebateAll: 370 // 累计收益
    }
  },

  mutations: {
    setInfo: (state, info) => {
      state.info = info;
    }
  }
};

export default user
