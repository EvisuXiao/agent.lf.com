<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="修改密码"></x-header>
    <group>
      <x-input type="password" title="旧密码" placeholder="请输入旧密码" v-model="oldPwd"></x-input>
      <x-input type="password" title="新密码" placeholder="请输入8-20位数字和字母组合" v-model="newPwd"></x-input>
      <x-input type="password" title="确认密码" placeholder="再次输入密码" v-model="cfmPwd"></x-input>
      <x-button type="primary">修改密码</x-button>
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
        oldPwd: '',
        newPwd: '',
        cfmPwd: ''
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
