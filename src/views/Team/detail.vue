<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="详情"></x-header>
    <group>
      <cell title="用户名">用户1</cell>
      <cell title="ID">1</cell>
      <cell title="剩余钻石">10</cell>
      <cell title="累计消耗" is-link>3</cell>
      <cell title="累计返利" is-link>18</cell>
      <cell title="角色" is-link>总代理</cell>
      <cell title="手机号码">1234567</cell>
      <cell title="加入时间">2018.01.01</cell>
      <cell title="状态">正常</cell>
    </group>
    <group title="他的团队">
      <cell title="直属代理(人)" is-link>3</cell>
    </group>
  </div>
</template>

<script>
  import {XHeader, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group} from 'vux'

  export default {
    components: {
      XHeader, Tab, TabItem, XTable, Cell, Icon, XDialog, XButton, XInput, Group
    },
    data () {
      return {
        user: {}
      }
    },
    methods: {
      onItemClick (index) {
        console.log('on item click:', index)
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
