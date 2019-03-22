<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="我的银行卡"></x-header>
    <group>
      <cell title="持卡人">{{ user }}</cell>
      <x-input title="卡号" text-align="right" placeholder="请输入银行卡号" v-model="bank.card"></x-input>
      <popup-picker title="所属银行" placeholder="请输入所属银行" :data="bankList" v-model="bank.bank"></popup-picker>
      <x-address title="地区" placeholder="请选择地区" v-model="bank.area" :list="addressData"></x-address>
      <x-input title="开户行所在地" text-align="right" placeholder="请输入开户行所在地" v-model="bank.branch"></x-input>
      <x-button type="primary">添加银行卡</x-button>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    PopupPicker,
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      PopupPicker,
      Group,
      XInput,
      XAddress,
      ChinaAddressV4Data,
      XButton
    },
    data () {
      return {
        user: '张三',
        bank: {
          card: '',
          bank: [],
          area: [],
          branch: ''
        },
        bankList: [
          [
            '中国工商银行',
            '中国招商银行',
            '中国农业银行',
            '中国建设银行',
            '中国银行',
            '中国民生银行',
            '中国光大银行',
            '中信银行',
            '交通银行',
            '兴业银行',
            '上海浦东发展银行',
            '华夏银行',
            '广东发展银行'
          ]
        ],
        addressData: ChinaAddressV4Data
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
