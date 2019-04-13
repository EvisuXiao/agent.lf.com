<template>
  <layout-table ref="table" title="我的代理" :list.sync="list" :show-icon="!other" :getData="fetchData">
    <tab slot="header" v-if="!other">
      <tab-item v-for="(value, key) in tabLabel" :key="key" :selected="parseInt(key) === 0" @on-item-click="onItemClick(key)">{{ value }}</tab-item>
    </tab>
    <div>
      <group :gutter="0">
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>用户名/ID</th>
            <th>钻石剩余</th>
            <th>代理等级</th>
            <th v-if="rebateMode">累计返利</th>
            <th v-else>推荐时间</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in list" @click="showDetail(item.mid)">
            <td>{{ item.name }}<br/>ID: {{ item.mid }}</td>
            <td>{{ item.money }}</td>
            <td>{{ levelName(item.level) }}</td>
            <td v-if="rebateMode">{{ item.rebate }}</td>
            <td v-else>{{ milli2Datetime(item.recTime, 'YYYY-MM-DD') }}<br />{{ milli2Datetime(item.recTime, 'HH:mm:ss') }}</td>
          </tr>
          </tbody>
        </x-table>
      </group>
    </div>
    <group slot="bottom" :gutter="0">
      <cell>
        <div slot="title">总人数: {{ total }}</div>
        <x-button v-if="rebateMode && !other" type="primary" link="/team/upgrade">添加</x-button>
      </cell>
    </group>
    <group slot="search" :gutter="0">
      <x-input title="ID" placeholder="请输入代理ID" text-align="right" v-model="searchMid"></x-input>
    </group>
  </layout-table>
</template>

<script>
  import LayoutTable from '../Layout/table'
  import {
    Cell,
    Group,
    Tab,
    TabItem,
    XButton,
    XInput,
    XTable
  } from 'vux'
  import { milli2Datetime, levelTab, isRebateMode, levelName } from '../../utils'
  import { getMemberList } from '../../api'

  export default {
    components: {
      LayoutTable,
      Cell,
      Group,
      Tab,
      TabItem,
      XButton,
      XInput,
      XTable
    },
    data () {
      return {
        list: [],
        curTab: 0,
        total: 0,
        other: false,
        searchMid: ''
      }
    },
    computed: {
      tabLabel: function () {
        return levelTab()
      },
      rebateMode: function () {
        return isRebateMode()
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        if (this.$route.query.mid && this.$route.query.level) {
          this.searchMid = this.$route.query.mid;
          this.curTab = this.$route.query.level;
          this.other = true
        }
      },
      fetchData (page, pageSize, searched = false) {
        return new Promise(resolve => {
          getMemberList(page, pageSize, this.searchMid, this.curTab).then(response => {
            this.total = response.count;
            resolve(response.info)
          })
        })
      },
      onItemClick (index) {
        if (this.curTab !== index) {
          this.curTab = index;
          if (!this.other) {
            this.searchMid = ''
          }
          this.$refs.table.onPullingDown(false)
        }
      },
      milli2Datetime (ms, fmt = 'YYYY-MM-DD HH:mm:ss') {
        return milli2Datetime(ms, fmt)
      },
      levelName (level) {
        return levelName(level)
      },
      showDetail (mid) {
        this.$router.push({path: '/team/detail', query: {mid: mid}})
      }
    }
  }
</script>

<style>

</style>
