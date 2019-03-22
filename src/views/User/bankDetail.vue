<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="我的银行卡"></x-header>
    <group>
      <cell title="持卡人">{{ bank.user }}</cell>
      <cell title="卡号">{{ bank.card }}</cell>
      <cell title="所属银行">{{ bank.bank }}</cell>
      <cell title="地区">{{ bank.area }}</cell>
      <cell title="开户行所在地">{{ bank.branch }}</cell>
      <x-button type="warn">删除银行卡</x-button>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Group,
    XButton
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Group,
      XButton
    },
    data () {
      return {
        bank: {
          user: '张三',
          card: '621401009249',
          bank: '中国建设银行',
          area: '北京市东城区',
          branch: '东单支行'
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
