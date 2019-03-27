<template>
  <div>
    <card>
      <div slot="header">
        <cell is-link link="/user" value="信息设置">
          <img slot="icon" width="90" :src="user.avatar" alt="头像">
          <div slot="title">{{ user.name }}<br/>ID: {{ user.id }}</div>
        </cell>
      </div>
      <div slot="content" class="card-demo-flex">
        <cell class="vux-1px-r" is-link link="/diamond/charge">
          <div slot="title">当前钻石<br/><span style="color: red; ">{{ user.diamond }}</span><br/>立即购买</div>
        </cell>
        <div class="vux-1px-r">
          <cell class="vux-1px-r" is-link link="/user/withdraw">
            <div slot="title">可提现金额<br/><span style="color: red; ">{{ user.amount }}</span><br/>累计收益{{ user.total }}元
            </div>
          </cell>
        </div>
      </div>
    </card>
    <group>
      <cell title="我的收益" is-link>
        <div slot>今日收益<span style="color: red; ">{{ user.today }}</span>元</div>
      </cell>
      <cell title="我的代理" is-link link="/team"></cell>
      <cell title="钻石充值" is-link link="/diamond/charge"></cell>
      <cell title="钻石变更记录" is-link link="/diamond"></cell>
      <cell title="资金记录" is-link link="/fund"></cell>
      <cell title="消息中心" is-link link="/notice"></cell>
      <cell title="帮助中心" is-link link="/help"></cell>
    </group>
    <group>
      <x-button type="warn" style="border-radius:99px;">退出</x-button>
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
  import Avatar from '../../assets/vux_logo.png'

  export default {
    components: {
      Group,
      Cell,
      Card,
      XButton
    },
    data () {
      return {
        user: {
          id: 123,
          name: '代理商123',
          avatar: Avatar,
          diamond: 567,
          today: 26,
          amount: 823.1,
          total: 1234.2
        }
      };
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
