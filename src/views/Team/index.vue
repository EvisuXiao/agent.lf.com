<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="我的团队">
      <div slot="right" @click="show=true">
        <icon type="search"></icon>
      </div>
    </x-header>
    <tab>
      <tab-item selected @on-item-click="onItemClick">全部</tab-item>
      <tab-item @on-item-click="onItemClick">合伙人</tab-item>
      <tab-item @on-item-click="onItemClick">总代理</tab-item>
      <tab-item @on-item-click="onItemClick">代理</tab-item>
    </tab>
    <!--<scroller v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="isbounce" :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="selPullUp" >-->
      <!--<div class="box2">-->
        <!--<p  v-for="list, index in lists">-->
          <!--<router-link :to="{ path: list.id } ">-->
        <!--<p style="height:40px;">-->
          <!--<span class="spanMeetTitle" v-html='(index+1) + " . " + list.name' ></span>-->
          <!--<span class="spanMeetStatu" v-html='list.status'></span>-->
        <!--</p>-->
        <!--<p class="prevSuper">-->
          <!--<form-preview  header-label=""  header-value="" :bodyItems="list" :footer-buttons="buttons1"></form-preview>-->
        <!--</p>-->
        <!--</router-link>-->
        <!--<hr>-->
        <!--</p>-->
      <!--</div>-->
    <!--</scroller>-->
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
            <span v-if="key === 'name'">{{ item[key] }}<br/>ID: {{ item.id }}</span>
            <span v-else-if="key !== 'id'">{{ item[key] }}</span>
          </td>
        </tr>
        </tbody>
      </x-table>
      <x-dialog v-model="show" hide-on-blur class="dialog-demo">
        <group>
          <x-input title="搜索" v-model="searchText"></x-input>
        </group>
      </x-dialog>
      <cell>
        <div slot="title">总人数: {{ userTotal }}</div>
        <div slot>
          <x-button type="primary" link="/team/add">添加代理</x-button>
        </div>
      </cell>
    </group>
  </div>
</template>

<script>
  import {XHeader, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group, Scroller} from 'vux'

  export default {
    components: {
      XHeader, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group, Scroller
    },
    data () {
      return {
        list: [
          {
            no: 1,
            id: 1,
            name: '用户1',
            rest: 10,
            profit: 10,
            role: '总代理'
          },
          {
            no: 2,
            id: 2,
            name: '用户2',
            rest: 10,
            profit: 10,
            role: '总代理'
          },
          {
            no: 3,
            id: 3,
            name: '用户3',
            rest: 10,
            profit: 10,
            role: '总代理'
          },
          {
            no: 4,
            id: 4,
            name: '用户4',
            rest: 10,
            profit: 10,
            role: '总代理'
          },
          {
            no: 5,
            id: 5,
            name: '用户5',
            rest: 10,
            profit: 10,
            role: '总代理'
          }
        ],
        titles: {
          no: '序号',
          name: '用户名/ID',
          rest: '钻石剩余',
          profit: '累计返利',
          role: '角色'
        },
        userTotal: 100,
        show: false,
        searchText: ''
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
      },
      showDetail () {
        this.$router.push({path: '/team/detail'})
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
