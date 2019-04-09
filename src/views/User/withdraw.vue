<template>
  <layout title="提取余额">
    <div>
      <group>
        <cell title="可提现金额">{{ rebate }}元</cell>
        <popup-picker title="到账账户" show-name :data="cardList" v-model="card"></popup-picker>
        <x-input title="提取金额" text-align="right" placeholder="提款限额100-50000元" v-model="withdraw"></x-input>
        <cell title="提现记录" is-link :link="{ path: '/fund', query: { mode: 'withdraw' } }"></cell>
        <group title="每笔2元手续费，从提取金额中收取，提款限额100-50000元"></group>
      </group>
      <group>
        <x-button class="button-circle" type="primary" :disabled="!card.length || !withdraw" @click.native="submit">提现</x-button>
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
    XButton,
    XInput
  } from 'vux'
  import { getBankCard, rebateWithdraw } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Group,
      PopupPicker,
      XButton,
      XInput
    },
    data () {
      return {
        cardList: [],
        card: [],
        withdraw: 0
      }
    },
    computed: {
      rebate: function () {
        return this.$store.getters.userInfo.rebate
      }
    },
    created () {
      this.getCard()
    },
    methods: {
      getCard () {
        getBankCard().then(data => {
          if (data.length) {
            let card = [];
            for (let i in data) {
              card.push({
                name: data[i].cardNum + '(' + data[i].bankName + ')',
                value: i
              })
            }
            this.cardList = [card]
          }
        })
      },
      submit () {
        if (this.withdraw < 100) {
          this.errMsg('提现金额不可低于100元');
          return false
        }
        if (this.withdraw > 50000) {
          this.errMsg('提现金额不可高于50000元');
          return false
        }
        if (this.withdraw > this.rebate) {
          this.errMsg('提现金额不可超过可提现金额');
          return false
        }
        this.showConfirm('提现' + this.withdraw + '元', () => {
          rebateWithdraw(this.withdraw, this.card[0]).then(() => {
            this.showToast('提现成功')
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
