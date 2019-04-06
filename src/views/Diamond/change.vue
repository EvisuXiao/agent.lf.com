<template>
  <layout title="我的账单" :show-icon="true">
    <tab slot="header" v-if="!mid">
      <tab-item v-for="(value, key) in tabLabel" :key="key" :selected="parseInt(key) === 0" @on-item-click="onItemClick(key)">{{ value }}</tab-item>
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
          <group v-if="list.length" :gutter="0">
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
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height: 40px; bottom: -40px; text-align: center;">
          <load-more v-if="pullStatus.pullupStatus !== 'disabled' && pullStatus.pullupStatus !== 'default'" tip="加载中"></load-more>
        </div>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
          <load-more v-if="pullStatus.pulldownStatus !== 'default'" tip="正在刷新"></load-more>
        </div>
      </scroller>
      <load-more v-if="pullStatus.pullupStatus === 'disabled'" :show-loading="false" tip="没有更多数据"></load-more>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import { Tab, TabItem, XTable, Cell, XDialog, XButton, XInput, Group, Scroller, LoadMore } from 'vux'
  import { milli2Datetime, isRebateMode, levelName } from '../../utils'
  import { getDiamondChangeList } from '../../api'

  export default {
    components: {
      Layout, Tab, TabItem, XTable, Cell, XDialog, XButton, XInput, Group, Scroller, LoadMore
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
        tabLabel: ['全部', '充值', '出售', '奖励', '茶楼'],
        mid: 0
      }
    },
    mounted () {
      this.init();
      this.fetchData(true);
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    computed: {
      rebateMode: function () {
        return isRebateMode()
      }
    },
    methods: {
      init () {
        if (this.$route.query.mid) {
          this.mid = this.$route.query.mid;
          this.curTab = 2 // 有id传入为销售类
        }
      },
      fetchData (first = false) {
        getDiamondChangeList(this.mid, this.curTab, first ? 1 : this.page + 1, this.pageSize).then(response => {
          let newList = [];
          for (let i in response.info) {
            newList.push(this.formatList(response.info[i], response.userInfo))
          }
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
        this.fetchData(true)
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
  .table-header-fixed {
    width:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:100;
  }
</style>
