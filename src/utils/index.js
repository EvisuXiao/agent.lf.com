import { cookie, dateFormat } from 'vux'
import store from '../store'

const sessionKey = 'sessionID';

export function getSessionId () {
  return cookie.get(sessionKey, {})
}

export function clearSessionId () {
  return cookie.remove(sessionKey, {
    path: '/'
  })
}

export function needRefreshList () {
  store.commit('setListRefresh', true)
}

export function milli2Datetime (ms, fmt = 'YYYY-MM-DD HH:mm:ss') {
  return dateFormat(new Date(ms), fmt)
}

export function intVal (num) {
  if (!num) {
    return 0
  }
  if (typeof num === 'string') {
    return parseInt(num)
  }
  return num
}

export function sortArrObj (arr, key) {
  return arr.sort(function (a, b) {
    let x = a[key];
    let y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  })
}

export function isRebateMode () {
  return store.getters.userInfo.sysMode === 2
}

export function levelName (level) {
  const levels = {
    1: '代理',
    2: '总代理',
    3: '合伙人',
    4: '联合运营'
  };
  return levels[level]
}

export function levelTab () {
  const allLabel = {
    0: '全部',
    1: '代理',
    2: '总代理',
    3: '合伙人',
    4: '联合运营'
  };
  const level = store.getters.userInfo.level;
  if (level === 4) {
    return allLabel
  }
  let label = {};
  for (let key in allLabel) {
    if (key < level) {
      label[key] = allLabel[key]
    }
  }
  return label
}