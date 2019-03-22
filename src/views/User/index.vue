<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="个人信息"></x-header>
    <group>
      <cell title="ID">{{ user.id }}</cell>
      <cell title="姓名">{{ user.name }}</cell>
      <cell title="角色">{{ user.role }}</cell>
      <cell title="最高返利" is-link link="/help">
        <span>{{ user.rebate }}%</span>
      </cell>
      <cell title="手机号码" is-link link="/user/mobile">{{ user.mobile }}</cell>
      <cell title="我的邀请人">{{ user.inviter }}</cell>
    </group>
    <group>
      <cell title="修改密码" is-link link="/user/password"></cell>
      <cell title="我的银行卡" is-link link="/user/bank"></cell>
    </group>
  </div>
</template>

<script>
  import {
    XHeader,
    Cell,
    Group
  } from 'vux'

  export default {
    components: {
      XHeader,
      Cell,
      Group
    },
    data () {
      return {
        user: {
          id: 12345,
          name: '代理人1244',
          role: '总代理',
          rebate: 50,
          mobile: '13800138000',
          inviter: '代理人2555'
        }
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
