<template>
  <layout title="代理申请">
    <tab slot="header">
      <tab-item v-for="(value, key) in tabLabel" :key="key" :selected="key === 0" @on-item-click="onItemClick(key)">{{ value }}</tab-item>
    </tab>
    <div>
      <scroller
        ref="scroller"
        v-model="pullStatus"
        lock-x
        scrollbar-y
        use-pullup
        use-pulldown
        @on-pullup-loading="fetchData(false)"
        @on-pulldown-loading="fetchData(true)" >
        <div>
          <group>
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
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <load-more v-if="pullStatus.pullupStatus !== 'disabled' && pullStatus.pullupStatus !== 'default'" tip="加载中"></load-more>
        </div>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
          <load-more v-if="pullStatus.pulldownStatus !== 'default'" tip="正在刷新"></load-more>
        </div>
      </scroller>
      <load-more v-if="pullStatus.pullupStatus === 'disabled'" :show-loading="false" tip="没有更多数据"></load-more>
    </div>
    <group slot="bottom" :gutter="0">
      <cell>
        <div slot="title">总人数: {{ total }}</div>
        <x-button type="primary" link="/team/add">申请</x-button>
      </cell>
    </group>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {Tab, TabItem, XTable, Cell, Icon, XButton, Group, Scroller, LoadMore} from 'vux'
  import { getApplyList, applyMember } from '../../api'

  export default {
    components: {
      Layout, Tab, TabItem, XTable, Cell, Icon, XButton, Group, Scroller, LoadMore
    },
    data () {
      return {
        list: [],
        page: 1,
        pageSize: 20,
        pullStatus: {
          pullupStatus: 'default',
          pulldownStatus: 'default'
        },
        curTab: 0,
        total: 0,
        tabLabel: ['全部', '申请中', '已通过', '被拒绝', '已取消']
      }
    },
    mounted () {
      this.fetchData(true);
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      fetchData (first = false) {
        getApplyList(first ? 1 : this.page + 1, this.pageSize, this.curTab - 1).then(response => {
          const newList = response.info;
          if (first) {
            this.list = newList;
            this.page = 1;
            this.$refs.scroller.donePulldown();
            this.$refs.scroller.enablePullup()
          } else {
            this.list = this.list.concat(newList);
            this.$refs.scroller.donePullup();
            this.$nextTick(() => {
              this.$refs.scroller.reset()
            });
            // 最后一页
            if (newList.length < this.pageSize) {
              this.$refs.scroller.disablePullup()
            } else {
              this.page++
            }
          }
          this.total = response.count;
        })
      },
      onItemClick (index) {
        this.curTab = index;
        this.fetchData(true)
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
