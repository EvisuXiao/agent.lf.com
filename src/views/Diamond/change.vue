<template>
  <layout-table title="我的账单" :show-icon="true" :getData="fetchData" @search-hide="refresh">
    <tab slot="header" v-if="!mid">
      <tab-item v-for="(value, key) in tabLabel" :key="key" :selected="parseInt(key) === 0" @on-item-click="onItemClick(key)">{{ value }}</tab-item>
    </tab>
    <div>
      <div>
        <group :gutter="0">
          <x-table :cell-bordered="false">
            <thead>
            <tr>
              <th>时间</th>
              <th>类型</th>
              <th>数量</th>
              <th>目标ID</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in list" @click="showDetail(item)">
              <td>{{ milli2Datetime(item.time, 'YYYY-MM-DD') }}<br />{{ milli2Datetime(item.time, 'HH:mm:ss') }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.num }}</td>
              <td>{{ item.obId }}</td>
            </tr>
            </tbody>
          </x-table>
        </group>
      </div>
    </div>
    <group slot="search" :gutter="0">
      <datetime title="开始时间" format="YYYY-MM-DD HH:mm" v-model="startTime"></datetime>
      <datetime title="结束时间" format="YYYY-MM-DD HH:mm" v-model="endTime"></datetime>
    </group>
  </layout-table>
</template>

<script>
  import LayoutTable from '../Layout/table'
  import {
    Datetime,
    Group,
    Tab,
    TabItem,
    XTable
  } from 'vux'
  import { milli2Datetime, levelName, needRefreshList } from '../../utils'
  import { getDiamondChangeList } from '../../api'

  export default {
    components: {
      LayoutTable,
      Datetime,
      Group,
      Tab,
      TabItem,
      XTable
    },
    data () {
      return {
        curTab: 0,
        tabLabel: ['全部', '充值', '出售', '奖励', '茶楼'],
        mid: 0,
        startTime: '',
        endTime: ''
      }
    },
    computed: {
      list: function () {
        return this.$store.getters.listTmp
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        if (this.$route.query.mid) {
          this.mid = this.$route.query.mid;
          this.curTab = 2 // 有id传入为销售类
        }
      },
      fetchData (page, pageSize) {
        return new Promise(resolve => {
          getDiamondChangeList(this.mid, this.curTab, page, pageSize, this.startTime, this.endTime).then(response => {
            let newList = [];
            for (let i in response.info) {
              newList.push(this.formatList(response.info[i], response.userInfo))
            }
            this.total = response.count;
            resolve(newList)
          })
        })
      },
      refresh () {
        needRefreshList()
      },
      formatList (row, user) {
        if (row.type === 'trade') {
          let mid = this.mid ? this.mid : this.$store.getters.userInfo.mid;
          row.type = row.opId === mid ? '出售' : '购买'
        } else {
          const label = {
            pay: '充值',
            cost: '消耗',
            award: '奖励',
            deduct: '管理扣除'
          };
          row.type = label[row.type]
        }
        if (row.channel) {
          const channel = {
            aiBei: '爱贝支付',
            rebate: '返利充值',
            clubTable: '茶楼',
            table: '好友'
          };
          row.channel = channel[row.channel]
        }
        row.opName = user[row.opId];
        row.obName = user[row.obId];
        row.opLevel = levelName(row.opLevel);
        row.obLevel = levelName(row.obLevel);
        return row
      },
      onItemClick (index) {
        this.curTab = index;
        this.refresh()
      },
      milli2Datetime (ms, fmt = 'YYYY-MM-DD HH:mm:ss') {
        return milli2Datetime(ms, fmt)
      },
      levelName (level) {
        return levelName(level)
      },
      showDetail (row) {
        this.$store.commit('setRowTmp', row);
        this.$router.push({ path: '/diamond/changeDetail' })
      }
    }
  }
</script>

<style>

</style>
