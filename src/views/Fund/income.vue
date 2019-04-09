<template>
  <layout-table title="我的收益" show-icon :getData="fetchData" @search-hide="refresh">
    <tab slot="header">
      <tab-item selected @on-item-click="onItemClick">收益记录</tab-item>
      <tab-item @on-item-click="onItemClick">收益统计</tab-item>
    </tab>
    <div>
      <group :gutter="0">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th>用户名/ID</th>
              <th>充值</th>
              <th>返利</th>
            </tr>
          </thead>
          <tbody v-if="curTab === 0">
            <tr v-for="item in list" @click="showDetail(item)">
              <td>{{ item.fromName }}(ID: {{ item.fromId }})<br />{{ milli2Datetime(item.time) }}</td>
              <td>{{ item.rmb }}</td>
              <td>{{ item.rebate }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="item in list" @click="showDetail(item)">
              <td>{{ item.name }}<br />{{ item.uid }}</td>
              <td>{{ item.rmb }}</td>
              <td>{{ item.rebate }}</td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </div>
    <group slot="search" :gutter="0">
      <div v-if="curTab === 0">
        <datetime title="开始时间" format="YYYY-MM-DD HH:mm" v-model="startTime"></datetime>
        <datetime title="结束时间" format="YYYY-MM-DD HH:mm" v-model="endTime"></datetime>
      </div>
      <div v-else>
        <popup-picker title="区间" :data="timeTypeList" v-model="timeType"></popup-picker>
        <!--<datetime title="开始时间" format="YYYY-MM-DD HH:mm" :readonly="timeType[0] !== '自定义'" v-model="startTime"></datetime>-->
        <!--<datetime title="结束时间" format="YYYY-MM-DD HH:mm" :readonly="timeType[0] !== '自定义'" v-model="endTime"></datetime>-->
      </div>
    </group>
  </layout-table>
</template>

<script>
  import LayoutTable from '../Layout/table'
  import {
    dateFormat,
    Datetime,
    Group,
    PopupPicker,
    Tab,
    TabItem,
    XInput,
    XTable
  } from 'vux'
  import { milli2Datetime, needRefreshList, levelName } from '../../utils'
  import { getRebateList, getRebateStat } from '../../api'

  export default {
    components: {
      LayoutTable,
      Datetime,
      Group,
      PopupPicker,
      Tab,
      TabItem,
      XInput,
      XTable
    },
    data () {
      return {
        curTab: 0,
        startTime: '',
        endTime: '',
        timeType: ['全部'],
        timeTypeList: [
          [
            '全部',
            '今日',
            '本周',
            '本月'
          ]
        ]
      }
    },
    computed: {
      list: function () {
        return this.$store.getters.listTmp
      }
    },
    watch: {
      timeType: function (val) {
        const date = new Date();
        switch (val[0]) {
          case '全部': {
            this.startTime = '';
            this.endTime = '';
            break;
          }
          case '今日': {
            this.startTime = dateFormat(date, 'YYYY-MM-DD 00:00:00');
            this.endTime = dateFormat(date, 'YYYY-MM-DD 00:00:00');
            break;
          }
          case '本周': {
            let num = date.getDay();
            if (num === 0) {
              num = 7
            }
            date.setDate(date.getDate() - num + 1);
            this.startTime = dateFormat(date, 'YYYY-MM-DD 00:00:00');
            date.setDate(date.getDate() + 6);
            this.endTime = dateFormat(date, 'YYYY-MM-DD 00:00:00');
            break;
          }
          case '本月': {
            date.setDate(1);
            this.startTime = dateFormat(date, 'YYYY-MM-DD 00:00:00');
            date.setMonth(date.getMonth() + 1);
            date.setDate(date.getDate() - 1);
            this.endTime = dateFormat(date, 'YYYY-MM-DD 00:00:00');
          }
        }
      }
    },
    methods: {
      fetchData (page, pageSize) {
        if (this.curTab === 0) {
          return new Promise(resolve => {
            getRebateList(page, pageSize, 0, 0, 'pay', this.startTime, this.endTime).then(response => {
              let newList = [];
              for (let i in response.info) {
                newList.push(this.formatList(response.info[i], response.userInfo))
              }
              this.total = response.count;
              resolve(newList)
            })
          })
        }
        return new Promise(resolve => {
          getRebateStat(page, pageSize, this.startTime, this.endTime).then(response => {
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
      showDetail (row) {
        this.$store.commit('setRowTmp', row);
        if (this.curTab === 0) {
          this.$router.push({ path: '/fund/detail' })
        } else {
          this.$router.push({ path: '/fund/statDetail' })
        }
      },
      formatList (row, user) {
        const label = {
          pay: '充值',
          use: '使用',
          withdraw: '提现'
        };
        row.type = label[row.type];
        row.mName = user[row.mid];
        row.mLevel = levelName(row.mLevel);
        row.fromName = user[row.fromId];
        row.fromLevel = levelName(row.fromLevel);
        row.time = milli2Datetime(row.time);
        return row
      }
    }
  }
</script>

<style>

</style>
