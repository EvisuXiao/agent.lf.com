<template>
  <layout title="详情">
    <div>
      <group title="用户">
        <cell title="用户名">{{ info.mName }}(ID:{{ info.mid }})</cell>
        <cell title="等级">{{ info.mLevel }}</cell>
      </group>
      <group title="返利">
        <cell title="提供方">{{ info.fromName }}(ID:{{ info.fromId }})</cell>
        <cell title="提供方等级">{{ info.fromLevel }}</cell>
        <cell title="类型">{{ info.type }}</cell>
        <cell title="金额">{{ info.rmb }}</cell>
        <cell title="时间">{{ info.time }}</cell>
        <cell title="返利比例">{{ info.rate }}</cell>
        <cell title="返利数量">{{ info.rebate }}</cell>
        <cell title="返利余额">{{ info.bal }}</cell>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group
  } from 'vux'

  export default {
    components: {
      Layout,
      Cell,
      Group
    },
    computed: {
      info: function () {
        return this.$store.getters.rowTmp
      }
    }
  }
</script>

<style>

</style>
