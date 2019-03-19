<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="充值"></x-header>
    <group-title>请选择</group-title>
    <group>
      <checker>
        <div v-for="(value, key) in price">
        <checker-item v-model="key">{{ value }}钻<br />{{ key }}元</checker-item>
        </div>
      </checker>
      <!--<grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false">-->
        <!--<checker>-->
          <!--<checker-item v-model="key">{{ value }}钻<br />{{ key }}元</checker-item>-->
        <!--<grid-item v-for="(value, key) in price" :key="key">-->
          <!--<span slot="label" class="grid-center">-->
        <!--</grid-item>-->
        <!--</checker>-->
      <!--</grid>-->
    </group>
    <group>
      <cell title="账户余额"></cell>
      <cell>
        <span slot="title">共{{ balance }}元可直接抵用{{ priceSelected }}元</span>
        <span></span>
      </cell>
      <cell title="充值方式"></cell>
      <cell>
        <img slot="icon" src="" alt="">
        <span slot="title">支付宝(推荐)</span>
        <!--<checklist :title="$t('Basic Usage')" :label-position="labelPosition" required :options="commonList" v-model="checklist001" @on-change="change"></checklist>-->
      </cell>
    </group>
    <group>
      <cell title="商品金额"><span>￥{{ priceSelected }}</span></cell>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Checker,
    CheckerItem,
    Checklist,
    Group,
    GroupTitle,
    Grid,
    GridItem
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Checker,
      CheckerItem,
      Checklist,
      Group,
      GroupTitle,
      Grid,
      GridItem
    },
    data () {
      return {
        price: {
          25: 100,
          75: 300,
          125: 500,
          250: 1000,
          500: 2000,
          750: 3000
        },
        balance: 0,
        priceSelected: 0
      }
    },
    methods: {
      showDetail () {
        this.$router.push({path: '/team/detail'})
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
