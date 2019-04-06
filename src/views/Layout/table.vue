<template>
  <layout :title="title" :show-icon="true">
    <scroll
      ref="scroll"
      :auto-update="true"
      class="content"
      @pullingDown="loadRefresh"
      @pullingUp="loadMore">
      <ul>
        <li v-for="(item, index) in list" :key="index">{{ item }}</li>
      </ul>
    </scroll>
  </layout>
  <loading v-model="showloading" :text="textloading"></loading>
</template>

<script>
  import Layout from './index'
  import Scroll from 'vue-slim-better-scroll'
  import {
    Loading
  } from 'vux'

  export default {
    name: 'TableLayout',
    components: {
      Layout,
      Scroll,
      Loading
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        list: [],
        page: 1,
        pageSize: 20
      }
    },
    mounted () {
      // 第一次加载
      this.getNewsList(true);
      this.$nextTick(() => {
        this.$refs.scroller.reset()
      })
    },
    methods: {
      // 滚动到顶部
      scrollToTop () {
        this.$refs.scroll.scrollToTop()
      },
      // 滚动到底部
      scrollToBottom () {
        this.$refs.scroll.scrollToBottom()
      },
      fetchData (first = false) {
        if (first) {
          this.list = [];
          this.page = 1
        } else {
          this.page++;
          this.list = this.list.push([])
        }
      },
      loadRefresh () {
        this.fetchData(true);
        this.page = 1
      }
    },
    activated () {
      this.$refs.scroller.reset()
    }
  }
</script>

<style scoped lang="less">
  @import '../../../node_modules/vux/src/styles/1px.less';

  .layout-header {
    width:100%;
    position:fixed;
    left:0;
    top:0;
    z-index:100;
  }

  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }
</style>
