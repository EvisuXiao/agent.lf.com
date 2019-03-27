<template>
  <layout title="充值">
    <div>
      <group title="请选择">
        <popup-radio title="钻石" :options="price" v-model="priceSelected">
              <span slot-scope="props" slot="each-item">
                {{ props.label }}钻石({{ price[props.index].key }}元)
              </span>
        </popup-radio>
      </group>
      <group>
        <group title="充值方式">
          <radio v-model="waySelected" :options="chargeWays">
          </radio>
        </group>
      </group>
      <group>
        <cell title="商品金额"><span>￥{{ priceSelected }}</span></cell>
      </group>
      <confirm v-model="confirmShow">
        <span>您选择了账户余额进行支付，订单将直接从您的账户余额中扣除{{ priceSelected }}元，请知悉</span>
      </confirm>
    </div>
    <cell slot="bottom">
      <div slot="title">支付金额: {{ priceSelected }}</div>
      <x-button type="primary" text="立即购买" @click.native="submit"></x-button>
    </cell>
  </layout>
</template>


<script>
  import BalancePng from '../../assets/balance_pay.png'
  import AliPng from '../../assets/ali_pay.jpeg'
  import WxPng from '../../assets/wx_pay.jpeg'
  import Layout from '../Layout'
  import {
    XHeader,
    Cell,
    Checker,
    CheckerItem,
    Checklist,
    Confirm,
    Group,
    Grid,
    GridItem,
    Radio,
    XSwitch,
    ViewBox,
    XButton,
    Flexbox,
    FlexboxItem,
    PopupRadio
  } from 'vux'

  export default {
    components: {
      Layout,
      XHeader,
      Cell,
      Checker,
      CheckerItem,
      Checklist,
      Confirm,
      Group,
      Grid,
      GridItem,
      Radio,
      XSwitch,
      ViewBox,
      XButton,
      Flexbox,
      FlexboxItem,
      PopupRadio
    },
    data () {
      return {
        price: [
          {
            key: 25,
            value: 100
          },
          {
            key: 75,
            value: 300
          },
          {
            key: 125,
            value: 500
          },
          {
            key: 250,
            value: 1000
          },
          {
            key: 500,
            value: 2000
          },
          {
            key: 750,
            value: 3000
          }
        ],
        balance: 0,
        priceSelected: 25,
        chargeWays: [
          {
            icon: BalancePng,
            key: 1,
            value: '余额支付'
          },
          {
            icon: AliPng,
            key: 2,
            value: '支付宝'
          },
          {
            icon: WxPng,
            key: 3,
            value: '微信支付'
          }
        ],
        waySelected: 1,
        confirmShow: false
      }
    },
    computed: {
      switchText: function () {
        return '共' + this.balance + '元可直接抵用' + this.priceSelected + '元'
      }
    },
    methods: {
      submit () {
        if (this.useBalance) {
          this.confirmShow = true
        } else {

        }
      }
    }
  }
</script>

<style>

</style>
