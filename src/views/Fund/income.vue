<template>
  <layout-table title="我的收益" :show-icon="!mType" :getData="fetchData" @search-do="refresh">
    <tab slot="header" v-if="!mType">
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
        <calendar title="开始时间" v-model="startTime"></calendar>
        <calendar title="结束时间" v-model="endTime"></calendar>
      </div>
      <div v-else>
        <popup-picker title="区间" show-name :data="timeTypeList" v-model="timeType"></popup-picker>
        <!--<calendar title="开始时间" :readonly="timeType[0] !== '自定义'" v-model="startTime"></calendar>-->
        <!--<calendar title="结束时间" :readonly="timeType[0] !== '自定义'" v-model="endTime"></calendar>-->
      </div>
    </group>
  </layout-table>
</template>

<script>
  import LayoutTable from '../Layout/table'
  import {
    Calendar,
    Group,
    PopupPicker,
    Tab,
    TabItem,
    XInput,
    XTable
  } from 'vux'
  import { milli2Datetime, needRefreshList, levelName, defalutPeriod, timePeriod } from '../../utils'
  import { getRebateList, getRebateStat } from '../../api'

  export default {
    components: {
      LayoutTable,
      Calendar,
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
        mid: 0,
        mType: 0,
        startTime: '',
        endTime: '',
        timeType: ['0'],
        timeTypeList: [
          [
            {
              name: '全部',
              value: '0'
            },
            {
              name: '今日',
              value: '1'
            },
            {
              name: '本周',
              value: '2'
            },
            {
              name: '本月',
              value: '3'
            }
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
        const time = timePeriod(val[0]);
        this.startTime = time[0];
        this.endTime = time[1]
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        if (this.$route.query.mid && this.$route.query.timeType && this.$route.query.mType) {
          this.mid = this.$route.query.mid;
          this.mType = this.$route.query.mType;
          this.timeType = [this.$route.query.timeType]
        } else {
          if (this.curTab === 0) {
            const time = defalutPeriod();
            this.startTime = time[0];
            this.endTime = time[1]
          }
        }
      },
      fetchData (page, pageSize) {
        if (this.curTab === 0) {
          return new Promise(resolve => {
            getRebateList(page, pageSize, this.mid, this.mType, 'pay', this.startTime, this.endTime).then(response => {
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
          if (index === 0) {
            const time = defalutPeriod();
            this.startTime = time[0];
            this.endTime = time[1]
          } else {
            this.timeType = ['0']
          }
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
          this.$router.push({ path: '/fund/rebate', query: { mid: row.uid, timeType: this.timeType[0] } })
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
