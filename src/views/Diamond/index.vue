<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="钻石记录">
      <div slot="right" @click="show=true">
        <icon type="search"></icon>
      </div>
    </x-header>
    <tab>
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">买钻</tab-item>
      <tab-item @on-item-click="onItemClick">牌友群消耗</tab-item>
      <tab-item @on-item-click="onItemClick">奖励</tab-item>
    </tab>
    <group>
      <x-table :cell-bordered="false">
        <thead>
        <tr>
          <th v-for="title in titles">{{ title }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in list" @click="showDetail">
          <td v-for="(title, key) in titles">
            <span v-if="key === 'name'">{{ item[key] }}(ID: {{ item.id }})<br/>{{ item.ctime }}</span>
            <span v-else-if="key === 'amount'">{{ item.type === 1 ? '+' : '-'}}{{ item[key] }}</span>
            <span v-else-if="key !== 'type' && key !== 'ctime' && key !== 'id'">{{ item[key] }}</span>
          </td>
        </tr>
        </tbody>
      </x-table>
      <x-dialog v-model="show" hide-on-blur class="dialog-demo">
        <group>
          <datetime title="开始时间" format="YYYY-MM-DD HH:mm" v-model="startTime"></datetime>
          <datetime title="结束时间" format="YYYY-MM-DD HH:mm" v-model="endTime"></datetime>
        </group>
      </x-dialog>
      <cell>
        <span>成功合计: {{ total }}</span>
      </cell>
    </group>
  </div>
</template>

<script>
  import {XHeader, Datetime, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group} from 'vux'

  export default {
    components: {
      XHeader, Datetime, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group
    },
    data () {
      return {
        list: [
          {
            id: '12345',
            name: '代理12',
            status: '成功',
            type: 1,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            id: '12345',
            name: '代理12',
            status: '成功',
            type: 1,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            id: '12345',
            name: '代理12',
            status: '成功',
            type: 2,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            id: '12345',
            name: '代理12',
            status: '成功',
            type: 1,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            id: '12345',
            name: '代理12',
            status: '成功',
            type: 1,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          }
        ],
        titles: {
          name: '名称/时间',
          status: '状态',
          amount: '数量'
        },
        total: 100,
        startTime: null,
        endTime: null,
        show: false,
        searchText: ''
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
      },
      showDetail () {
        this.$router.push({path: '/diamond/detail'})
      }
    }
  }
</script>

<style>
  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
