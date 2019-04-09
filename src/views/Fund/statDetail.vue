<template>
  <layout title="详情">
    <div>
      <group>
        <cell title="返利人">{{ info.name }}(ID:{{ info.uid }})</cell>
        <cell title="充值">{{ info.rmb }}</cell>
        <cell title="返利">{{ info.rmb }}</cell>
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
