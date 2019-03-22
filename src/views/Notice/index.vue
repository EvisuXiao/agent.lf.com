<template>
  <div>
    <x-header :left-options="{ backText: '' }" title="消息中心"></x-header>
    <load-more :show-loading="false" tip="暂无消息"></load-more>
  </div>
</template>

<script>
  import {
    LoadMore,
    XHeader
  } from 'vux'

  export default {
    components: {
      LoadMore,
      XHeader
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
