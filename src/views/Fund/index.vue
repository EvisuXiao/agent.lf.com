<template>
  <layout-table title="资金记录" show-icon :getData="fetchData" @search-hide="refresh">
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
              <td>{{ item.name }}(ID: {{ item.mid }})<br />{{ milli2Datetime(item.time) }}</td>
              <td>{{ item.type }}<br />{{ item.rmb }}</td>
              <td>{{ item.rebate }}</td>
            </tr>
          </tbody>
        </x-table>
      </group>
    </div>
    <group slot="search" :gutter="0">
      <div>
        <popup-picker title="类型" show-name :disabled="mode !== ''" :data="typeList" v-model="type"></popup-picker>
        <datetime title="开始时间" format="YYYY-MM-DD HH:mm" v-model="startTime"></datetime>
        <datetime title="结束时间" format="YYYY-MM-DD HH:mm" v-model="endTime"></datetime>
      </div>
    </group>
  </layout-table>
</template>

<script>
  import LayoutTable from '../Layout/table'
  import {
    Datetime,
    Group,
    PopupPicker,
    Tab,
    TabItem,
    XInput,
    XTable
  } from 'vux'
  import { milli2Datetime, needRefreshList, levelName } from '../../utils'
  import { getRebateList } from '../../api'

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
        if (this.$route.query.mode) {
          this.mode = this.$route.query.mode;
          this.type = [this.mode]
        }
      },
      fetchData (page, pageSize) {
        return new Promise(resolve => {
          getRebateList(page, pageSize, 0, 0, this.type[0], this.startTime, this.endTime).then(response => {
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

</style>
