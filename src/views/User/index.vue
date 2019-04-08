<template>
  <layout title="个人信息">
    <group>
      <cell title="ID">{{ info.mid }}</cell>
      <cell title="姓名">{{ info.name }}</cell>
      <cell title="角色">{{ levelName(info.level) }}</cell>
      <cell v-if="rebateMode" title="最高返利" is-link link="/help">
        <span>{{ info.rebate }}%</span>
      </cell>
      <cell title="手机号码" is-link link="/user/mobile">{{ info.phone }}</cell>
      <cell title="我的邀请人">{{ info.recName }}</cell>
    </group>
    <group>
      <cell title="修改密码" is-link link="/user/password"></cell>
      <cell title="我的银行卡" is-link link="/user/bank"></cell>
    </group>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group
  } from 'vux'
  import { isRebateMode, levelName } from '../../utils'

  export default {
    components: {
      Layout,
      Cell,
      Group
    },
    computed: {
      info: function () {
        return this.$store.getters.userInfo
      },
      rebateMode: function () {
        return isRebateMode()
      }
    },
    methods: {
      levelName (level) {
        return levelName(level)
      }
    }
  }
</script>

<style>

</style>
