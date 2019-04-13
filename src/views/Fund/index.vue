<template>
  <layout-table ref="table" title="资金记录" show-icon :list.sync="list" :searched.sync="searched" :getData="fetchData">
    <div>
      <group :gutter="0">
        <x-table :cell-bordered="false">
          <thead>
            <tr>
              <th>用户名/ID</th>
              <th>金额</th>
              <th>返利</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" @click="showDetail(item)">
              <td>{{ item.name }}(ID: {{ item.mid }})<br />{{ item.time }}</td>
              <td>{{ item.type }}<br />{{ item.rmb }}</td>
              <td><span :class="item.type === '充值' ? 'red-font' : 'green-font'">{{ item.rebate }}</span></td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </div>
    <group slot="search" :gutter="0">
      <div>
        <popup-picker title="类型" show-name :disabled="mode !== ''" :data="typeList" v-model="type"></popup-picker>
        <calendar title="开始时间" v-model="startTime"></calendar>
        <calendar title="结束时间" v-model="endTime"></calendar>
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
  import { milli2Datetime, levelName, defalutPeriod } from '../../utils'
  import { getRebateList } from '../../api'

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
        list: [],
        searched: false,
        mode: '',
        curTab: 0,
        typeList: [
          [
            {
              name: '全部',
              value: ''
            },
            {
              name: '充值',
              value: 'pay'
            },
            {
              name: '使用',
              value: 'use'
            },
            {
              name: '提现',
              value: 'withdraw'
            }
          ]
        ],
        type: [''],
        startTime: [],
        endTime: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        const time = defalutPeriod();
        this.startTime = time[0];
        this.endTime = time[1];
        if (this.$route.query.mode) {
          this.mode = this.$route.query.mode;
          this.type = [this.mode]
        }
      },
      fetchData (page, pageSize, searched = false) {
        return new Promise(resolve => {
          getRebateList(page, pageSize, 0, 0, this.type[0], searched ? this.startTime : '', searched ? this.endTime : '').then(response => {
            let newList = [];
            for (let i in response.info) {
              newList.push(this.formatList(response.info[i], response.userInfo))
            }
            resolve(newList)
          })
        })
      },
      milli2Datetime (ms, fmt = 'YYYY-MM-DD HH:mm:ss') {
        return milli2Datetime(ms, fmt)
      },
      levelName (level) {
        return levelName(level)
      },
      showDetail (row) {
        this.$store.commit('setRowTmp', row);
        this.$router.push({ path: '/fund/detail' })
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
  .red-font {
    color: red;
  }

  .green-font {
    color: green;
  }
</style>
