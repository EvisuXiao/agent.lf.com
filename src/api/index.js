import * as Config from './config'
import http from '../utils/http'
import { intVal, clearSessionId } from '../utils'
import store from '../store'
import app from '../main'

const PAGE_SIZE = 20;

export function promise (url, data = {}, field = '', loading = true) {
  if (loading) {
    // app.showLoading()
  }
  let config = { url: url };
  if (data) {
    config.data = data
  }
  return new Promise(resolve => {
    http(config).then(response => {
      if (loading) {
        // app.showLoading(false)
      }
      if (field) {
        resolve(response[field])
      } else {
        resolve(response)
      }
    }).catch(() => {
      if (loading) {
        app.showLoading(false)
      }
    })
  }).catch(() => {})
}

export function login (phone, passwd) {
  return promise(Config.Login, {
    phone: intVal(phone),
    passwd: passwd
  })
}

export function logout () {
  return promise(Config.Logout).then(() => {
    clearSessionId()
  })
}

export function getMemberInfo (mid = 0) {
  return promise(Config.MyInfo,
    mid ? { mid: intVal(mid) } : {},
    'info',
    mid !== 0
  )
}

export async function storeMyInfo () {
  if (!store.getters.userInfo.mid) {
    await getMemberInfo().then(data => {
      store.commit('setInfo', data);
    })
  }
}

export function sendCode (phone) {
  return promise(Config.SendCode, {
    phone: intVal(phone)
  })
}

export function verifyCode (code) {
  return promise(Config.VerifyCode, {
    code: code
  })
}

export function forgetPwd (phone, code, passwd) {
  return promise(Config.ForgetPwd, {
    phone: intVal(phone),
    code: code,
    passwd: passwd
  })
}

export function changePwd (oldPass, newPass) {
  return promise(Config.ChangePwd, {
    oldPass: oldPass,
    newPass: newPass
  })
}

export function changePhone (phone, code) {
  return promise(Config.ChangePhone, {
    phone: intVal(phone),
    code: code
  }).then(() => {
    let uInfo = Object.assign({}, store.getters.userInfo);
    uInfo.phone = phone;
    store.commit('setInfo', uInfo);
  })
}

export function getNotice () {
  return promise(Config.Notice, {}, 'info')
}

export function getMemberList (page = 1, limit = PAGE_SIZE, mid = 0, level = 0) {
  let params = {
    page: intVal(page),
    limit: intVal(limit),
    level: intVal(level)
  };
  if (mid) {
    params.mid = intVal(mid)
  }
  return promise(Config.MemberList, params)
}

export function getUserInfo (uid) {
  return promise(Config.UserInfo, {
    uid: intVal(uid)
  }, 'info')
}

export function chargeDiamond (uid, num, rmb = 0, note = '') {
  return promise(Config.ChargeDiamond, {
    uid: intVal(uid),
    num: intVal(num),
    rmb: intVal(rmb),
    note: note
  }, 'money')
}

export function getDiamondChangeList (mid = 0, type = 0, page = 1, limit = PAGE_SIZE, stime = 0, etime = 0) {
  return promise(Config.DiamondChange, {
    mid: intVal(mid),
    type: intVal(type),
    page: intVal(page),
    limit: intVal(limit),
    stime: intVal(stime),
    etime: intVal(etime)
  })
}

export function getPayCfg () {
  return promise(Config.PayCfg, {}, 'info')
}

export function chargeMoney (num, rmb, channel, type = 'money') {
  return promise(Config.ChargeMoney, {
    num: intVal(num),
    rmb: intVal(rmb),
    channel: channel,
    type: type
  }, 'info')
}

export function getBankCard () {
  return promise(Config.BankCard, {}, 'info')
}

export function optBankCard (name, bankName, cardNum, type = 1, index = 0) {
  return promise(Config.SetBankCard, {
    name: name,
    bankName: bankName,
    cardNum: cardNum,
    type: intVal(type),
    index: intVal(index)
  })
}

export function getApplyList (page = 1, limit = PAGE_SIZE) {
  return promise(Config.ApplyList, {
    page: intVal(page),
    limit: intVal(limit)
  })
}

export function applyMember (uid, phone, stat = 0) {
  let params = {
    uid: intVal(uid),
    stat: intVal(stat)
  };
  if (phone) {
    params.phone = intVal(phone)
  }
  return promise(Config.MyApply, params)
}
