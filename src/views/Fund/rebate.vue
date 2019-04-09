<template>
  <layout title="返利详情">
    <div>
      <group>
        <cell title="用户">{{ info.name }}(ID:{{ info.mid }})</cell>
        <cell title="等级">{{ levelName(info.level) }}</cell>
        <cell title="时间段">{{ timeLabel(timeType) }}</cell>
      </group>
      <group>
        <cell title="TA">{{ rebate.selfRebate }}</cell>
        <cell v-if="rebate.zdRebate" title="TA的总代理">{{ rebate.zdRebate }}</cell>
        <cell title="TA代理">{{ rebate.dlRebate }}</cell>
        <cell title="合计">{{ rebateSum }}</cell>
      </group>
    </div>
  </layout>
</template>

<script>
  import Layout from '../Layout'
  import {
    Cell,
    Group
  } from 'vux'
  import { timePeriod, levelName } from '../../utils'
  import { getRebateMemberStat, getMemberInfo } from '../../api'

  export default {
    components: {
      Layout,
      Cell,
      Group
    },
    data () {
      return {
        info: {},
        rebate: {},
        timeType: '0',
        startTime: '',
        endTime: ''
      }
    },
    watch: {
      timeType: function (val) {
        const time = timePeriod(val);
        this.startTime = time[0];
        this.endTime = time[1]
      }
    },
    computed: {
      rebateSum: function () {
        return this.rebate.selfRebate + this.rebate.zdRebate + this.rebate.dlRebate
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      fetchData () {
        if (this.$route.query.mid && this.$route.query.timeType) {
          this.timeType = this.$route.query.timeType;
          const time = timePeriod(this.timeType);
          this.startTime = time[0];
          this.endTime = time[1];
          getMemberInfo(this.$route.query.mid).then(data => {
            this.info = data
          });
          getRebateMemberStat(this.$route.query.mid, this.startTime, this.endTime).then(data => {
            this.rebate = data
          })
        }
      },
      timeLabel (type) {
        const label = {
          '0': '全部',
          '1': '今日',
          '2': '本周',
          '3': '本月'
        };
        return label[type]
      },
      levelName (level) {
        return levelName(level)
      }
    }
  }
</script>

<style>

</style>
