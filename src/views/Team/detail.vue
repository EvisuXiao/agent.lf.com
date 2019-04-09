<template>
  <layout title="代理详情">
    <div>
      <group>
        <cell title="ID">{{ info.mid }}</cell>
        <cell title="用户名">{{ info.name }}</cell>
        <cell title="剩余钻石">{{ info.money }}</cell>
        <cell title="手机号码">{{ info.phone }}</cell>
        <cell title="加入时间">{{ info.dlTime }}</cell>
        <cell v-if="rebateMode" title="等级" is-link :link="{ path: '/team/upgrade', query: { mid: info.mid } }">{{ levelName(info.level) }}</cell>
        <cell v-else title="等级">{{ levelName(info.level) }}</cell>
      </group>
      <group v-if="rebateMode">
        <cell title="累计充值">{{ info.rmbAll }}</cell>
        <cell title="累计返利" is-link :link="{ path: '/fund/rebate', query: { mid: info.mid, timeType: '0' } }">{{ info.rebate }}</cell>
        <cell title="返利比例">{{ info.rate }}</cell>
      </group>
      <group v-else>
        <cell title="昨日茶楼场次">{{ info.gameCount }}</cell>
        <cell title="昨日茶楼消耗">{{ info.gameCost }}</cell>
      </group>
      <group title="他的代理">
        <cell v-if="info.zdCount" title="直属总代理">{{ info.zdCount }}</cell>
        <cell title="直属代理">{{ info.dlCount }}</cell>
      </group>
      <div v-if="!rebateMode">
        <group>
          <x-button class="button-circle" type="primary" @click.native="sellDetail">销售明细</x-button>
        </group>
        <group>
          <x-button class="button-circle" type="primary" @click.native="sellDiamond">出售钻石</x-button>
        </group>
      </div>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group,
    XButton
  } from 'vux'
  import { getMemberInfo } from '../../api'
  import { levelName, isRebateMode } from '../../utils'

  export default {
    components: {
      Layout,
      Cell,
      Group,
      XButton
    },
    data () {
      return {
        info: {}
      }
    },
    created () {
      this.fetchData()
    },
    computed: {
      rebateMode: function () {
        return isRebateMode()
      }
    },
    methods: {
      levelName (level) {
        return levelName(level)
      },
      fetchData () {
        if (this.$route.query.mid) {
          getMemberInfo(this.$route.query.mid).then(data => {
            this.info = data
          })
        }
      },
      sellDiamond () {
        this.$router.push({ path: '/diamond/sell' })
      },
      sellDetail () {
        this.$router.push({ path: '/diamond/change', query: { mid: this.info.mid } })
      }
    }
  }
</script>

<style>
  .button-circle {
    border-radius: 99px;
  }
</style>
