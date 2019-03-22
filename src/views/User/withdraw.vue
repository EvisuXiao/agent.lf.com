<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="提取余额"></x-header>
    <group>
      <cell title="可提现金额">{{ balance }}元</cell>
      <popup-picker title="到账账户" :data="cardList" v-model="card"></popup-picker>
      <x-input title="提取金额" text-align="right" placeholder="提款限额100-50000元" v-model="withdraw"></x-input>
      <cell title="提现记录" is-link link="/fund"></cell>
      <group title="每笔2元手续费，从提取金额中收取，提款限额100-50000元"></group>
      <x-button type="primary">提交</x-button>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Group,
    PopupPicker,
    XInput,
    XButton
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Group,
      PopupPicker,
      XInput,
      XButton
    },
    data () {
      return {
        cardList: [
          [
            '中国建设银行(0518)',
            '中国银行(0291)'
          ]
        ],
        balance: 5343.1,
        card: [],
        withdraw: 0
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
