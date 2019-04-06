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
      showDetail () {
        this.$router.push({path: '/team/detail'})
      }
    }
  }
</script>

<style>

</style>
