<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="详情"></x-header>
    <group title="订单">
      <cell title="订单编号">{{ order.id }}</cell>
      <cell title="名称">{{ order.name }}</cell>
      <cell title="类型">{{ order.type }}</cell>
      <cell title="金额">{{ order.amount }}</cell>
      <cell title="时间">{{ order.ctime }}</cell>
      <cell title="状态">{{ order.status }}</cell>
    </group>
    <group title="备注">
      <cell title="当前余额">{{ order.balance }}</cell>
      <cell title="备注信息">{{ order.remark }}</cell>
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
          id: 'order1245',
          name: '代理人1244',
          type: '充值返利',
          amount: 25,
          ctime: '2018-10-10 10:10:00',
          status: '成功',
          balance: 3435.1,
          remark: '备注备注'
        }
      }
    }
  }
</script>

<style>
  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
