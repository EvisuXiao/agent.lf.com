<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="我的银行卡"></x-header>
    <group>
      <panel type="2" :list="panelList"></panel>
    </group>
    <group>
      <cell title="添加银行卡" is-link link="/user/bankAdd"></cell>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Panel,
    Cell,
    Group,
    XInput,
    XButton
  } from 'vux'

  export default {
    components: {
      XHeader,
      Panel,
      Cell,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        panelList: [
          {
            title: '中国建设银行',
            desc: '6216 0022 0000',
            url: '/user/bankDetail'
          },
          {
            title: '中国招商银行',
            desc: '6216 0022 0000',
            url: '/user/bankDetail'
          }
        ]
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
