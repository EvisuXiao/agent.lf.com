<template>
  <div>
    <card>
      <div slot="header">
        <cell is-link>
          <span slot>信息设置</span>
          <img slot="icon" width="90" src="../../assets/vux_logo.png">
          <div slot="title">代理商123<br />ID: 12345</div>
        </cell>
      </div>
      <div slot="content" class="card-demo-flex">
        <cell class="vux-1px-r" is-link>
          <div slot="title">当前钻石<br /><font color="red">678</font><br />立即购买</div>
        </cell>
        <div class="vux-1px-r">
          <cell class="vux-1px-r" is-link>
            <div slot="title">可提现金额<br /><font color="red">234</font><br />累计收益1234元</div>
          </cell>
        </div>
      </div>
    </card>
    <group>
      <cell title="我的收益" is-link>
        <div slot>今日收益<font color="red">{{ todayIncome }}</font>元</div>
      </cell>
      <cell title="我的团队" is-link link="/team"></cell>
      <cell title="钻石充值" is-link link="/diamond/charge"></cell>
      <cell title="钻石变更记录" is-link></cell>
      <cell title="资金记录" is-link></cell>
      <cell title="消息中心" is-link></cell>
      <cell title="帮助中心" is-link></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Flexbox, FlexboxItem, Card } from 'vux'

export default {
  components: {
    Group, Cell, Flexbox, FlexboxItem, Card
  },
  data () {
    return {
      todayIncome: 28
    }
  }
}
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

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
