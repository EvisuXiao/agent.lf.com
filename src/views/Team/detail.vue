<template>
  <layout title="代理详情">
    <div>
      <group>
        <cell title="用户名">{{ info.name }}</cell>
        <cell title="ID">{{ info.mid }}</cell>
        <cell title="剩余钻石">{{ info.money }}</cell>
        <!--<cell title="累计消耗" is-link>{{ info.name }}</cell>-->
        <!--<cell title="累计返利" is-link>{{ info.name }}</cell>-->
        <cell title="角色" is-link>{{ levelName(info.level) }}</cell>
        <cell title="手机号码">{{ info.phone }}</cell>
        <cell title="加入时间">{{ info.dlTime }}</cell>
        <!--<cell title="状态">{{ info.name }}</cell>-->
      </group>
      <group v-if="info.zdCount || info.dlCount" title="他的代理">
        <cell v-if="info.zdCount" title="直属总代理" is-link>{{ info.zdCount }}</cell>
        <cell v-if="info.dlCount" title="直属代理" is-link>{{ info.dlCount }}</cell>
      </group>
      <group>
        <x-button type="primary" style="border-radius:99px;" @click.native="sellDetail">销售明细</x-button>
      </group>
      <group>
        <x-button type="primary" style="border-radius:99px;" @click.native="sellDiamond">出售钻石</x-button>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group} from 'vux'
  import { getMemberInfo } from '../../api'
  import { levelName } from '../../utils'

  export default {
    components: {
      Layout, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group
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
      levelName (level) {
        return levelName(level)
      },
      fetchData () {
        if (this.$route.query.mid) {
          getMemberInfo(this.$route.query.mid).then((data) => {
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

</style>
