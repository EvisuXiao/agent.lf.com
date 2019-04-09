<template>
  <layout title="添加银行卡">
    <div>
      <group>
        <x-input title="持卡人" text-align="right" placeholder="请输入真实姓名" v-model="card.name"></x-input>
        <x-input title="卡号" text-align="right" placeholder="请输入银行卡号" v-model="card.cardNum"></x-input>
        <popup-picker title="所属银行" placeholder="请输入所属银行" :data="bankList" v-model="card.bankName"></popup-picker>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!card.name || !card.cardNum || !card.bankName.length" @click.native="submit">添加银行卡</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    PopupPicker,
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    XButton
  } from 'vux'
  import { optBankCard } from '../../api'

  export default {
    components: {
      Layout,
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
        card: {
          name: '',
          bankName: [],
          cardNum: ''
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
        ]
      }
    },
    methods: {
      submit () {
        this.showConfirm('是否添加银行卡', () => {
          optBankCard(this.card.name, this.card.bankName[0], this.card.cardNum).then(() => {
            this.$router.go(-1)
          })
        })
      }
    }
  }
</script>

<style>
  .button-circle {
    border-radius: 99px;
  }
</style>
