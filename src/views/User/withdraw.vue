<template>
  <layout title="提取余额">
    <div>
      <group>
        <cell title="可提现金额">{{ balance }}元</cell>
        <popup-picker title="到账账户" :data="cardList" v-model="card"></popup-picker>
        <x-input title="提取金额" text-align="right" placeholder="提款限额100-50000元" v-model="withdraw"></x-input>
        <cell title="提现记录" is-link link="/fund"></cell>
        <group title="每笔2元手续费，从提取金额中收取，提款限额100-50000元"></group>
      </group>
      <group>
        <x-button style="border-radius:99px;" type="primary" @click.native="submit">提现</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group,
    PopupPicker,
    XInput,
    XButton
  } from 'vux'

  export default {
    components: {
      Layout,
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
    },
    methods: {
      submit () {
        return false
      }
    }
  }
</script>

<style>

</style>
