<template>
  <layout title="账单详情">
    <group>
      <cell title="货币类型">{{ info.money }}</cell>
      <cell title="交易类型">{{ info.type }}</cell>
      <cell title="渠道">{{ info.channel }}</cell>
    </group>
    <group title="操作人">
      <cell title="ID">{{ info.opId }}</cell>
      <cell title="名称">{{ info.opName }}</cell>
      <cell title="等级">{{ info.opLevel }}</cell>
      <cell title="余额">{{ info.opBal }}</cell>
    </group>
    <group title="被操作人">
      <cell title="ID">{{ info.obId }}</cell>
      <cell title="名称">{{ info.obName }}</cell>
      <cell title="等级">{{ info.obLevel }}</cell>
      <cell title="余额">{{ info.obBal }}</cell>
    </group>
    <group title="订单">
      <cell title="订单号">{{ info.selfOrder }}</cell>
      <cell title="钻石数量">{{ info.num }}</cell>
      <cell title="金额">{{ info.rmb }}</cell>
      <cell title="时间">{{ milli2Datetime(info.time) }}</cell>
      <cell title="充值平台订单号">{{ info.platOrder }}</cell>
      <cell title="备注">{{ info.note }}</cell>
    </group>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group
  } from 'vux'
  import { milli2Datetime } from '../../utils'

  export default {
    components: {
      Layout,
      Cell,
      Group
    },
    computed: {
      info: function () {
        return this.$store.getters.rowTmp
      }
    },
    methods: {
      milli2Datetime (ms, fmt = 'YYYY-MM-DD HH:mm:ss') {
        return milli2Datetime(ms, fmt)
      }
    }
  }
</script>

<style>

</style>
