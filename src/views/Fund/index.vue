<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="资金记录">
      <div slot="right" @click="show=true">
        <icon type="search"></icon>
      </div>
    </x-header>
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
            <span v-if="key === 'name'">{{ item[key] }}<br/>{{ item.ctime }}</span>
            <span v-else-if="key === 'amount'">{{ item.type === 1 ? '+' : '-'}}{{ item[key] }}</span>
            <span v-else-if="key !== 'type' && key !== 'ctime'">{{ item[key] }}</span>
          </td>
        </tr>
        </tbody>
      </x-table>
      <x-dialog v-model="show" hide-on-blur class="dialog-demo">
        <group>
          <datetime title="开始时间" format="YYYY-MM-DD HH:mm" v-model="startTime"></datetime>
          <datetime title="结束时间" format="YYYY-MM-DD HH:mm" v-model="endTime"></datetime>
          <popup-picker title="类型" :data="typeList" v-model="type"></popup-picker>
        </group>
      </x-dialog>
    </group>
  </div>
</template>

<script>
  import {XHeader, Datetime, PopupPicker, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group, Scroller} from 'vux'

  export default {
    components: {
      XHeader, Datetime, PopupPicker, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group, Scroller
    },
    data () {
      return {
        list: [
          {
            name: '代理12',
            status: '成功',
            type: 1,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            name: '代理12',
            status: '成功',
            type: 1,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            name: '代理12',
            status: '成功',
            type: 2,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
            name: '代理12',
            status: '成功',
            type: 2,
            amount: 25,
            ctime: '2018-10-10 10:10:00'
          },
          {
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
        show: false,
        searchText: '',
        startTime: '',
        endTime: '',
        typeList: [
          [
            '活动奖励',
            '充值返利',
            '提现',
            '钻石购买'
          ]
        ],
        type: []
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
      },
      showDetail () {
        this.$router.push({path: '/fund/detail'})
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
