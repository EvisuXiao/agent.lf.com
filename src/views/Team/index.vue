<template>
  <layout-table title="我的代理" show-icon :getData="fetchData" @search-hide="refresh">
    <tab slot="header">
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
        <x-button v-if="rebateMode" type="primary" link="/team/upgrade">添加</x-button>
      </cell>
    </group>
    <group slot="search" :gutter="0">
      <x-input title="ID" text-align="right" v-model="searchMid"></x-input>
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
  import { milli2Datetime, levelTab, isRebateMode, needRefreshList, levelName } from '../../utils'
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
        curTab: 0,
        total: 0,
        searchMid: 0
      }
    },
    computed: {
      list: function () {
        return this.$store.getters.listTmp
      },
      tabLabel: function () {
        return levelTab()
      },
      rebateMode: function () {
        return isRebateMode()
      }
    },
    methods: {
      fetchData (page, pageSize) {
        return new Promise(resolve => {
          getMemberList(page, pageSize, this.searchMid, this.curTab).then(response => {
            this.total = response.count;
            resolve(response.info)
          })
        })
      },
      refresh () {
        needRefreshList()
      },
      onItemClick (index) {
        if (this.curTab !== index) {
          this.curTab = index;
          this.refresh()
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
