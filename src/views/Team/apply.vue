<template>
  <layout-table title="代理申请" :getData="fetchData">
    <tab slot="header">
      <tab-item v-for="(value, key) in tabLabel" :key="key" :selected="key === 0" @on-item-click="onItemClick(key)">{{ value }}</tab-item>
    </tab>
    <div>
      <group :gutter="0">
        <x-table :cell-bordered="false">
          <thead>
          <tr>
            <th>ID</th>
            <th>用户名</th>
            <th>手机号</th>
            <th>状态</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in list" @click="cancel(item.uid, item.phone)">
            <td>{{ item.uid }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ statusMap(item.stat) }}</td>
          </tr>
          </tbody>
        </x-table>
      </group>
    </div>
    <group slot="bottom" :gutter="0">
      <cell>
        <div slot="title">总人数: {{ total }}</div>
        <x-button type="primary" link="/team/add">申请</x-button>
      </cell>
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
    XTable
  } from 'vux'
  import { getApplyList, applyMember } from '../../api'
  import { needRefreshList } from '../../utils'

  export default {
    components: {
      LayoutTable,
      Cell,
      Group,
      Tab,
      TabItem,
      XButton,
      XTable
    },
    data () {
      return {
        curTab: 0,
        total: 0,
        tabLabel: ['全部', '申请中', '已通过', '被拒绝', '已取消']
      }
    },
    computed: {
      list: function () {
        return this.$store.getters.listTmp
      }
    },
    methods: {
      fetchData (page, pageSize) {
        return new Promise(resolve => {
          getApplyList(page, pageSize, this.curTab).then(response => {
            this.total = response.count;
            resolve(response.info)
          })
        })
      },
      refresh () {
        needRefreshList()
      },
      onItemClick (index) {
        this.curTab = index;
        needRefreshList()
      },
      statusMap (status) {
        const map = {
          0: '申请中',
          1: '已通过',
          2: '被拒绝',
          3: '已取消'
        };
        return map[status]
      },
      cancel (uid, phone) {
        this.showConfirm('是否取消申请代理' + uid, () => {
          applyMember(uid, phone, 3).then(() => {
            this.showToast('取消成功')
          })
        })
      }
    }
  }
</script>

<style>

</style>
