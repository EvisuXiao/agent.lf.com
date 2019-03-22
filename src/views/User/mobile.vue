<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="手机号码"></x-header>
    <group>
      <cell title="当前手机号">{{ oldMobile }}</cell>
      <x-input title="新手机号" v-model="newMobile">
        <x-button slot="right" type="primary" plain mini>获取验证码</x-button>
      </x-input>
      <x-input title="验证码" v-model="code"></x-input>
      <x-button type="primary">更换手机号</x-button>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Group,
    XInput,
    XButton
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Group,
      XInput,
      XButton
    },
    data () {
      return {
        oldMobile: '13800138000',
        newMobile: '',
        code: ''
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
