<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="添加/授权"></x-header>
    <group>
      <x-input title="ID"></x-input>
      <x-input title="昵称"></x-input>
      <x-input title="手机号码"></x-input>
      <x-input title="角色"></x-input>
    </group>
    <x-button type="primary">确认</x-button>
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
