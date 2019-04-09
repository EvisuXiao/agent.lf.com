<template>
  <layout title="返利详情">
    <div>
      <group title="来源">
        <cell title="自身充值">{{ info.selfRebate }}</cell>
        <cell title="直属总代">{{ info.zdRebate }}</cell>
        <cell title="直属代理">{{ info.dlRebate }}</cell>
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
  import { getRebateMemberStat } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Group
    },
    data () {
      return {
        info: {}
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        if (this.$route.query.mid) {
          getRebateMemberStat(this.$route.query.mid).then((data) => {
            this.info = data
          })
        }
      }
    }
  }
</script>

<style>

</style>
