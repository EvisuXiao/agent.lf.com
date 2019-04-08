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
        <cell title="可用余额"><span>￥{{ balance }}</span></cell>
        <cell title="商品金额"><span>￥{{ priceSelected }}</span></cell>
      </group>
    </div>
    <group slot="bottom" :gutter="0">
      <cell>
        <div slot="title">支付金额: {{ priceSelected }}</div>
        <x-button type="primary" :disabled="!waySelected" text="立即购买" @click.native="submit"></x-button>
      </cell>
    </group>
  </layout>
</template>


<script>
  import BalancePng from '../../assets/balance_pay.png'
  import AiBeiPng from '../../assets/aibei_pay.jpg'
  import Layout from '../Layout'
  import {
    XHeader,
    Cell,
    Checker,
    CheckerItem,
    Checklist,
    Group,
    Grid,
    GridItem,
    Radio,
    XButton,
    Flexbox,
    FlexboxItem,
    PopupRadio
  } from 'vux'
  import { getPayCfg, chargeMoney } from '../../api'
  import { sortArrObj } from '../../utils'

  export default {
    components: {
      Layout,
      XHeader,
      Cell,
      Checker,
      CheckerItem,
      Checklist,
      Group,
      Grid,
      GridItem,
      Radio,
      XButton,
      Flexbox,
      FlexboxItem,
      PopupRadio
    },
    data () {
      return {
        price: [],
        priceMap: {},
        priceSelected: 0,
        chargeWays: [
          {
            icon: BalancePng,
            key: 'rebate',
            value: '余额支付'
          },
          {
            icon: AiBeiPng,
            key: 'aiBei',
            value: '爱贝支付'
          }
        ],
        waySelected: 'rebate'
      }
    },
    computed: {
      balance: function () {
        return this.$store.getters.userInfo.money
      }
    },
    created () {
      this.getPayCfg();
    },
    methods: {
      getPayCfg () {
        getPayCfg().then(data => {
          if (data) {
            this.price = [];
            this.priceMap = {};
            for (let i in data) {
              this.priceMap[data[i].rmb] = data[i].num;
              this.price.push({key: data[i].rmb, value: data[i].num})
            }
            sortArrObj(this.price, 'key');
            this.priceSelected = this.price[0].key
          }
        })
      },
      submit () {
        this.showConfirm('确定支付' + this.priceSelected + '元', () => {
          chargeMoney(this.priceMap[this.priceSelected], this.priceSelected, this.waySelected)
        })
      }
    }
  }
</script>

<style>

</style>
