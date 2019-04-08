<template>
  <div>
    <card>
      <div slot="header">
        <cell is-link link="/user" value="信息设置">
          <img slot="icon" width="90" :src="require('../../assets/avatar_boy.png')" alt="头像">
          <div slot="title">{{ uInfo.name }}<br/>ID: {{ uInfo.mid }}</div>
        </cell>
      </div>
      <div slot="content" class="card-demo-flex">
        <cell class="vux-1px-r" is-link link="/diamond/charge">
          <div slot="title">当前钻石<br/><span style="color: red; ">{{ uInfo.money }}</span><br/>立即购买</div>
        </cell>
        <div class="vux-1px-r">
          <cell v-if="rebateMode" class="vux-1px-r" is-link link="/user/withdraw">
            <div slot="title">可提现金额<br/><span style="color: red; ">{{ uInfo.rebate }}</span><br/>累计收益{{ uInfo.rebateAll }}元
            </div>
          </cell>
          <cell v-else class="vux-1px-r" is-link link="/diamond/sell">
            <div slot="title">当日销售<br/><span style="color: red; ">{{ uInfo.todaySell }}</span><br/>
            </div>
          </cell>
        </div>
      </div>
    </card>
    <!--返利模式-->
    <group v-if="rebateMode">
      <cell title="我的收益" is-link link="/fund/income">
        <div slot>今日收益<span style="color: red; ">{{ uInfo.todayRebate }}</span>元</div>
      </cell>
      <cell title="我的代理" is-link link="/team"></cell>
      <cell title="钻石充值" is-link link="/diamond/charge"></cell>
      <cell title="我的账单" is-link link="/diamond/change"></cell>
      <cell title="资金记录" is-link link="/fund"></cell>
      <cell title="消息中心" is-link link="/notice"></cell>
      <cell title="帮助中心" is-link link="/help"></cell>
    </group>
    <!--普通模式-->
    <group v-else>
      <cell title="我的代理" is-link link="/team"></cell>
      <cell title="钻石充值" is-link link="/diamond/charge"></cell>
      <cell title="出售钻石" is-link link="/diamond/sell"></cell>
      <cell title="我的账单" is-link link="/diamond/change"></cell>
      <cell title="代理申请" is-link link="/team/apply"></cell>
      <cell title="消息中心" is-link link="/notice"></cell>
      <cell title="帮助中心" is-link link="/help"></cell>
    </group>
    <group>
      <x-button type="warn" style="border-radius:99px;" @click.native="logout">退出</x-button>
    </group>
  </div>
</template>

<script>
  import {
    Group,
    Cell,
    Card,
    XButton
  } from 'vux'
  import { logout, getNotice } from '../../api'
  import { isRebateMode, milli2Datetime } from '../../utils'

  export default {
    components: {
      Group,
      Cell,
      Card,
      XButton
    },
    computed: {
      uInfo: function () {
        return this.$store.getters.userInfo
      },
      rebateMode: function () {
        return isRebateMode()
      }
    },
    created () {
      this.notice()
    },
    methods: {
      notice () {
        const login = this.$store.getters.userInfo.loginTime;
        const lastLogin = this.$store.getters.userInfo.lastLoginTime;
        if (milli2Datetime(login, 'YYYY-MM-DD') !== milli2Datetime(lastLogin, 'YYYY-MM-DD')) {
          getNotice().then((data) => {
            this.showAlert(data, '公告')
          })
        }
      },
      logout () {
        logout().then(() => {
          this.showToast('退出成功');
          setTimeout(() => {
            this.$router.push({path: '/login'})
          }, 2000)
        })
      }
    }
  };
</script>

<style scoped lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }
</style>
