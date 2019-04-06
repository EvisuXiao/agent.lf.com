<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="详情"></x-header>
    <group>
      <cell title="名称">{{ order.name }}</cell>
      <cell title="数量">{{ order.amount }}</cell>
      <cell title="时间">{{ order.ctime }}</cell>
      <cell title="状态">{{ order.status }}</cell>
    </group>
    <group title="备注">
      <cell title="俱乐部">{{ order.club }}</cell>
      <cell title="游戏类型">{{ order.gameType }}</cell>
      <cell title="房间号">{{ order.room }}</cell>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Group
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Group
    },
    data () {
      return {
        order: {
          name: '代理人1244',
          amount: 25,
          ctime: '2018-10-10 10:10:00',
          status: '成功',
          club: '纯属娱乐',
          gameType: '棋牌',
          room: 9001
        }
      }
    }
  }
</script>

<style>

</style>
